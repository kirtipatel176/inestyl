import { SupabaseClient } from "@supabase/supabase-js";
import { SizeGuideTable } from "@inestyle/shared-types";
import { createStorefrontClient } from "../client/browser";

export async function getSizeGuides(client: SupabaseClient = createStorefrontClient()): Promise<Record<string, SizeGuideTable>> {
  const { data, error } = await client
    .from("size_guides")
    .select("*")
    .eq("is_published", true);

  if (error || !data) {
    console.error("Failed to query size guides:", error);
    return {};
  }

  const result: Record<string, SizeGuideTable> = {};
  data.forEach((row: any) => {
    result[row.key] = {
      id: row.id,
      key: row.key,
      title: row.title,
      category: row.category,
      gender: row.gender,
      description: row.description || "",
      measuringTip: row.measuring_tip || "",
      headers: row.headers || [],
      rows: row.rows || [],
      isPublished: row.is_published,
      updatedAt: row.updated_at,
    };
  });

  return result;
}
