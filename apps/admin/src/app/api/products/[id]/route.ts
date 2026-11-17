import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { ProductRepository, createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.read") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.read permission" }, { status: 403 });
    }

    const { id } = await params;
    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);

    let product = await repo.getProductById(id, false);
    if (!product) {
      product = await repo.getProductBySlug(id, false);
    }

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.update") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.update permission" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const author = user.fullName || "Staff Member";

    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);

    const existing = await repo.getProductById(id, false);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const payload = {
      ...body,
      regularPrice: body.regularPrice !== undefined ? Number(body.regularPrice) : body.mrp !== undefined ? Number(body.mrp) : undefined,
      salePrice: body.salePrice !== undefined ? Number(body.salePrice) : body.outletPrice !== undefined ? Number(body.outletPrice) : undefined,
      department: body.department || body.type,
    };

    const updated = await repo.updateProduct(id, payload);

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "update",
      entityType: "product",
      entityId: id,
      entityName: existing.title,
      authorName: author,
      previousState: existing,
      newState: updated,
      details: `Updated product attributes for ${existing.title}`,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.delete") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.delete permission" }, { status: 403 });
    }

    const { id } = await params;
    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);

    const existing = await repo.getProductById(id, false);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Archive product rather than hard delete to preserve relational history
    await repo.updateProduct(id, { status: "archived" });

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "archive",
      entityType: "product",
      entityId: id,
      entityName: existing.title,
      authorName: user.fullName || "Staff Member",
      details: `Archived product ${existing.title} (${existing.sku})`,
    });

    return NextResponse.json({ success: true, message: "Product archived successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to archive product" },
      { status: 500 }
    );
  }
}
