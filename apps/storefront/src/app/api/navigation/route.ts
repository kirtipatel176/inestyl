import { NextResponse } from "next/server";
import {
  createStorefrontClient,
  getNavigationTree,
  getActiveCollections,
  getActiveBrands,
} from "@inestyle/database";

export async function GET() {
  try {
    const client = createStorefrontClient();
    const [navigation, collections, brands] = await Promise.all([
      getNavigationTree(client).catch(() => null),
      getActiveCollections(client).catch(() => []),
      getActiveBrands(client).catch(() => []),
    ]);

    return NextResponse.json(
      {
        success: true,
        navigation,
        collections: collections || [],
        brands: brands || [],
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch navigation" },
      { status: 500 }
    );
  }
}

