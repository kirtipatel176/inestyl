import { SupabaseClient } from "@supabase/supabase-js";
import { BannerItem, HomepageSectionConfig } from "@inestyle/shared-types";

export async function getHeroBanners(client: SupabaseClient): Promise<BannerItem[]> {
  const now = new Date().toISOString();
  const { data, error } = await client
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to query banners:", error);
    return [];
  }

  // Filter out any date-expired banners
  return data
    .filter((b: any) => {
      if (b.starts_at && b.starts_at > now) return false;
      if (b.ends_at && b.ends_at < now) return false;
      return true;
    })
    .map((b: any) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle || "",
      imageUrl: b.image_url,
      linkUrl: b.link_url || "/products",
      ctaLabel: b.cta_label || "Explore Collection",
      position: b.position,
      sortOrder: b.sort_order,
      isActive: b.is_active,
      startsAt: b.starts_at || undefined,
      endsAt: b.ends_at || undefined,
      createdAt: b.created_at || now,
      updatedAt: b.updated_at || now,
    }));
}

export async function getHomepageSections(client: SupabaseClient): Promise<HomepageSectionConfig[]> {
  const { data, error } = await client
    .from("homepage_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to query homepage sections:", error);
    return [];
  }

  return data.map((s: any) => ({
    id: s.id,
    key: s.key,
    label: s.label,
    enabled: s.is_enabled,
    order: s.sort_order,
  }));
}
