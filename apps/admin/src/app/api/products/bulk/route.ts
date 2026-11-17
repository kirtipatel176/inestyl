import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { createServiceClient, logActivityMutation } from "@inestyle/database";

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.update") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.update permission" }, { status: 403 });
    }

    const body = await request.json();
    const { action, ids, payload, author } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Must provide non-empty array of product ids" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const currentAuthor = author || user.fullName || "Staff Member";
    let updatedCount = 0;

    if (action === "publish") {
      const isPublish = Boolean(payload?.publish);
      const newStatus = isPublish ? "published" : "draft";
      const { data, error } = await supabase
        .from("products")
        .update({
          status: newStatus,
          published_at: isPublish ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .in("id", ids)
        .select("id, title");

      if (error) throw new Error(error.message);
      updatedCount = data?.length || 0;

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "bulk_publish",
        entityType: "product",
        entityId: ids.join(","),
        authorName: currentAuthor,
        details: `Bulk ${isPublish ? "published" : "unpublished"} ${updatedCount} products`,
      });

      return NextResponse.json({ success: true, updatedCount, affectedIds: ids });
    }

    if (action === "archive") {
      const isArchive = Boolean(payload?.archive);
      const newStatus = isArchive ? "archived" : "draft";
      const { data, error } = await supabase
        .from("products")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .in("id", ids)
        .select("id, title");

      if (error) throw new Error(error.message);
      updatedCount = data?.length || 0;

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "bulk_archive",
        entityType: "product",
        entityId: ids.join(","),
        authorName: currentAuthor,
        details: `Bulk ${isArchive ? "archived" : "unarchived"} ${updatedCount} products`,
      });

      return NextResponse.json({ success: true, updatedCount, affectedIds: ids });
    }

    if (action === "price") {
      const { updateType, value } = payload || {};
      const numVal = Number(value);

      for (const id of ids) {
        const { data: prod } = await supabase
          .from("products")
          .select("id, regular_price, sale_price")
          .eq("id", id)
          .single();

        if (prod) {
          const reg = Number(prod.regular_price);
          let newSale = Number(prod.sale_price);
          let newDiscount = 0;

          if (updateType === "flat_sale_price") {
            newSale = numVal;
            newDiscount = Math.round(((reg - newSale) / reg) * 100);
          } else if (updateType === "discount_percent") {
            newDiscount = numVal;
            newSale = Math.round(reg * (1 - newDiscount / 100));
          } else if (updateType === "flat_reduction") {
            newSale = Math.max(1, newSale - numVal);
            newDiscount = Math.round(((reg - newSale) / reg) * 100);
          }

          await supabase
            .from("products")
            .update({
              sale_price: newSale,
              discount_percent: Math.max(0, newDiscount),
              updated_at: new Date().toISOString(),
            })
            .eq("id", id);
          updatedCount++;
        }
      }

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "bulk_price",
        entityType: "product",
        entityId: ids.join(","),
        authorName: currentAuthor,
        details: `Bulk adjusted price (${updateType}: ${value}) for ${updatedCount} products`,
      });

      return NextResponse.json({ success: true, updatedCount, affectedIds: ids });
    }

    if (action === "assign") {
      const { brand, category, subcategory, type, gender, collectionSlug } = payload || {};
      const updateData: Record<string, any> = { updated_at: new Date().toISOString() };

      if (brand) {
        updateData.brand_id = brand.toLowerCase().replace(/[^a-z0-9]/g, "-");
      }
      if (category) updateData.subcategory = category;
      if (subcategory) updateData.subcategory = subcategory;
      if (type) updateData.department = type;
      if (gender) updateData.gender = gender;

      const { data, error } = await supabase
        .from("products")
        .update(updateData)
        .in("id", ids)
        .select("id");

      if (error) throw new Error(error.message);
      updatedCount = data?.length || 0;

      // Associate collection if provided
      if (collectionSlug) {
        const { data: col } = await supabase
          .from("collections")
          .select("id")
          .eq("slug", collectionSlug)
          .single();

        if (col) {
          for (const id of ids) {
            await supabase
              .from("product_collections")
              .upsert({ product_id: id, collection_id: col.id }, { onConflict: "product_id,collection_id" });
          }
        }
      }

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "bulk_assign",
        entityType: "product",
        entityId: ids.join(","),
        authorName: currentAuthor,
        details: `Bulk assigned metadata to ${updatedCount} products`,
      });

      return NextResponse.json({ success: true, updatedCount, affectedIds: ids });
    }

    if (action === "stock") {
      const { stockAction, quantity, size } = payload || {};
      const numQty = Math.max(0, parseInt(quantity || "0", 10));

      for (const id of ids) {
        let variantQuery = supabase.from("product_variants").select("id").eq("product_id", id);
        if (size) variantQuery = variantQuery.eq("size", size);
        const { data: variants } = await variantQuery;

        if (variants && variants.length > 0) {
          const varIds = variants.map((v) => v.id);
          if (stockAction === "set_quantity") {
            await supabase.from("inventory").update({ available_quantity: numQty }).in("variant_id", varIds);
          } else if (stockAction === "mark_out_of_stock") {
            await supabase.from("inventory").update({ available_quantity: 0 }).in("variant_id", varIds);
            await supabase.from("product_variants").update({ is_active: false }).in("id", varIds);
          } else if (stockAction === "mark_in_stock") {
            await supabase.from("product_variants").update({ is_active: true }).in("id", varIds);
            await supabase.from("inventory").update({ available_quantity: Math.max(1, numQty) }).in("variant_id", varIds);
          }
          updatedCount++;
        }
      }

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "bulk_stock",
        entityType: "product",
        entityId: ids.join(","),
        authorName: currentAuthor,
        details: `Bulk adjusted inventory (${stockAction}) for ${updatedCount} products`,
      });

      return NextResponse.json({ success: true, updatedCount, affectedIds: ids });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported bulk action: ${action}` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute bulk action" },
      { status: 500 }
    );
  }
}
