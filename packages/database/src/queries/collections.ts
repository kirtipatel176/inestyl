import { SupabaseClient } from "@supabase/supabase-js";
import { CollectionItem } from "@inestyle/shared-types";

export function mapDbCollectionToDomain(row: any): CollectionItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    image: row.image_url,
    badge: row.badge || undefined,
    featured: Boolean(row.is_featured),
    itemCount: row.product_collections?.length ?? undefined,
  };
}

export async function getActiveCollections(client: SupabaseClient): Promise<CollectionItem[]> {
  const { data, error } = await client
    .from("collections")
    .select("*, product_collections(count)")
    .order("display_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to query collections:", error);
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    image: row.image_url,
    badge: row.badge || undefined,
    featured: Boolean(row.is_featured),
    itemCount: row.product_collections?.[0]?.count ?? 0,
  }));
}

export async function getCollectionBySlug(client: SupabaseClient, slug: string): Promise<CollectionItem | null> {
  const { data, error } = await client
    .from("collections")
    .select("*, product_collections(count)")
    .eq("slug", slug.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description || "",
    image: data.image_url,
    badge: data.badge || undefined,
    featured: Boolean(data.is_featured),
    itemCount: data.product_collections?.[0]?.count ?? 0,
  };
}
