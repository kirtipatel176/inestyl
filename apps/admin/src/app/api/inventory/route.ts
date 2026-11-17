import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { StockMovementSchema } from "@inestyle/validations";
import { createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission([user.role], "inventory.read") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires inventory.read permission" }, { status: 403 });
    }

    const supabase = createServiceClient();
    const { data: invRows, error } = await supabase
      .from("inventory")
      .select(`
        id,
        variant_id,
        available_quantity,
        reserved_quantity,
        reorder_threshold,
        location_id,
        updated_at,
        product_variants (
          id,
          size,
          colour,
          sku,
          is_active,
          product_id,
          products (
            id,
            title
          )
        )
      `)
      .order("available_quantity", { ascending: true });

    if (error) {
      throw new Error(`Failed to query inventory: ${error.message}`);
    }

    const inventoryList = (invRows || []).map((row: any) => {
      const v = row.product_variants || {};
      const p = v.products || {};
      return {
        id: row.id,
        productId: p.id || v.product_id,
        productTitle: p.title || "Unknown Product",
        sku: v.sku || "N/A",
        variantId: row.variant_id,
        size: v.size,
        colour: v.colour,
        availableQuantity: row.available_quantity,
        isAvailable: Boolean(v.is_active && row.available_quantity > 0),
        reorderThreshold: row.reorder_threshold || 2,
        locationId: row.location_id || "kapadwanj-flagship",
        updatedAt: row.updated_at,
      };
    });

    return NextResponse.json({ success: true, count: inventoryList.length, inventory: inventoryList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission([user.role], "inventory.update") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires inventory.update permission" }, { status: 403 });
    }

    const body = await request.json();
    const supabase = createServiceClient();

    // Support both direct variantId or coordinate lookup (productId, size, colour)
    let variantId = body.variantId;

    if (!variantId && body.productId && body.size && body.colour) {
      const { data: v } = await supabase
        .from("product_variants")
        .select("id")
        .eq("product_id", body.productId)
        .eq("size", body.size)
        .eq("colour", body.colour)
        .maybeSingle();

      if (v) variantId = v.id;
    }

    if (!variantId) {
      return NextResponse.json({ error: "Could not locate variant to adjust" }, { status: 400 });
    }

    const quantityDelta = parseInt(body.quantityDelta || body.delta || "0", 10);
    const movementType = body.movementType || (quantityDelta >= 0 ? "stock_addition" : "stock_reduction");
    const reason = body.reason || "Manual stock adjustment at Kapadwanj flagship";

    // Call Supabase RPC adjust_variant_stock
    const { data: newBalance, error: rpcError } = await supabase.rpc("adjust_variant_stock", {
      p_variant_id: variantId,
      p_quantity_delta: quantityDelta,
      p_movement_type: movementType,
      p_reason: reason,
      p_reference_id: body.referenceId || null,
    });

    if (rpcError) {
      // Direct update fallback if RPC has role restriction
      const { data: currentInv } = await supabase
        .from("inventory")
        .select("id, available_quantity")
        .eq("variant_id", variantId)
        .single();

      if (currentInv) {
        const nextQty = Math.max(0, currentInv.available_quantity + quantityDelta);
        await supabase
          .from("inventory")
          .update({ available_quantity: nextQty, updated_at: new Date().toISOString() })
          .eq("id", currentInv.id);

        await supabase.from("stock_movements").insert({
          inventory_id: currentInv.id,
          movement_type: movementType,
          quantity_delta: quantityDelta,
          previous_quantity: currentInv.available_quantity,
          new_quantity: nextQty,
          reason,
          created_by: user.id,
        });

        await logActivityMutation(supabase, {
          userId: user.id,
          action: "inventory_adjustment",
          entityType: "inventory",
          entityId: currentInv.id,
          authorName: user.fullName || "Staff Member",
          details: `Adjusted variant stock by ${quantityDelta > 0 ? "+" : ""}${quantityDelta} (new: ${nextQty})`,
        });

        return NextResponse.json({ success: true, newQuantity: nextQty });
      }

      throw new Error(`Inventory adjustment failed: ${rpcError.message}`);
    }

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "inventory_adjustment",
      entityType: "inventory",
      entityId: variantId,
      authorName: user.fullName || "Staff Member",
      details: `Adjusted variant stock by ${quantityDelta > 0 ? "+" : ""}${quantityDelta} (new: ${newBalance})`,
    });

    return NextResponse.json({ success: true, newQuantity: newBalance });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to adjust stock" }, { status: 500 });
  }
}
