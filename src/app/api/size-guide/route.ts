import { NextResponse } from "next/server";
import { getSizeGuides, updateSizeGuide } from "@/lib/server-db";

export async function GET() {
  try {
    const sizeGuides = getSizeGuides();
    return NextResponse.json({ success: true, sizeGuides });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch size guides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, guide, author } = body;

    if (!key || !guide) {
      return NextResponse.json(
        { success: false, error: "Must specify guide key and guide data" },
        { status: 400 }
      );
    }

    const updated = updateSizeGuide(key, guide, author || "Admin (Kapadwanj)");
    return NextResponse.json({ success: true, guide: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update size guide" },
      { status: 500 }
    );
  }
}
