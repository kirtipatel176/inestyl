import { NextResponse } from "next/server";
import { getNavigation, updateNavigation } from "@/lib/server-db";

export async function GET() {
  try {
    const navigation = getNavigation();
    return NextResponse.json({ success: true, navigation });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch navigation" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { navigation, author } = body;

    if (!navigation) {
      return NextResponse.json(
        { success: false, error: "Navigation payload is required" },
        { status: 400 }
      );
    }

    const updated = updateNavigation(navigation, author || "Admin (Kapadwanj)");
    return NextResponse.json({ success: true, navigation: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update navigation" },
      { status: 500 }
    );
  }
}
