import { SupabaseClient } from "@supabase/supabase-js";
import { HomepageSectionConfig } from "@inestyle/shared-types";

export async function updateHomepageSectionsMutation(
  client: SupabaseClient,
  sections: HomepageSectionConfig[]
) {
  for (const s of sections) {
    const { error } = await client
      .from("homepage_sections")
      .update({
        is_enabled: s.enabled,
        sort_order: s.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", s.id);

    if (error) {
      console.error(`Failed to update homepage section ${s.id}:`, error);
    }
  }

  return { success: true };
}
