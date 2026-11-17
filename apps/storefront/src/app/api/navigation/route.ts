import { NextResponse } from "next/server";
import { createStorefrontClient, getNavigationTree } from "@inestyle/database";

export async function GET() {
  try {
    const client = createStorefrontClient();
    const navigation = await getNavigationTree(client);

    return NextResponse.json(
      { success: true, navigation },
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
