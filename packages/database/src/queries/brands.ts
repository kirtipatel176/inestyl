import { SupabaseClient } from "@supabase/supabase-js";
import { Brand } from "@inestyle/shared-types";

export function mapDbBrandToDomain(row: any): Brand {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    logo: row.logo_url,
    category: row.category,
    description: row.description || "",
    itemCount: row.item_count || 0,
    featured: Boolean(row.is_featured),
    tileBg: row.tile_bg || "#111111",
    textColor: row.text_color || "#FFFFFF",
  };
}

export async function getActiveBrands(client: SupabaseClient): Promise<Brand[]> {
  const { data, error } = await client
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Failed to query brands:", error);
    return [];
  }

  return data.map(mapDbBrandToDomain);
}

export async function getBrandBySlug(client: SupabaseClient, slug: string): Promise<Brand | null> {
  const { data, error } = await client
    .from("brands")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapDbBrandToDomain(data);
}
