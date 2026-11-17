import { NextResponse } from "next/server";
import { createElevatedClient } from "@inestyle/database";

export async function GET(request: Request) {
  // Public storefront should not expose store analytics
  return NextResponse.json(
    { success: false, error: "Unauthorized. Analytics are restricted to authenticated admin staff." },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, targetId, targetName, metadata } = body;

    if (!type) {
      return NextResponse.json(
        { success: false, error: "Event type is required" },
        { status: 400 }
      );
    }

    const elevatedClient = createElevatedClient();
    const userAgent = request.headers.get("user-agent") || undefined;
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0] || undefined;

    await elevatedClient.from("activity_logs").insert({
      action: type,
      entity_type: "analytics_event",
      entity_id: targetId || "session",
      entity_name: targetName || type,
      author_name: "Storefront Visitor",
      details: metadata ? JSON.stringify(metadata) : null,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record event" },
      { status: 500 }
    );
  }
}
