import { SupabaseClient } from "@supabase/supabase-js";

export async function logActivityMutation(
  client: SupabaseClient,
  params: {
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
  }
) {
  try {
    const { error } = await client.rpc("log_activity", {
      p_action: params.action,
      p_details: params.details || null,
      p_entity_id: params.entityId,
      p_entity_name: params.entityName || null,
      p_entity_type: params.entityType,
      p_new_state: params.newState || {},
      p_previous_state: params.previousState || {},
    });

    if (error) {
      // Fallback to direct insert if RPC signature differs
      await client.from("activity_logs").insert({
        user_id: params.userId || null,
        action: params.action,
        entity_type: params.entityType,
        entity_id: params.entityId,
        entity_name: params.entityName || null,
        author_name: params.authorName || "Staff Member",
        previous_state: params.previousState || null,
        new_state: params.newState || null,
        details: params.details || null,
        ip_address: params.ipAddress || null,
        user_agent: params.userAgent || null,
      });
    }
  } catch (err: any) {
    console.warn("Failed to record activity log:", err.message);
  }
}
