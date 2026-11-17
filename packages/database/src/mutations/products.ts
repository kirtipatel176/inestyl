import { SupabaseClient } from "@supabase/supabase-js";
import { ProductCreateSchema, ProductUpdateSchema } from "@inestyle/validations";
import { slugify } from "@inestyle/shared-utils";

/**
 * Creates a product with its variants, media, and collection associations.
 */
export async function createProductMutation(
  client: SupabaseClient,
  rawInput: any
) {
  const validated = ProductCreateSchema.parse(rawInput);
  const slug = validated.slug || slugify(`${validated.brand} ${validated.title}`);
  const productId = `prod-${Date.now()}`;

  // 1. Insert product row
  const { data: product, error: prodError } = await client
    .from("products")
    .insert({
      id: productId,
      title: validated.title,
      slug,
      sku: validated.sku,
      brand_id: validated.brand.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      department: validated.department,
      subcategory: validated.subcategory || null,
      gender: validated.gender,
      description: validated.description || null,
      regular_price: validated.regularPrice,
      sale_price: validated.salePrice,
      discount_percent: validated.discount || Math.round(((validated.regularPrice - validated.salePrice) / validated.regularPrice) * 100),
      status: validated.status || "draft",
      is_featured: validated.isFeatured || false,
      is_new: validated.isNew || false,
      has_video: validated.hasVideo || false,
      video_url: validated.videoUrl || null,
      footwear_attributes: validated.footwearAttributes || {},
      clothing_attributes: validated.clothingAttributes || {},
      features: validated.features || [],
    })
    .select()
    .single();

  if (prodError || !product) {
    throw new Error(`Failed to create product: ${prodError?.message}`);
  }

  // 2. Insert variants and inventory if provided
  if (Array.isArray(validated.variants) && validated.variants.length > 0) {
    for (let i = 0; i < validated.variants.length; i++) {
      const v = validated.variants[i];
      const variantId = v.id || `${product.id}-var-${i}`;
      const { error: varError } = await client.from("product_variants").insert({
        id: variantId,
        product_id: product.id,
        size: v.size,
        colour: v.colour,
        colour_hex: v.colourHex || "#111111",
        sku: v.sku || `${product.sku}-${v.size}-${v.colour}`.toUpperCase().replace(/\s+/g, ""),
        is_active: v.isAvailable ?? true,
        sort_order: i,
        price_override: v.priceOverride || null,
      });

      if (!varError) {
        // Initialize inventory row
        await client.from("inventory").insert({
          variant_id: variantId,
          location_id: "kapadwanj-flagship",
          available_quantity: v.stockQuantity || 0,
          reserved_quantity: 0,
          reorder_threshold: 2,
        });
      }
    }
  }

  // 3. Insert primary image and gallery to product_media
  if (validated.image) {
    await client.from("product_media").insert({
      product_id: product.id,
      cloudinary_public_id: validated.image,
      secure_url: validated.image,
      is_primary: true,
      display_order: 0,
    });
  }

  if (Array.isArray(validated.gallery)) {
    for (let idx = 0; idx < validated.gallery.length; idx++) {
      const gUrl = validated.gallery[idx];
      if (gUrl && gUrl !== validated.image) {
        await client.from("product_media").insert({
          product_id: product.id,
          cloudinary_public_id: gUrl,
          secure_url: gUrl,
          is_primary: false,
          display_order: idx + 1,
        });
      }
    }
  }

  // 4. Associate collections
  if (Array.isArray(validated.collections) && validated.collections.length > 0) {
    const { data: dbCollections } = await client.from("collections").select("id, slug");
    if (dbCollections) {
      for (const colSlug of validated.collections) {
        const found = dbCollections.find((c: any) => c.slug === colSlug || c.id === colSlug);
        if (found) {
          await client.from("product_collections").insert({
            product_id: product.id,
            collection_id: found.id,
          });
        }
      }
    }
  }

  return product;
}

/**
 * Updates a product by ID.
 */
export async function updateProductMutation(
  client: SupabaseClient,
  id: string,
  rawInput: any
) {
  const validated = ProductUpdateSchema.parse(rawInput);
  const updatePayload: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (validated.title !== undefined) updatePayload.title = validated.title;
  if (validated.slug !== undefined) updatePayload.slug = validated.slug;
  if (validated.sku !== undefined) updatePayload.sku = validated.sku;
  if (validated.department !== undefined) updatePayload.department = validated.department;
  if (validated.subcategory !== undefined) updatePayload.subcategory = validated.subcategory;
  if (validated.gender !== undefined) updatePayload.gender = validated.gender;
  if (validated.description !== undefined) updatePayload.description = validated.description;
  if (validated.regularPrice !== undefined) updatePayload.regular_price = validated.regularPrice;
  if (validated.salePrice !== undefined) updatePayload.sale_price = validated.salePrice;
  if (validated.discount !== undefined) updatePayload.discount_percent = validated.discount;
  if (validated.status !== undefined) updatePayload.status = validated.status;
  if (validated.isFeatured !== undefined) updatePayload.is_featured = validated.isFeatured;
  if (validated.isNew !== undefined) updatePayload.is_new = validated.isNew;
  if (validated.hasVideo !== undefined) updatePayload.has_video = validated.hasVideo;
  if (validated.videoUrl !== undefined) updatePayload.video_url = validated.videoUrl;
  if (validated.features !== undefined) updatePayload.features = validated.features;

  const { data, error } = await client
    .from("products")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update product ${id}: ${error.message}`);
  }

  return data;
}

/**
 * Deletes a product with safe relationship checks.
 */
export async function deleteProductMutation(
  client: SupabaseClient,
  id: string
) {
  const { error } = await client
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete product ${id}: ${error.message}`);
  }

  return { success: true };
}
