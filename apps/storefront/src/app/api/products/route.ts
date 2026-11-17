import { NextResponse } from "next/server";
import {
  createStorefrontClient,
  getPublishedProducts,
} from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand")?.toLowerCase();
    const type = searchParams.get("type")?.toLowerCase() as "footwear" | "clothing" | undefined;
    const gender = searchParams.get("gender") || undefined;
    const search = searchParams.get("search")?.trim() || undefined;
    const isFeatured = searchParams.get("featured") === "true" ? true : undefined;
    const isNew = searchParams.get("new") === "true" ? true : undefined;
    const collectionSlug = searchParams.get("collection") || undefined;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "24", 10) || 24));
    const sortBy = (searchParams.get("sort") || undefined) as any;

    const client = createStorefrontClient();

    const result = await getPublishedProducts(client, {
      brand,
      department: type,
      gender,
      search,
      isFeatured,
      isNew,
      collectionSlug,
      page,
      limit,
      sortBy,
    });

    // Public storefront products cached at edge for 60 seconds with stale-while-revalidate
    const headers = {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    };

    return NextResponse.json(
      {
        success: true,
        count: result.data.length,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        page: result.page,
        products: result.data,
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
