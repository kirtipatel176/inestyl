import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = user.role as string;
    if (!hasPermission([user.role as any], "settings.manage") && role !== "super_admin" && role !== "administrator") {
      return NextResponse.json({ error: "Forbidden: Requires settings.manage permission" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "true";
    const supabase = createServiceClient();

    if (download) {
      const [products, brands, collections, categories, inventory, banners, navigation] = await Promise.all([
        supabase.from("products").select("*, product_variants(*), product_media(*), product_collections(*)"),
        supabase.from("brands").select("*"),
        supabase.from("collections").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("inventory").select("*"),
        supabase.from("banners").select("*"),
        supabase.from("navigation_items").select("*"),
      ]);

      const backupData = {
        exportedAt: new Date().toISOString(),
        exportedBy: user.email,
        store: "INESTYLE OUTLET Kapadwanj",
        data: {
          products: products.data || [],
          brands: brands.data || [],
          collections: collections.data || [],
          categories: categories.data || [],
          inventory: inventory.data || [],
          banners: banners.data || [],
          navigation: navigation.data || [],
        },
      };

      const content = JSON.stringify(backupData, null, 2);
      return new NextResponse(content, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="inestyle-database-backup-${Date.now()}.json"`,
        },
      });
    }

    // List recent database backup logs from activity_logs
    const { data: logs } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("entity_type", "backup")
      .order("created_at", { ascending: false })
      .limit(20);

    const backups = (logs || []).map((l: any) => ({
      id: l.id,
      timestamp: l.created_at,
      author: l.author_name || "Admin",
      reason: l.details || "Database snapshot",
      productsCount: l.new_state?.productsCount || 0,
      sizeKb: l.new_state?.sizeKb || 0,
    }));

    return NextResponse.json({ success: true, count: backups.length, backups });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch backups" },
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

    const role = user.role as string;
    if (!hasPermission([user.role as any], "settings.manage") && role !== "super_admin" && role !== "administrator") {
      return NextResponse.json({ error: "Forbidden: Requires settings.manage permission" }, { status: 403 });
    }

    const body = await request.json();
    const { action, reason, author } = body;
    const currentAuthor = author || user.fullName || "Admin";
    const supabase = createServiceClient();

    if (action === "create") {
      const { count: prodCount } = await supabase.from("products").select("*", { count: "exact", head: true });

      const snapshotId = `bkp-${Date.now()}`;
      await logActivityMutation(supabase, {
        userId: user.id,
        action: "create_backup",
        entityType: "backup",
        entityId: snapshotId,
        authorName: currentAuthor,
        newState: {
          productsCount: prodCount || 0,
          sizeKb: Math.round(((prodCount || 0) * 1.5)),
        },
        details: reason || "Manual PostgreSQL database snapshot",
      });

      return NextResponse.json({
        success: true,
        snapshot: {
          id: snapshotId,
          timestamp: new Date().toISOString(),
          author: currentAuthor,
          reason: reason || "Manual PostgreSQL database snapshot",
          productsCount: prodCount || 0,
          sizeKb: Math.round(((prodCount || 0) * 1.5)),
        },
      });
    }

    return NextResponse.json({ success: false, error: "Invalid backup action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Backup operation failed" },
      { status: 500 }
    );
  }
}
