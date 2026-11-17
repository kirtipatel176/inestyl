import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { createServiceClient } from "@inestyle/database";

export async function GET() {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServiceClient();

    // 1. Fetch real low-stock / out-of-stock inventory
    const { data: lowStockRows } = await supabase
      .from("inventory")
      .select(`
        id,
        available_quantity,
        reorder_threshold,
        product_variants (
          id,
          size,
          colour,
          sku,
          products (
            id,
            title
          )
        )
      `)
      .lte("available_quantity", 2)
      .limit(10);

    // 2. Fetch real new enquiries
    const { data: newEnquiries } = await supabase
      .from("enquiries")
      .select("id, product_title, created_at, customers(full_name)")
      .eq("status", "new")
      .order("created_at", { ascending: false })
      .limit(5);

    const notifications: any[] = [];

    (lowStockRows || []).forEach((row: any) => {
      const v = row.product_variants || {};
      const p = v.products || {};
      const isOutOfStock = row.available_quantity === 0;

      notifications.push({
        id: `notif-inv-${row.id}`,
        type: isOutOfStock ? "out_of_stock" : "low_stock",
        title: isOutOfStock ? `Out of Stock: ${p.title || "Product"}` : `Low Stock: ${p.title || "Product"}`,
        message: `${v.size ? `Size UK ${v.size}` : ""} ${v.colour || ""} has ${row.available_quantity} units remaining at Kapadwanj flagship.`,
        timestamp: new Date().toISOString(),
        read: false,
        link: "/admin?tab=inventory",
      });
    });

    (newEnquiries || []).forEach((enq: any) => {
      const cust = enq.customers?.full_name || "Guest";
      notifications.push({
        id: `notif-enq-${enq.id}`,
        type: "new_enquiry",
        title: `New Consultation Enquiry: ${cust}`,
        message: `Customer inquired about ${enq.product_title || "flagship product"}.`,
        timestamp: enq.created_at,
        read: false,
        link: "/admin?tab=enquiries",
      });
    });

    const settings = {
      lowStockThreshold: 2,
      alertLowStock: true,
      alertOutOfStock: true,
      alertNewEnquiry: true,
      alertScheduledBanner: true,
      alertProductPublication: true,
      alertFailedUploads: true,
    };

    return NextResponse.json({
      success: true,
      notifications,
      settings,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Notification preferences acknowledged" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
