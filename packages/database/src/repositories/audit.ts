import { SupabaseClient } from "@supabase/supabase-js";
import { logActivityMutation } from "../mutations/audit";
import { AuditLogEntry } from "@inestyle/shared-types";

export class AuditRepository {
  constructor(private client: SupabaseClient) {}

  async log(params: {
    userId?: string;
    action: string;
    entityType: string;
    entityId: string;
    entityName?: string;
    authorName: string;
    previousState?: any;
    newState?: any;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return logActivityMutation(this.client, params);
  }

  async getLogs(limit = 100): Promise<AuditLogEntry[]> {
    const { data, error } = await this.client
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error("Failed to fetch audit logs:", error);
      return [];
    }

    return data.map((log: any) => ({
      id: log.id,
      timestamp: log.created_at,
      action: log.action,
      entity: log.entity_type,
      entityId: log.entity_id,
      entityName: log.entity_name || undefined,
      author: log.author_name,
      previousValue: log.previous_state,
      updatedValue: log.new_state,
      details: log.details || "",
    }));
  }
}
