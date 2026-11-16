import { NextResponse } from "next/server";
import { duplicateProduct } from "@/lib/server-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, author } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product id is required" },
        { status: 400 }
      );
    }

    const duplicated = duplicateProduct(id, author || "Admin (Kapadwanj)");
    if (!duplicated) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: duplicated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to duplicate product" },
      { status: 500 }
    );
  }
}
