import { NextResponse } from "next/server";
import { getAnalyticsSummary, recordAnalyticsEvent } from "@/lib/server-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get("range") || "all") as "today" | "7d" | "30d" | "all";

    const summary = getAnalyticsSummary(timeRange);
    return NextResponse.json({ success: true, ...summary });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
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

    const event = recordAnalyticsEvent(type, targetId, targetName, metadata);
    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to track analytics event" },
      { status: 500 }
    );
  }
}
