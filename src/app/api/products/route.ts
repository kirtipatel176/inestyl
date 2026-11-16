import { NextResponse } from "next/server";
import {
  getAllProducts,
  getPublishedProducts,
  createProduct,
} from "@/lib/server-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const brand = searchParams.get("brand")?.toLowerCase();
    const type = searchParams.get("type")?.toLowerCase();
    const gender = searchParams.get("gender");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    let products = includeAll ? getAllProducts() : getPublishedProducts();

    // Filtering
    if (brand) {
      products = products.filter((p) => p.brand.toLowerCase() === brand || p.brandSlug.toLowerCase() === brand);
    }
    if (type) {
      products = products.filter((p) => p.type.toLowerCase() === type);
    }
    if (gender) {
      products = products.filter((p) => p.gender === gender || p.gender === "Unisex");
    }
    if (search) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search)
      );
    }

    const totalCount = products.length;

    // Optional pagination
    let paginatedProducts = products;
    if (pageParam || limitParam) {
      const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(limitParam || "24", 10) || 24));
      const start = (page - 1) * limit;
      paginatedProducts = products.slice(start, start + limit);
    }

    // Header caching: Public storefront products cached at edge for 2 minutes
    const headers: Record<string, string> = {};
    if (!includeAll) {
      headers["Cache-Control"] = "public, max-age=120, stale-while-revalidate=600";
    } else {
      headers["Cache-Control"] = "private, no-cache, no-store, must-revalidate";
    }

    return NextResponse.json(
      {
        success: true,
        count: paginatedProducts.length,
        totalCount,
        products: paginatedProducts,
      },
      { headers }
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
    const body = await request.json();
    const author = body.author || "Admin (Kapadwanj)";

    if (!body.title || !body.sku || !body.brand || !body.mrp || !body.outletPrice) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, sku, brand, mrp, outletPrice" },
        { status: 400 }
      );
    }

    const created = createProduct(body, author);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
