import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data: items, error } = await supabase
      .from("navigation_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);

    // Group items into mega menu format for admin
    const navigation = {
      footwear: items?.filter((i) => i.parent_id === "nav-footwear" || i.label?.includes("Shoes") || i.label?.includes("Sneakers")) || [],
      clothing: items?.filter((i) => i.parent_id === "nav-clothing" || i.label?.includes("Polos") || i.label?.includes("Jeans")) || [],
      men: items?.filter((i) => i.parent_id === "nav-men") || [],
      women: items?.filter((i) => i.parent_id === "nav-women") || [],
      allItems: items || [],
    };

    return NextResponse.json(
      { success: true, navigation },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
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

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { navigation, item, author } = body;
    const supabase = createServiceClient();

    if (item && item.id) {
      await supabase
        .from("navigation_items")
        .upsert({
          id: item.id,
          label: item.label || item.name,
          url: item.url || item.href,
          badge: item.badge || null,
          sort_order: item.sort_order ?? item.sortOrder ?? 0,
          is_active: item.is_active ?? item.isActive ?? true,
          updated_at: new Date().toISOString(),
        });
    }

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "navigation_update",
      entityType: "navigation",
      entityId: "nav-root",
      authorName: author || user.fullName || "Staff Member",
      details: "Updated navigation menu items in Supabase",
    });

    return NextResponse.json({ success: true, message: "Navigation updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update navigation" },
      { status: 500 }
    );
  }
}
