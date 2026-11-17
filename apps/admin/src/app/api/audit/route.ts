import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { createServiceClient } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const role = user.role as string;
    if (!hasPermission([user.role as any], "reports.read") && role !== "super_admin" && role !== "admin" && role !== "administrator") {
      return NextResponse.json({ error: "Forbidden: Requires reports.read permission" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const action = searchParams.get("action");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(200, parseInt(limitParam, 10)) : 100;

    const supabase = createServiceClient();
    let query = supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (entity) {
      query = query.ilike("entity_type", entity);
    }
    if (action) {
      query = query.ilike("action", action);
    }

    const { data: logs, error } = await query;
    if (error) throw new Error(error.message);

    const formattedLogs = (logs || []).map((l: any) => ({
      id: l.id,
      action: l.action,
      entity: l.entity_type,
      entityId: l.entity_id,
      entityName: l.entity_name,
      author: l.author_name || "Staff",
      timestamp: l.created_at,
      previousValue: l.previous_state,
      updatedValue: l.new_state,
      details: l.details || `${l.action} on ${l.entity_type}`,
    }));

    return NextResponse.json({ success: true, count: formattedLogs.length, logs: formattedLogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch audit logs" },
      { status: 500 }
    );
  }
}
