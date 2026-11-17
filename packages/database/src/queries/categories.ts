import { SupabaseClient } from "@supabase/supabase-js";
import { CategoryItem } from "@inestyle/shared-types";

export function mapDbCategoryToDomain(row: any): CategoryItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    department: row.department,
    parentCategory: row.parent_category_id || undefined,
    description: row.description || undefined,
    itemCount: row.item_count || 0,
  };
}

export async function getCategories(
  client: SupabaseClient,
  department?: "footwear" | "clothing"
): Promise<CategoryItem[]> {
  let query = client.from("categories").select("*");

  if (department) {
    query = query.or(`department.eq.${department},department.eq.both`);
  }

  const { data, error } = await query.order("name", { ascending: true });

  if (error || !data) {
    console.error("Failed to query categories:", error);
    return [];
  }

  return data.map(mapDbCategoryToDomain);
}
