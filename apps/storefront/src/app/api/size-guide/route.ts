import { NextResponse } from "next/server";
import { createStorefrontClient, getSizeGuides } from "@inestyle/database";

export async function GET() {
  try {
    const client = createStorefrontClient();
    const sizeGuides = await getSizeGuides(client);
    return NextResponse.json(
      { success: true, sizeGuides },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch size guides" },
      { status: 500 }
    );
  }
}
