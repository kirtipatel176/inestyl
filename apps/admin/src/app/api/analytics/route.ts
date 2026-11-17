import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { createServiceClient } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServiceClient();

    // Query aggregate counts from Supabase
    const [prodRes, enqRes, logsRes] = await Promise.all([
      supabase.from("products").select("id, title, brand_id, status", { count: "exact" }),
      supabase.from("enquiries").select("id, status, created_at", { count: "exact" }),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    const products = prodRes.data || [];
    const enquiries = enqRes.data || [];
    const logs = logsRes.data || [];

    const totalProducts = prodRes.count || products.length;
    const publishedProducts = products.filter((p) => p.status === "published").length;
    const draftProducts = products.filter((p) => p.status === "draft").length;

    const totalEnquiries = enqRes.count || enquiries.length;
    const newEnquiries = enquiries.filter((e) => e.status === "new").length;
    const convertedEnquiries = enquiries.filter((e) => e.status === "converted").length;

    // View counts from activity logs
    const viewEvents = logs.filter((l) => l.action === "product_view");
    const whatsappEvents = logs.filter((l) => l.action === "whatsapp_click");

    const summary = {
      totalProducts,
      publishedProducts,
      draftProducts,
      totalEnquiries,
      newEnquiries,
      convertedEnquiries,
      totalProductViews: viewEvents.length,
      totalWhatsAppConsultations: whatsappEvents.length,
      recentEvents: logs.slice(0, 15),
    };

    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
