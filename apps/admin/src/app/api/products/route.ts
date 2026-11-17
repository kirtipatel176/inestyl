import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { ProductRepository, createServiceClient } from "@inestyle/database";
import { logActivityMutation } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.read") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.read permission" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand")?.toLowerCase();
    const type = searchParams.get("type")?.toLowerCase() as "footwear" | "clothing" | undefined;
    const gender = searchParams.get("gender") || undefined;
    const search = searchParams.get("search")?.toLowerCase().trim();
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    const limit = limitParam ? Math.max(1, Math.min(200, parseInt(limitParam, 10))) : 200;

    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);

    const { data: products, totalCount } = await repo.getProducts({
      includeAllStatus: true,
      brand,
      department: type,
      gender,
      search,
      page,
      limit,
    });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        totalCount,
        products,
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.create") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.create permission" }, { status: 403 });
    }

    const body = await request.json();
    const author = user.fullName || "Staff Member";

    if (!body.title || !body.sku || !body.brand || !body.mrp || !body.outletPrice) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, sku, brand, mrp, outletPrice" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);

    // Map mrp/outletPrice to regularPrice/salePrice
    const payload = {
      ...body,
      regularPrice: Number(body.regularPrice || body.mrp),
      salePrice: Number(body.salePrice || body.outletPrice),
      department: body.department || body.type || "footwear",
    };

    const created = await repo.createProduct(payload);

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "create",
      entityType: "product",
      entityId: created.id,
      entityName: created.title,
      authorName: author,
      newState: created,
      details: `Created product "${created.title}" with SKU ${created.sku}`,
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
