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

    const products = includeAll ? getAllProducts() : getPublishedProducts();
    return NextResponse.json({ success: true, count: products.length, products });
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
