import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { ProductRepository, createServiceClient, logActivityMutation } from "@inestyle/database";
import { slugify } from "@inestyle/shared-utils";

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
    const { id, author } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product id is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);
    const existing = await repo.getProductById(id, false);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const timestamp = Date.now().toString().slice(-4);
    const newTitle = `${existing.title} (Copy ${timestamp})`;
    const newSku = `${existing.sku}-COPY-${timestamp}`.toUpperCase();
    const newSlug = slugify(newTitle);

    const duplicated = await repo.createProduct({
      title: newTitle,
      slug: newSlug,
      sku: newSku,
      brand: existing.brand,
      department: existing.type || "footwear",
      subcategory: existing.subcategory,
      gender: existing.gender,
      description: existing.description,
      regularPrice: existing.mrp,
      salePrice: existing.outletPrice,
      discount: existing.discount,
      status: "draft",
      isFeatured: false,
      isNew: false,
      hasVideo: existing.hasVideo,
      videoUrl: existing.videoUrl,
      image: existing.image,
      gallery: existing.gallery,
      collections: existing.collections,
      variants: existing.variants?.map((v, i) => ({
        id: `prod-${Date.now()}-var-${i}`,
        size: v.size,
        colour: v.colour,
        colourHex: v.colourHex,
        sku: `${newSku}-${v.size}-${v.colour}`.toUpperCase().replace(/\s+/g, ""),
        stockQuantity: v.stockQuantity,
        isAvailable: v.isAvailable,
      })) || [],
    });

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "duplicate",
      entityType: "product",
      entityId: duplicated.id,
      entityName: duplicated.title,
      authorName: author || user.fullName || "Staff Member",
      details: `Duplicated product "${existing.title}" into draft "${duplicated.title}"`,
    });

    return NextResponse.json({ success: true, product: duplicated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to duplicate product" },
      { status: 500 }
    );
  }
}
