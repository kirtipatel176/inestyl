import { NextResponse } from "next/server";
import { getAuditLogs } from "@/lib/server-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const action = searchParams.get("action");

    let logs = getAuditLogs();
    if (entity) {
      logs = logs.filter((l) => l.entity.toLowerCase() === entity.toLowerCase());
    }
    if (action) {
      logs = logs.filter((l) => l.action.toLowerCase() === action.toLowerCase());
    }

    return NextResponse.json({ success: true, count: logs.length, logs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch audit logs" },
      { status: 500 }
    );
  }
}
