import { SupabaseClient } from "@supabase/supabase-js";
import { Product, ProductVariant, ProductColour } from "@inestyle/shared-types";
import { ProductQueryFilters, PaginatedResult } from "../types";

/**
 * Maps a joined Supabase product row to the domain Product interface.
 */
export function mapDbProductToDomain(row: any): Product {
  const media = Array.isArray(row.product_media) ? row.product_media : [];
  const primaryMedia = media.find((m: any) => m.is_primary) || media[0];
  const gallery = media
    .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map((m: any) => m.secure_url);

  const rawVariants = Array.isArray(row.product_variants) ? row.product_variants : [];
  const variants: ProductVariant[] = rawVariants.map((v: any) => {
    // Inventory may be joined as single object or array
    const inv = Array.isArray(v.inventory) ? v.inventory[0] : v.inventory;
    const availableQty = inv?.available_quantity ?? v.stock_quantity ?? 0;

    return {
      id: v.id,
      size: v.size,
      colour: v.colour,
      colourHex: v.colour_hex || "#111111",
      sku: v.sku,
      stockQuantity: availableQty,
      isAvailable: v.is_active && availableQty > 0,
      priceOverride: v.price_override ? Number(v.price_override) : undefined,
      barcode: v.barcode || undefined,
    };
  });

  // Extract unique colours with hex
  const coloursMap = new Map<string, string>();
  variants.forEach((v) => {
    if (!coloursMap.has(v.colour)) {
      coloursMap.set(v.colour, v.colourHex || "#111111");
    }
  });
  const colours: ProductColour[] = Array.from(coloursMap.entries()).map(([name, hex]) => ({ name, hex }));

  // Extract sizes preserving order
  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const inStockSizes = Array.from(
    new Set(variants.filter((v) => v.isAvailable && v.stockQuantity > 0).map((v) => v.size))
  );

  // Extract collection slugs
  const rawCollections = Array.isArray(row.product_collections) ? row.product_collections : [];
  const collectionSlugs = rawCollections
    .map((pc: any) => pc.collections?.slug || pc.collection_id)
    .filter(Boolean);

  const fallbackImage = "/images/placeholder-product.svg";

  // Extract category name safely whether joined as singular object or array
  const rawCategory = row.categories || row["categories!products_category_id_fkey"];
  const categoryName = Array.isArray(rawCategory)
    ? rawCategory[0]?.name
    : rawCategory?.name;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    sku: row.sku,
    brand: row.brands?.name || row.brand_id || "INESTYLE",
    brandSlug: row.brands?.slug || row.brand_id || "inestyle",
    category: categoryName || (row.department === "footwear" ? "Shoes" : "Clothing"),
    subcategory: row.subcategory || undefined,
    type: row.department === "footwear" ? "footwear" : "clothing",
    department: row.department,
    gender: row.gender,
    collections: collectionSlugs,
    mrp: Number(row.regular_price),
    outletPrice: Number(row.sale_price),
    discount: Number(row.discount_percent || 0),
    image: primaryMedia ? primaryMedia.secure_url : gallery[0] || fallbackImage,
    gallery: gallery.length > 0 ? gallery : [fallbackImage],
    sizes,
    inStockSizes,
    colours,
    isNew: Boolean(row.is_new),
    isFeatured: Boolean(row.is_featured),
    description: row.description || "",
    features: Array.isArray(row.features) ? row.features : [],
    variants,
    shoeType: row.footwear_attributes?.shoeType,
    upperMaterial: row.footwear_attributes?.upperMaterial,
    soleDetails: row.footwear_attributes?.soleDetails,
    fitInfo: row.footwear_attributes?.fitInfo,
    footwearAttributes: row.footwear_attributes || undefined,
    clothingCategory: row.clothing_attributes?.clothingCategory,
    fit: row.clothing_attributes?.fit,
    sleeve: row.clothing_attributes?.sleeve,
    fabric: row.clothing_attributes?.fabric,
    careInstructions: row.clothing_attributes?.careInstructions,
    clothingAttributes: row.clothing_attributes || undefined,
    metaTitle: row.seo_title,
    metaDescription: row.seo_description,
    status: row.status,
    hasVideo: Boolean(row.has_video),
    videoUrl: row.video_url || undefined,
    publishedAt: row.published_at || undefined,
    scheduledPublishDate: row.scheduled_publish_date || undefined,
  };
}

/**
 * Base select string for complete relational hydration of product rows.
 */
export const PRODUCT_SELECT_QUERY = `
  *,
  brands(id, name, slug, logo_url),
  categories!products_category_id_fkey(id, name, slug),
  product_variants(*, inventory(available_quantity, reserved_quantity)),
  product_media(*),
  product_collections(collection_id, collections(title, slug))
`;

/**
 * Fetches published products with comprehensive filtering, sorting, and pagination.
 */
export async function getPublishedProducts(
  client: SupabaseClient,
  filters: ProductQueryFilters = {}
): Promise<PaginatedResult<Product>> {
  let query = client
    .from("products")
    .select(PRODUCT_SELECT_QUERY, { count: "exact" });

  if (!filters.includeAllStatus) {
    query = query.eq("status", "published");
  }

  if (filters.department) {
    query = query.eq("department", filters.department);
  }

  if (filters.gender) {
    query = query.or(`gender.eq.${filters.gender},gender.eq.Unisex`);
  }

  if (filters.brand) {
    // Matches brand slug via joined brand
    query = query.eq("brands.slug", filters.brand.toLowerCase());
  }

  if (filters.subcategory) {
    query = query.ilike("subcategory", `%${filters.subcategory}%`);
  }

  if (filters.isFeatured !== undefined) {
    query = query.eq("is_featured", filters.isFeatured);
  }

  if (filters.isNew !== undefined) {
    query = query.eq("is_new", filters.isNew);
  }

  if (filters.search) {
    const term = `%${filters.search.trim()}%`;
    query = query.or(`title.ilike.${term},sku.ilike.${term},description.ilike.${term}`);
  }

  // Sorting
  if (filters.sortBy === "price_asc") {
    query = query.order("sale_price", { ascending: true });
  } else if (filters.sortBy === "price_desc") {
    query = query.order("sale_price", { ascending: false });
  } else if (filters.sortBy === "discount") {
    query = query.order("discount_percent", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // Pagination
  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, Math.min(100, filters.limit || 24));
  const offset = filters.offset !== undefined ? filters.offset : (page - 1) * limit;

  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error in getPublishedProducts query:", error);
    return { data: [], totalCount: 0, page, limit, totalPages: 0 };
  }

  let mapped = (data || []).map((row: any) => mapDbProductToDomain(row));

  // If filtered by collection slug, filter mapped products
  if (filters.collectionSlug) {
    mapped = mapped.filter((p) => p.collections.includes(filters.collectionSlug!));
  }

  const totalCount = count || mapped.length;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: mapped,
    totalCount,
    page,
    limit,
    totalPages,
  };
}

/**
 * Retrieves a single product by its unique slug.
 */
export async function getProductBySlug(
  client: SupabaseClient,
  slug: string,
  publishedOnly = true
): Promise<Product | null> {
  let query = client
    .from("products")
    .select(PRODUCT_SELECT_QUERY)
    .eq("slug", slug);

  if (publishedOnly) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapDbProductToDomain(data);
}

/**
 * Retrieves a single product by its ID.
 */
export async function getProductById(
  client: SupabaseClient,
  id: string,
  publishedOnly = false
): Promise<Product | null> {
  let query = client
    .from("products")
    .select(PRODUCT_SELECT_QUERY)
    .eq("id", id);

  if (publishedOnly) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapDbProductToDomain(data);
}

/**
 * Fetches related products matching brand or department.
 */
export async function getRelatedProducts(
  client: SupabaseClient,
  currentProductId: string,
  department: string,
  brandSlug: string,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await client
    .from("products")
    .select(PRODUCT_SELECT_QUERY)
    .eq("status", "published")
    .neq("id", currentProductId)
    .or(`department.eq.${department},brands.slug.eq.${brandSlug}`)
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((row: any) => mapDbProductToDomain(row));
}
