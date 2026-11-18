import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { createServiceClient, getNavigationTree, logActivityMutation } from "@inestyle/database";
import { DEFAULT_NAVIGATION_CONFIG } from "@/config/navigation";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const tree = await getNavigationTree(supabase);

    // Merge or fallback to DEFAULT_NAVIGATION_CONFIG so all required keys are guaranteed
    const navigation = {
      header: tree?.header?.length ? tree.header : DEFAULT_NAVIGATION_CONFIG.header,
      footwearMegaMenu: tree?.footwearMegaMenu?.length ? tree.footwearMegaMenu : DEFAULT_NAVIGATION_CONFIG.footwearMegaMenu,
      clothingMegaMenu: tree?.clothingMegaMenu?.length ? tree.clothingMegaMenu : DEFAULT_NAVIGATION_CONFIG.clothingMegaMenu,
      menMegaMenu: tree?.menMegaMenu?.length ? tree.menMegaMenu : DEFAULT_NAVIGATION_CONFIG.menMegaMenu,
      womenMegaMenu: tree?.womenMegaMenu?.length ? tree.womenMegaMenu : DEFAULT_NAVIGATION_CONFIG.womenMegaMenu,
      collections: tree?.collections?.length ? tree.collections : DEFAULT_NAVIGATION_CONFIG.collections,
      brands: tree?.brands?.length ? tree.brands : DEFAULT_NAVIGATION_CONFIG.brands,
      footer: tree?.footer?.length ? tree.footer : DEFAULT_NAVIGATION_CONFIG.footer,
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
    // If Supabase is unreachable or misconfigured, fallback gracefully to complete default config
    return NextResponse.json(
      { success: true, navigation: DEFAULT_NAVIGATION_CONFIG, fallback: true, warning: error.message },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
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
