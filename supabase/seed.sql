-- ==============================================================================
-- INESTYLE OUTLET — Comprehensive Development Seed Data
-- Auto-generated from existing verified store catalogue
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BRANDS
-- ------------------------------------------------------------------------------
INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('nike', 'Nike', 'nike', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/nike.svg', 'both', 'World-renowned athletic footwear and technical performance apparel.', 18, true, '#111111', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('puma', 'Puma', 'puma', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/puma.svg', 'both', 'Fast-forward sportswear and iconic lifestyle street sneakers.', 14, true, '#111111', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('adidas', 'adidas', 'adidas', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/adidas.svg', 'both', 'Three-stripe legacy blending cutting-edge cushioning with retro court heritage.', 16, true, '#1E1E1E', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('hoka', 'HOKA', 'hoka', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/hoka.svg', 'footwear', 'Maximalist performance running shoes engineered for extreme road and trail comfort.', 10, true, '#2B5876', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('levis', 'Levi''s', 'levis', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/levis.svg', 'apparel', 'The definitive global authority on premium denim, 501 classics and jackets.', 15, true, '#A8201A', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('diesel', 'DIESEL', 'diesel', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/diesel.svg', 'apparel', 'Italian high-fashion premium denim, distressed treatments and contemporary apparel.', 9, true, '#4E4B46', '#FFFFFF')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;

INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES ('us-polo-assn', 'U.S. Polo Assn.', 'us-polo-assn', 'https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/us-polo-assn.svg', 'apparel', 'Classic American equestrian heritage sportswear, authentic pique polos and casual wear.', 12, true, '#EAE3D9', '#111111')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;


-- ------------------------------------------------------------------------------
-- 2. CATEGORIES
-- ------------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-footwear', 'Footwear', 'footwear', 'footwear', NULL, 'All athletic, lifestyle and casual footwear.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-clothing', 'Clothing', 'clothing', 'clothing', NULL, 'Apparel, denim, tees and jackets.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-sneakers', 'Sneakers', 'sneakers', 'footwear', 'cat-footwear', 'Lifestyle and street sneakers.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-running', 'Running', 'running', 'footwear', 'cat-footwear', 'Performance running shoes.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-casual-shoes', 'Casual Shoes', 'casual-shoes', 'footwear', 'cat-footwear', 'Comfortable daily footwear.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-jeans', 'Jeans', 'jeans', 'clothing', 'cat-clothing', 'Original denim and trousers.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-tshirts', 'T-Shirts', 't-shirts', 'clothing', 'cat-clothing', 'Polo and graphic crew tees.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES ('cat-jackets', 'Jackets', 'jackets', 'clothing', 'cat-clothing', 'Outerwear, track tops and hoodies.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- ------------------------------------------------------------------------------
-- 3. COLLECTIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-1', 'new-arrivals', 'New Arrivals', 'The latest verified drops from Nike, adidas, Puma, HOKA, Levi''s, and DIESEL.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/new-arrivals', 'Just Landed', true, 1)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-2', 'trending-styles', 'Trending Styles', 'High-demand silhouettes and top street culture staples across footwear and denim.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/trending-styles', 'Popular', true, 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-3', 'everyday-essentials', 'Everyday Essentials', 'Timeless pique polos, daily trainers, relaxed tees, and 501 straight-fit denims.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/everyday-essentials', 'Wardrobe Staples', true, 3)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-4', 'sports-performance', 'Sports & Performance', 'Engineered road runners, trail grip shoes, and sweat-wicking technical apparel.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/sports-performance', 'Athletic Grade', true, 4)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-5', 'sneakers-collection', 'Sneakers Collection', 'Iconic court retros, chunky runners, and modern lifestyle silhouettes.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/sneakers-collection', 'Sneakerhead Edit', true, 5)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-6', 'running-collection', 'Running Collection', 'Ultra-cushioned road racers and trail conquering footwear from HOKA, Nike & adidas.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/women/hoka-clifton-9', 'Road & Trail', true, 6)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-7', 'casual-wear', 'Casual Wear', 'Off-duty shirts, heritage sneakers, relaxed-fit hoodies, and comfortable layers.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/nike-club-hoodie', 'Effortless Style', true, 7)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-8', 'premium-clothing', 'Premium Clothing', 'Heavyweight Italian denim trucker jackets, oxford button-downs, and luxury fleece.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/diesel-denim-jacket', 'Luxury Denim', true, 8)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-9', 'weekend-edit', 'Weekend Edit', 'Relaxed silhouettes engineered for leisure, travel, and casual social moments.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/collections/weekend-edit', 'Casual Curation', true, 9)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-10', 'seasonal-collection', 'Seasonal Collection', 'Curated transitional outerwear, breathable mesh runners, and seasonal denim washes.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/clothing/category-apparel-card', 'Autumn / Winter', true, 10)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;
INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES ('col-11', 'outlet-exclusives', 'Outlet Exclusives', 'Exceptional values and limited-availability surplus inventory up to 40% below MRP.', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/store/store-interior-1', 'Store Exclusives', true, 11)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;

-- ------------------------------------------------------------------------------
-- 4. PRODUCTS, VARIANTS, MEDIA & INVENTORY
-- ------------------------------------------------------------------------------
INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-1794823413077',
    'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm)',
    'nike-air-max-270-copy-5674-copy-8724-copy-8947-copy-3077',
    'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240',
    'nike',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Men',
    'Nike''s first lifestyle Air unit delivers energy with every step. Boasting Nike''s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as incredible as it looks.',
    12995,
    8995,
    31,
    'archived',
    true,
    false,
    'Nike Air Max 270 — Outlet Price | iNESTYL OUTLET',
    'Shop authentic Nike Air Max 270 at verified outlet pricing in Kapadwanj.',
    true,
    '/videos/products/nike-air-max-270.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Engineered breathable mesh and neoprene","soleDetails":"Dual-density foam with 270 Max Air heel unit","fitInfo":"True to UK size. For wide feet, consider half size up."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Large-volume Max Air unit delivers responsive cushioning.","Dual-density foam sole offers comfort for casual wear.","Stretchy inner sleeve creates a snug, sock-like fit.","100% Verified Authentic Stock at Kapadwanj Flagship."}'::text[],
    now()
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823413077', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823413077', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823413077', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823413077', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823413077', 'inestyle-outlet/products/footwear/men/nike-air-max-270', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm)', 0, true);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823413077', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 1', 1, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823413077', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 2', 2, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823413077', 'inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 3', 3, false);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-0-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-6-WHITEBLACK', 'White/Black', '#EAEAEA', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-0-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-6-TRIPLEBLACK', 'Triple Black', '#111111', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-1-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-7-WHITEBLACK', 'White/Black', '#EAEAEA', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-1-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-7-TRIPLEBLACK', 'Triple Black', '#111111', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-2-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-8-WHITEBLACK', 'White/Black', '#EAEAEA', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-2-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-8-TRIPLEBLACK', 'Triple Black', '#111111', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-3-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-9-WHITEBLACK', 'White/Black', '#EAEAEA', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-3-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-3-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-9-TRIPLEBLACK', 'Triple Black', '#111111', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-4-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-10-WHITEBLACK', 'White/Black', '#EAEAEA', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-4-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-10-TRIPLEBLACK', 'Triple Black', '#111111', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-5-0', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-11-WHITEBLACK', 'White/Black', '#EAEAEA', '11', true, 10)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-5-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-5-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823413077-var-5-1', 'prod-1794823413077', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-COPY-240-11-TRIPLEBLACK', 'Triple Black', '#111111', '11', true, 11)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823413077-var-5-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823413077-var-5-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-1794823408947',
    'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm)',
    'nike-air-max-270-copy-5674-copy-8724-copy-8947',
    'NK-270-WHT-COPY-581-COPY-538-COPY-699',
    'nike',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Men',
    'Nike''s first lifestyle Air unit delivers energy with every step. Boasting Nike''s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as incredible as it looks.',
    12995,
    8995,
    31,
    'archived',
    true,
    false,
    'Nike Air Max 270 — Outlet Price | iNESTYL OUTLET',
    'Shop authentic Nike Air Max 270 at verified outlet pricing in Kapadwanj.',
    true,
    '/videos/products/nike-air-max-270.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Engineered breathable mesh and neoprene","soleDetails":"Dual-density foam with 270 Max Air heel unit","fitInfo":"True to UK size. For wide feet, consider half size up."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Large-volume Max Air unit delivers responsive cushioning.","Dual-density foam sole offers comfort for casual wear.","Stretchy inner sleeve creates a snug, sock-like fit.","100% Verified Authentic Stock at Kapadwanj Flagship."}'::text[],
    now()
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408947', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408947', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408947', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408947', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408947', 'inestyle-outlet/products/footwear/men/nike-air-max-270', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm)', 0, true);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408947', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 1', 1, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408947', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 2', 2, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408947', 'inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) (Copy 03:33 pm) detail 3', 3, false);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-0-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-6-WHITEBLACK', 'White/Black', '#EAEAEA', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-0-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-6-TRIPLEBLACK', 'Triple Black', '#111111', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-1-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-7-WHITEBLACK', 'White/Black', '#EAEAEA', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-1-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-7-TRIPLEBLACK', 'Triple Black', '#111111', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-2-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-8-WHITEBLACK', 'White/Black', '#EAEAEA', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-2-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-8-TRIPLEBLACK', 'Triple Black', '#111111', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-3-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-9-WHITEBLACK', 'White/Black', '#EAEAEA', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-3-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-3-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-9-TRIPLEBLACK', 'Triple Black', '#111111', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-4-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-10-WHITEBLACK', 'White/Black', '#EAEAEA', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-4-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-10-TRIPLEBLACK', 'Triple Black', '#111111', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-5-0', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-11-WHITEBLACK', 'White/Black', '#EAEAEA', '11', true, 10)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-5-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-5-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408947-var-5-1', 'prod-1794823408947', 'NK-270-WHT-COPY-581-COPY-538-COPY-699-11-TRIPLEBLACK', 'Triple Black', '#111111', '11', true, 11)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408947-var-5-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408947-var-5-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-1794823408724',
    'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm)',
    'nike-air-max-270-copy-5674-copy-8724',
    'NK-270-WHT-COPY-581-COPY-538',
    'nike',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Men',
    'Nike''s first lifestyle Air unit delivers energy with every step. Boasting Nike''s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as incredible as it looks.',
    12995,
    8995,
    31,
    'archived',
    true,
    false,
    'Nike Air Max 270 — Outlet Price | iNESTYL OUTLET',
    'Shop authentic Nike Air Max 270 at verified outlet pricing in Kapadwanj.',
    true,
    '/videos/products/nike-air-max-270.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Engineered breathable mesh and neoprene","soleDetails":"Dual-density foam with 270 Max Air heel unit","fitInfo":"True to UK size. For wide feet, consider half size up."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Large-volume Max Air unit delivers responsive cushioning.","Dual-density foam sole offers comfort for casual wear.","Stretchy inner sleeve creates a snug, sock-like fit.","100% Verified Authentic Stock at Kapadwanj Flagship."}'::text[],
    now()
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408724', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408724', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408724', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823408724', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408724', 'inestyle-outlet/products/footwear/men/nike-air-max-270', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm)', 0, true);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408724', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) detail 1', 1, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408724', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) detail 2', 2, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823408724', 'inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) (Copy 03:33 pm) detail 3', 3, false);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-0-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-6-WHITEBLACK', 'White/Black', '#EAEAEA', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-0-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-6-TRIPLEBLACK', 'Triple Black', '#111111', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-1-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-7-WHITEBLACK', 'White/Black', '#EAEAEA', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-1-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-7-TRIPLEBLACK', 'Triple Black', '#111111', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-2-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-8-WHITEBLACK', 'White/Black', '#EAEAEA', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-2-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-8-TRIPLEBLACK', 'Triple Black', '#111111', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-3-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-9-WHITEBLACK', 'White/Black', '#EAEAEA', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-3-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-3-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-9-TRIPLEBLACK', 'Triple Black', '#111111', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-4-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-10-WHITEBLACK', 'White/Black', '#EAEAEA', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-4-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-10-TRIPLEBLACK', 'Triple Black', '#111111', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-5-0', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-11-WHITEBLACK', 'White/Black', '#EAEAEA', '11', true, 10)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-5-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-5-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823408724-var-5-1', 'prod-1794823408724', 'NK-270-WHT-COPY-581-COPY-538-11-TRIPLEBLACK', 'Triple Black', '#111111', '11', true, 11)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823408724-var-5-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823408724-var-5-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-1794823405668',
    'Nike Air Max 270 (Copy 03:33 pm)',
    'nike-air-max-270-copy-5674',
    'NK-270-WHT-COPY-581',
    'nike',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Men',
    'Nike''s first lifestyle Air unit delivers energy with every step. Boasting Nike''s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as incredible as it looks.',
    12995,
    8995,
    31,
    'archived',
    true,
    false,
    'Nike Air Max 270 — Outlet Price | iNESTYL OUTLET',
    'Shop authentic Nike Air Max 270 at verified outlet pricing in Kapadwanj.',
    true,
    '/videos/products/nike-air-max-270.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Engineered breathable mesh and neoprene","soleDetails":"Dual-density foam with 270 Max Air heel unit","fitInfo":"True to UK size. For wide feet, consider half size up."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Large-volume Max Air unit delivers responsive cushioning.","Dual-density foam sole offers comfort for casual wear.","Stretchy inner sleeve creates a snug, sock-like fit.","100% Verified Authentic Stock at Kapadwanj Flagship."}'::text[],
    now()
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823405668', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823405668', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823405668', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1794823405668', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823405668', 'inestyle-outlet/products/footwear/men/nike-air-max-270', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm)', 0, true);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823405668', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) detail 1', 1, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823405668', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) detail 2', 2, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1794823405668', 'inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 (Copy 03:33 pm) detail 3', 3, false);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-0-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-6-WHITEBLACK', 'White/Black', '#EAEAEA', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-0-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-6-TRIPLEBLACK', 'Triple Black', '#111111', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-1-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-7-WHITEBLACK', 'White/Black', '#EAEAEA', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-1-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-7-TRIPLEBLACK', 'Triple Black', '#111111', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-2-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-8-WHITEBLACK', 'White/Black', '#EAEAEA', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-2-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-8-TRIPLEBLACK', 'Triple Black', '#111111', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-3-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-9-WHITEBLACK', 'White/Black', '#EAEAEA', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-3-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-3-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-9-TRIPLEBLACK', 'Triple Black', '#111111', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-4-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-10-WHITEBLACK', 'White/Black', '#EAEAEA', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-4-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-10-TRIPLEBLACK', 'Triple Black', '#111111', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-5-0', 'prod-1794823405668', 'NK-270-WHT-COPY-581-11-WHITEBLACK', 'White/Black', '#EAEAEA', '11', true, 10)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-5-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-5-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1794823405668-var-5-1', 'prod-1794823405668', 'NK-270-WHT-COPY-581-11-TRIPLEBLACK', 'Triple Black', '#111111', '11', true, 11)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1794823405668-var-5-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1794823405668-var-5-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-1',
    'Nike Air Max 270',
    'nike-air-max-270',
    'NK-270-WHT',
    'nike',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Men',
    'Nike''s first lifestyle Air unit delivers energy with every step. Boasting Nike''s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as incredible as it looks.',
    12995,
    8995,
    31,
    'published',
    true,
    false,
    'Nike Air Max 270 — Outlet Price | iNESTYL OUTLET',
    'Shop authentic Nike Air Max 270 at verified outlet pricing in Kapadwanj.',
    true,
    '/videos/products/nike-air-max-270.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Engineered breathable mesh and neoprene","soleDetails":"Dual-density foam with 270 Max Air heel unit","fitInfo":"True to UK size. For wide feet, consider half size up."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Large-volume Max Air unit delivers responsive cushioning.","Dual-density foam sole offers comfort for casual wear.","Stretchy inner sleeve creates a snug, sock-like fit.","100% Verified Authentic Stock at Kapadwanj Flagship."}'::text[],
    '2026-11-16T08:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-1', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1', 'inestyle-outlet/products/footwear/men/nike-air-max-270', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270', 'image', 'webp', 1200, 1200, 'Nike Air Max 270', 0, true);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 detail 1', 1, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 detail 2', 2, false);
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-1', 'inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-sole', 'image', 'webp', 1200, 1200, 'Nike Air Max 270 detail 3', 3, false);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-0-0', 'prod-1', 'NK-270-WHT-6-WHITEBLACK', 'White/Black', '#EAEAEA', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-0-1', 'prod-1', 'NK-270-WHT-6-TRIPLEBLACK', 'Triple Black', '#111111', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-1-0', 'prod-1', 'NK-270-WHT-7-WHITEBLACK', 'White/Black', '#EAEAEA', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-1-1', 'prod-1', 'NK-270-WHT-7-TRIPLEBLACK', 'Triple Black', '#111111', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-2-0', 'prod-1', 'NK-270-WHT-8-WHITEBLACK', 'White/Black', '#EAEAEA', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-2-1', 'prod-1', 'NK-270-WHT-8-TRIPLEBLACK', 'Triple Black', '#111111', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-3-0', 'prod-1', 'NK-270-WHT-9-WHITEBLACK', 'White/Black', '#EAEAEA', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-3-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-3-1', 'prod-1', 'NK-270-WHT-9-TRIPLEBLACK', 'Triple Black', '#111111', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-4-0', 'prod-1', 'NK-270-WHT-10-WHITEBLACK', 'White/Black', '#EAEAEA', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-4-1', 'prod-1', 'NK-270-WHT-10-TRIPLEBLACK', 'Triple Black', '#111111', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-5-0', 'prod-1', 'NK-270-WHT-11-WHITEBLACK', 'White/Black', '#EAEAEA', '11', true, 10)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-5-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-5-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-1-var-5-1', 'prod-1', 'NK-270-WHT-11-TRIPLEBLACK', 'Triple Black', '#111111', '11', true, 11)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-1-var-5-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-1-var-5-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-2',
    'Puma RS-X Reinvention',
    'puma-rs-x',
    'PM-RSX-01',
    'puma',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Unisex',
    'The RS-X is back. The retro-future silhouette of this sneaker returns with progressive aesthetics and angular details, complete with nubuck and suede overlays.',
    9999,
    7999,
    20,
    'published',
    false,
    true,
    'Puma RS-X Reinvention',
    'The RS-X is back. The retro-future silhouette of this sneaker returns with progressive aesthetics and angular details, complete with nubuck and suede overlays.',
    true,
    '/videos/products/puma-rs-x.mp4',
    '{"shoeType":"Sneakers","upperMaterial":"Layered mesh with suede overlays","soleDetails":"Sculpted PU midsole with high-traction rubber","fitInfo":"Standard UK fit, comfortable roomy toe-box."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Running System (RS) retro cushioning technology.","Mesh upper with synthetic and suede overlays.","Lightweight PU midsole for soft strides.","100% Authentic verified distributor import."}'::text[],
    '2026-11-16T07:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-2', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-2', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-2', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-2', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-2', 'inestyle-outlet/products/footwear/men/puma-rs-x', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/puma-rs-x', 'image', 'webp', 1200, 1200, 'Puma RS-X Reinvention', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-0-0', 'prod-2', 'PM-RSX-01-6-WHITEBLACKRED', 'White/Black/Red', '#E5E5E5', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-0-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-0-1', 'prod-2', 'PM-RSX-01-6-DARKSHADOW', 'Dark Shadow', '#222222', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-0-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-1-0', 'prod-2', 'PM-RSX-01-7-WHITEBLACKRED', 'White/Black/Red', '#E5E5E5', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-1-1', 'prod-2', 'PM-RSX-01-7-DARKSHADOW', 'Dark Shadow', '#222222', '7', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-1-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-2-0', 'prod-2', 'PM-RSX-01-8-WHITEBLACKRED', 'White/Black/Red', '#E5E5E5', '8', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-2-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-2-1', 'prod-2', 'PM-RSX-01-8-DARKSHADOW', 'Dark Shadow', '#222222', '8', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-2-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-3-0', 'prod-2', 'PM-RSX-01-9-WHITEBLACKRED', 'White/Black/Red', '#E5E5E5', '9', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-3-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-3-1', 'prod-2', 'PM-RSX-01-9-DARKSHADOW', 'Dark Shadow', '#222222', '9', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-3-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-4-0', 'prod-2', 'PM-RSX-01-10-WHITEBLACKRED', 'White/Black/Red', '#E5E5E5', '10', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-2-var-4-1', 'prod-2', 'PM-RSX-01-10-DARKSHADOW', 'Dark Shadow', '#222222', '10', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-2-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-2-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-3',
    'adidas Ultraboost Light',
    'adidas-ultraboost-light',
    'AD-UB-BLK',
    'adidas',
    'footwear',
    'cat-footwear',
    'Running Shoes',
    'Men',
    'Experience epic energy with the lightest Ultraboost ever made. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST.',
    18999,
    13999,
    26,
    'published',
    true,
    false,
    'adidas Ultraboost Light',
    'Experience epic energy with the lightest Ultraboost ever made. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST.',
    true,
    '/videos/products/adidas-ultraboost-light.mp4',
    '{"shoeType":"Running","upperMaterial":"adidas PRIMEKNIT+ engineered textile","soleDetails":"Light BOOST foam with Continental™ Rubber tread","fitInfo":"Adaptive sock-like fit. True to size."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Light BOOST midsole is 30% lighter with unmatched energy return.","adidas PRIMEKNIT+ textile upper hugs your foot.","Continental™ Better Rubber outsole for superior grip.","Certified genuine outlet inventory."}'::text[],
    '2026-11-16T06:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-3', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-3', 'col-6')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-3', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-3', 'inestyle-outlet/products/footwear/men/adidas-ultraboost', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/adidas-ultraboost', 'image', 'webp', 1200, 1200, 'adidas Ultraboost Light', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-0-0', 'prod-3', 'AD-UB-BLK-7-COREBLACK', 'Core Black', '#111111', '7', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-0-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-0-1', 'prod-3', 'AD-UB-BLK-7-CLOUDWHITE', 'Cloud White', '#FFFFFF', '7', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-0-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-1-0', 'prod-3', 'AD-UB-BLK-8-COREBLACK', 'Core Black', '#111111', '8', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-1-1', 'prod-3', 'AD-UB-BLK-8-CLOUDWHITE', 'Cloud White', '#FFFFFF', '8', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-2-0', 'prod-3', 'AD-UB-BLK-9-COREBLACK', 'Core Black', '#111111', '9', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-2-1', 'prod-3', 'AD-UB-BLK-9-CLOUDWHITE', 'Cloud White', '#FFFFFF', '9', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-2-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-3-0', 'prod-3', 'AD-UB-BLK-10-COREBLACK', 'Core Black', '#111111', '10', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-3-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-3-1', 'prod-3', 'AD-UB-BLK-10-CLOUDWHITE', 'Cloud White', '#FFFFFF', '10', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-3-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-4-0', 'prod-3', 'AD-UB-BLK-11-COREBLACK', 'Core Black', '#111111', '11', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-3-var-4-1', 'prod-3', 'AD-UB-BLK-11-CLOUDWHITE', 'Cloud White', '#FFFFFF', '11', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-3-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-3-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-4',
    'HOKA Clifton 9 Road Runner',
    'hoka-clifton-9',
    'HK-CLF-09',
    'hoka',
    'footwear',
    'cat-footwear',
    'Running Shoes',
    'Men',
    'The ninth iteration of HOKA''s award-winning Clifton franchise is lighter and more cushioned than ever before. Eliminating weight while adding 3mm in stack height.',
    17999,
    14499,
    19,
    'published',
    false,
    true,
    'HOKA Clifton 9 Road Runner',
    'The ninth iteration of HOKA''s award-winning Clifton franchise is lighter and more cushioned than ever before. Eliminating weight while adding 3mm in stack height.',
    true,
    '/videos/products/hoka-clifton-9.mp4',
    '{"shoeType":"Running","upperMaterial":"Engineered breathable jacquard knit","soleDetails":"Compression-molded EVA foam with Durabrasion rubber","fitInfo":"Plush standard fit with early-stage Meta-Rocker transition."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Breathable engineered knit upper.","Compression-molded EVA foam midsole.","Early-stage Meta-Rocker for smooth roll-through.","Direct outlet pricing at Kapadwanj store."}'::text[],
    '2026-11-16T05:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-4', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-4', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-4', 'col-6')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-4', 'inestyle-outlet/products/footwear/women/hoka-clifton-9', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/women/hoka-clifton-9', 'image', 'webp', 1200, 1200, 'HOKA Clifton 9 Road Runner', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-0-0', 'prod-4', 'HK-CLF-09-7-BLACKWHITE', 'Black / White', '#222222', '7', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-0-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-0-1', 'prod-4', 'HK-CLF-09-7-CASTLEROCK', 'Castlerock', '#555555', '7', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-0-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-1-0', 'prod-4', 'HK-CLF-09-8-BLACKWHITE', 'Black / White', '#222222', '8', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-1-1', 'prod-4', 'HK-CLF-09-8-CASTLEROCK', 'Castlerock', '#555555', '8', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-1-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-2-0', 'prod-4', 'HK-CLF-09-9-BLACKWHITE', 'Black / White', '#222222', '9', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-2-1', 'prod-4', 'HK-CLF-09-9-CASTLEROCK', 'Castlerock', '#555555', '9', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-2-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-3-0', 'prod-4', 'HK-CLF-09-10-BLACKWHITE', 'Black / White', '#222222', '10', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-3-1', 'prod-4', 'HK-CLF-09-10-CASTLEROCK', 'Castlerock', '#555555', '10', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-3-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-4-0', 'prod-4', 'HK-CLF-09-11-BLACKWHITE', 'Black / White', '#222222', '11', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-4-var-4-1', 'prod-4', 'HK-CLF-09-11-CASTLEROCK', 'Castlerock', '#555555', '11', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-4-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-4-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-5',
    'Nike Air Force 1 ''07',
    'nike-air-force-1-07',
    'NK-AF1-07',
    'nike',
    'footwear',
    'cat-footwear',
    'Casual Shoes',
    'Unisex',
    'The radiance lives on with the b-ball OG that puts a fresh spin on what you know best.',
    9695,
    7495,
    23,
    'published',
    true,
    false,
    'Nike Air Force 1 ''07',
    'The radiance lives on with the b-ball OG that puts a fresh spin on what you know best.',
    true,
    '/videos/products/nike-air-force-1-07.mp4',
    '{"shoeType":"Casual","upperMaterial":"Full-grain genuine leather","soleDetails":"Solid rubber cupsole with encapsulated Air-Sole","fitInfo":"Runs slightly large. Many customers size down half UK size."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Stitched leather overlays.","Nike Air cushioning.","Low-cut silhouette."}'::text[],
    '2026-11-16T04:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-5', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-5', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-5', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-5', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-5', 'inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-side', 'image', 'webp', 1200, 1200, 'Nike Air Force 1 ''07', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-5-var-0-0', 'prod-5', 'NK-AF1-07-6-TRIPLEWHITE', 'Triple White', '#FFFFFF', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-5-var-0-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-5-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-5-var-1-0', 'prod-5', 'NK-AF1-07-7-TRIPLEWHITE', 'Triple White', '#FFFFFF', '7', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-5-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-5-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-5-var-2-0', 'prod-5', 'NK-AF1-07-8-TRIPLEWHITE', 'Triple White', '#FFFFFF', '8', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-5-var-2-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-5-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-5-var-3-0', 'prod-5', 'NK-AF1-07-9-TRIPLEWHITE', 'Triple White', '#FFFFFF', '9', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-5-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-5-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-5-var-4-0', 'prod-5', 'NK-AF1-07-10-TRIPLEWHITE', 'Triple White', '#FFFFFF', '10', false, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-5-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-5-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-6',
    'Puma Velocity Nitro 2',
    'puma-velocity-nitro-2',
    'PM-VN2-02',
    'puma',
    'footwear',
    'cat-footwear',
    'Sports Shoes',
    'Men',
    'An all-in-one neutral running shoe for any distance, featuring responsive NITRO foam.',
    11999,
    8499,
    29,
    'published',
    false,
    true,
    'Puma Velocity Nitro 2',
    'An all-in-one neutral running shoe for any distance, featuring responsive NITRO foam.',
    true,
    '/videos/products/puma-velocity-nitro-2.mp4',
    '{"shoeType":"Sports","upperMaterial":"Engineered mesh with tactile print","soleDetails":"NITRO foam with full-coverage PUMAGRIP rubber","fitInfo":"Regular athletic fit with secure heel lockdown."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"NITRO foam cushioning.","PUMAGRIP durable rubber.","Reflective accents."}'::text[],
    '2026-11-16T03:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-6', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-6', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-6', 'col-6')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-6', 'inestyle-outlet/products/footwear/men/puma-rs-x', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/puma-rs-x', 'image', 'webp', 1200, 1200, 'Puma Velocity Nitro 2', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-6-var-0-0', 'prod-6', 'PM-VN2-02-7-ELECTROBLUE', 'Electro Blue', '#0047AB', '7', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-6-var-0-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-6-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-6-var-1-0', 'prod-6', 'PM-VN2-02-8-ELECTROBLUE', 'Electro Blue', '#0047AB', '8', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-6-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-6-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-6-var-2-0', 'prod-6', 'PM-VN2-02-9-ELECTROBLUE', 'Electro Blue', '#0047AB', '9', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-6-var-2-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-6-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-6-var-3-0', 'prod-6', 'PM-VN2-02-10-ELECTROBLUE', 'Electro Blue', '#0047AB', '10', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-6-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-6-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-7',
    'adidas Forum Low Classic',
    'adidas-forum-low-classic',
    'AD-FRM-01',
    'adidas',
    'footwear',
    'cat-footwear',
    'Sneakers',
    'Unisex',
    'More than just a basketball shoe, the Forum debuted in 1984 and captured the world of hardwood and street culture.',
    9999,
    7299,
    27,
    'published',
    true,
    false,
    'adidas Forum Low Classic',
    'More than just a basketball shoe, the Forum debuted in 1984 and captured the world of hardwood and street culture.',
    false,
    NULL,
    '{"shoeType":"Sneakers","upperMaterial":"Coated premium leather","soleDetails":"Vintage textured rubber cupsole","fitInfo":"True to size."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Premium coated leather upper.","Removable cross strap.","Heritage rubber cupsole."}'::text[],
    '2026-11-16T02:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-7', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-7', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-7', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-7', 'inestyle-outlet/products/footwear/men/adidas-ultraboost', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/adidas-ultraboost', 'image', 'webp', 1200, 1200, 'adidas Forum Low Classic', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-7-var-0-0', 'prod-7', 'AD-FRM-01-6-CLOUDWHITEROYAL', 'Cloud White/Royal', '#FFFFFF', '6', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-7-var-0-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-7-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-7-var-1-0', 'prod-7', 'AD-FRM-01-7-CLOUDWHITEROYAL', 'Cloud White/Royal', '#FFFFFF', '7', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-7-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-7-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-7-var-2-0', 'prod-7', 'AD-FRM-01-8-CLOUDWHITEROYAL', 'Cloud White/Royal', '#FFFFFF', '8', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-7-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-7-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-7-var-3-0', 'prod-7', 'AD-FRM-01-9-CLOUDWHITEROYAL', 'Cloud White/Royal', '#FFFFFF', '9', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-7-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-7-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-7-var-4-0', 'prod-7', 'AD-FRM-01-10-CLOUDWHITEROYAL', 'Cloud White/Royal', '#FFFFFF', '10', false, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-7-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-7-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-8',
    'HOKA Bondi 8 Ultra-Cushion',
    'hoka-bondi-8',
    'HK-BND-08',
    'hoka',
    'footwear',
    'cat-footwear',
    'Running Shoes',
    'Women',
    'One of the hardest working shoes in the HOKA lineup, the Bondi takes a bold step forward with softer, lighter foams.',
    19999,
    15499,
    23,
    'published',
    false,
    true,
    'HOKA Bondi 8 Ultra-Cushion',
    'One of the hardest working shoes in the HOKA lineup, the Bondi takes a bold step forward with softer, lighter foams.',
    false,
    NULL,
    '{"shoeType":"Running","upperMaterial":"Engineered mesh with recycled lining","soleDetails":"Super-critical EVA ultra-plush midsole","fitInfo":"Women''s specific last, max cushioning."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Engineered mesh construction.","Memory foam collar.","Durabrasion rubber outsole."}'::text[],
    '2026-11-16T01:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-8', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-8', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-8', 'col-6')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-8', 'inestyle-outlet/products/footwear/women/hoka-clifton-9', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/women/hoka-clifton-9', 'image', 'webp', 1200, 1200, 'HOKA Bondi 8 Ultra-Cushion', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-8-var-0-0', 'prod-8', 'HK-BND-08-5-SUMMERSONG', 'Summer Song', '#7E99B3', '5', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-8-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-8-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-8-var-1-0', 'prod-8', 'HK-BND-08-6-SUMMERSONG', 'Summer Song', '#7E99B3', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-8-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-8-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-8-var-2-0', 'prod-8', 'HK-BND-08-7-SUMMERSONG', 'Summer Song', '#7E99B3', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-8-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-8-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-8-var-3-0', 'prod-8', 'HK-BND-08-8-SUMMERSONG', 'Summer Song', '#7E99B3', '8', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-8-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-8-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-9',
    'Nike Pegasus 40 Road Runner',
    'nike-pegasus-40',
    'NK-PEG-40',
    'nike',
    'footwear',
    'cat-footwear',
    'Running Shoes',
    'Women',
    'A springy ride for every run, the Peg''s familiar, just-for-you feel returns to help you accomplish your fitness goals.',
    11895,
    8495,
    29,
    'published',
    false,
    true,
    'Nike Pegasus 40 Road Runner',
    'A springy ride for every run, the Peg''s familiar, just-for-you feel returns to help you accomplish your fitness goals.',
    false,
    NULL,
    '{"shoeType":"Running","upperMaterial":"Single-layer engineered mesh","soleDetails":"Nike React foam with forefoot & heel Zoom Air","fitInfo":"Standard UK women''s fit."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Nike React technology.","Dual Zoom Air units.","Engineered single-layer mesh."}'::text[],
    '2026-11-16T00:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-9', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-9', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-9', 'col-6')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-9', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-9', 'inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270-top', 'image', 'webp', 1200, 1200, 'Nike Pegasus 40 Road Runner', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-9-var-0-0', 'prod-9', 'NK-PEG-40-5-PUREPLATINUM', 'Pure Platinum', '#DCDCDC', '5', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-9-var-0-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-9-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-9-var-1-0', 'prod-9', 'NK-PEG-40-6-PUREPLATINUM', 'Pure Platinum', '#DCDCDC', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-9-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-9-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-9-var-2-0', 'prod-9', 'NK-PEG-40-7-PUREPLATINUM', 'Pure Platinum', '#DCDCDC', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-9-var-2-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-9-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-9-var-3-0', 'prod-9', 'NK-PEG-40-8-PUREPLATINUM', 'Pure Platinum', '#DCDCDC', '8', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-9-var-3-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-9-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-10',
    'Puma Suede Classic XXI',
    'puma-suede-classic-xxi',
    'PM-SUD-21',
    'puma',
    'footwear',
    'cat-footwear',
    'Casual Shoes',
    'Unisex',
    'The Suede hit the scene in 1968 and has been changing the game ever since. An icon for everyone.',
    6999,
    4999,
    28,
    'published',
    true,
    false,
    'Puma Suede Classic XXI',
    'The Suede hit the scene in 1968 and has been changing the game ever since. An icon for everyone.',
    false,
    NULL,
    '{"shoeType":"Casual","upperMaterial":"100% Genuine suede leather","soleDetails":"Heritage textured rubber outsole","fitInfo":"Standard UK fit."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Full suede upper.","Comfort sockliner.","Rubber midsole and outsole."}'::text[],
    '2026-11-15T23:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-10', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-10', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-10', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-10', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-10', 'inestyle-outlet/products/footwear/men/puma-rs-x', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/puma-rs-x', 'image', 'webp', 1200, 1200, 'Puma Suede Classic XXI', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-10-var-0-0', 'prod-10', 'PM-SUD-21-6-BLACKWHITE', 'Black / White', '#1C1C1C', '6', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-10-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-10-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-10-var-1-0', 'prod-10', 'PM-SUD-21-7-BLACKWHITE', 'Black / White', '#1C1C1C', '7', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-10-var-1-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-10-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-10-var-2-0', 'prod-10', 'PM-SUD-21-8-BLACKWHITE', 'Black / White', '#1C1C1C', '8', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-10-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-10-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-10-var-3-0', 'prod-10', 'PM-SUD-21-9-BLACKWHITE', 'Black / White', '#1C1C1C', '9', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-10-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-10-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-10-var-4-0', 'prod-10', 'PM-SUD-21-10-BLACKWHITE', 'Black / White', '#1C1C1C', '10', false, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-10-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-10-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-11',
    'adidas Stan Smith Heritage',
    'adidas-stan-smith-heritage',
    'AD-SS-GRN',
    'adidas',
    'footwear',
    'cat-footwear',
    'Casual Shoes',
    'Women',
    'Timeless simplicity that has endured for decades. Clean lines, perforated 3-Stripes, and minimal elegance.',
    8999,
    6499,
    28,
    'published',
    true,
    false,
    'adidas Stan Smith Heritage',
    'Timeless simplicity that has endured for decades. Clean lines, perforated 3-Stripes, and minimal elegance.',
    false,
    NULL,
    '{"shoeType":"Casual","upperMaterial":"Recycled smooth synthetic leather","soleDetails":"Low-profile rubber cupsole","fitInfo":"True to size."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Synthetic upper with at least 50% recycled materials.","OrthoLite® sockliner.","Rubber cupsole."}'::text[],
    '2026-11-15T22:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-11', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-11', 'col-5')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-11', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-11', 'inestyle-outlet/products/footwear/men/adidas-ultraboost', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/adidas-ultraboost', 'image', 'webp', 1200, 1200, 'adidas Stan Smith Heritage', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-11-var-0-0', 'prod-11', 'AD-SS-GRN-5-CLOUDWHITEGREEN', 'Cloud White / Green', '#F8F8F8', '5', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-11-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-11-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-11-var-1-0', 'prod-11', 'AD-SS-GRN-6-CLOUDWHITEGREEN', 'Cloud White / Green', '#F8F8F8', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-11-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-11-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-11-var-2-0', 'prod-11', 'AD-SS-GRN-7-CLOUDWHITEGREEN', 'Cloud White / Green', '#F8F8F8', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-11-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-11-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-11-var-3-0', 'prod-11', 'AD-SS-GRN-8-CLOUDWHITEGREEN', 'Cloud White / Green', '#F8F8F8', '8', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-11-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-11-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-12',
    'HOKA Speedgoat 5 Trail Runner',
    'hoka-speedgoat-5',
    'HK-SPG-05',
    'hoka',
    'footwear',
    'cat-footwear',
    'Sports Shoes',
    'Women',
    'A workhorse designed for technical trails, the Speedgoat 5 returns with less weight and more traction than ever.',
    18999,
    14999,
    21,
    'published',
    false,
    true,
    'HOKA Speedgoat 5 Trail Runner',
    'A workhorse designed for technical trails, the Speedgoat 5 returns with less weight and more traction than ever.',
    false,
    NULL,
    '{"shoeType":"Sports","upperMaterial":"Double jacquard recycled yarn mesh","soleDetails":"Vibram® Megagrip 5mm lugged rubber outsole","fitInfo":"Protective trail fit."}'::jsonb,
    '{"clothingCategory":null,"fit":null,"sleeve":null,"fabric":null,"careInstructions":[]}'::jsonb,
    '{"Vibram® Megagrip with Traction Lug.","Late stage Meta-Rocker.","Protective toe rand."}'::text[],
    '2026-11-15T21:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-12', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-12', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-12', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-12', 'inestyle-outlet/products/footwear/women/hoka-clifton-9', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/women/hoka-clifton-9', 'image', 'webp', 1200, 1200, 'HOKA Speedgoat 5 Trail Runner', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-12-var-0-0', 'prod-12', 'HK-SPG-05-5-FESTIVALFUCHSIA', 'Festival Fuchsia', '#C71585', '5', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-12-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-12-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-12-var-1-0', 'prod-12', 'HK-SPG-05-6-FESTIVALFUCHSIA', 'Festival Fuchsia', '#C71585', '6', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-12-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-12-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-12-var-2-0', 'prod-12', 'HK-SPG-05-7-FESTIVALFUCHSIA', 'Festival Fuchsia', '#C71585', '7', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-12-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-12-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-12-var-3-0', 'prod-12', 'HK-SPG-05-8-FESTIVALFUCHSIA', 'Festival Fuchsia', '#C71585', '8', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-12-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-12-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-13',
    'Levi''s 501 Original Fit Denim',
    'levis-501-original-fit',
    'LV-501-DNM',
    'levis',
    'clothing',
    'cat-clothing',
    'Jeans',
    'Men',
    'Since 1873, the original blue jean. Straight leg with signature button fly. The quintessential denim silhouette that defined generations.',
    4999,
    3299,
    34,
    'published',
    true,
    false,
    'Levi''s 501 Original Fit Denim',
    'Since 1873, the original blue jean. Straight leg with signature button fly. The quintessential denim silhouette that defined generations.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Jeans","fit":"Regular Fit","sleeve":"Sleeveless","fabric":"100% Non-stretch Cotton Denim","careInstructions":["Machine wash cold inside out","Do not bleach","Tumble dry medium","Warm iron if needed"]}'::jsonb,
    '{"100% Non-stretch heavyweight cotton denim.","Signature button fly and copper rivets.","Regular fit through thigh with straight leg opening.","Original red tab guarantee."}'::text[],
    '2026-11-15T20:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-13', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-13', 'col-8')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-13', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-13', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-13', 'inestyle-outlet/products/clothing/men/levis-501-original', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/levis-501-original', 'image', 'webp', 1200, 1200, 'Levi''s 501 Original Fit Denim', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-0-0', 'prod-13', 'LV-501-DNM-30-DARKSTONEWASH', 'Dark Stonewash', '#23395B', '30', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-0-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-0-1', 'prod-13', 'LV-501-DNM-30-MEDIUMINDIGO', 'Medium Indigo', '#3B5998', '30', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-0-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-1-0', 'prod-13', 'LV-501-DNM-32-DARKSTONEWASH', 'Dark Stonewash', '#23395B', '32', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-1-1', 'prod-13', 'LV-501-DNM-32-MEDIUMINDIGO', 'Medium Indigo', '#3B5998', '32', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-1-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-2-0', 'prod-13', 'LV-501-DNM-34-DARKSTONEWASH', 'Dark Stonewash', '#23395B', '34', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-2-1', 'prod-13', 'LV-501-DNM-34-MEDIUMINDIGO', 'Medium Indigo', '#3B5998', '34', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-2-1', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-3-0', 'prod-13', 'LV-501-DNM-36-DARKSTONEWASH', 'Dark Stonewash', '#23395B', '36', false, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-13-var-3-1', 'prod-13', 'LV-501-DNM-36-MEDIUMINDIGO', 'Medium Indigo', '#3B5998', '36', false, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-13-var-3-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-13-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-14',
    'DIESEL D-Baron Trucker Jacket',
    'diesel-denim-trucker-jacket',
    'DS-JCK-BLU',
    'diesel',
    'clothing',
    'cat-clothing',
    'Jackets',
    'Men',
    'Premium Italian-designed denim jacket with subtle washed treatments, customized metal shank buttons, and tailored streetwear chest pockets.',
    24999,
    16999,
    32,
    'published',
    false,
    true,
    'DIESEL D-Baron Trucker Jacket',
    'Premium Italian-designed denim jacket with subtle washed treatments, customized metal shank buttons, and tailored streetwear chest pockets.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Jackets","fit":"Regular Fit","sleeve":"Full Sleeve","fabric":"100% Heavyweight Rigid Denim","careInstructions":["Professional dry clean recommended","Gentle cold hand wash","Hang dry in shade"]}'::jsonb,
    '{"Rigid Italian denim with handmade distress wash.","Point collar with branded hardware.","Dual flap chest pockets.","Verified original import."}'::text[],
    '2026-11-15T19:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-14', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-14', 'col-8')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-14', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-14', 'col-10')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-14', 'inestyle-outlet/products/clothing/men/diesel-denim-jacket', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/diesel-denim-jacket', 'image', 'webp', 1200, 1200, 'DIESEL D-Baron Trucker Jacket', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-14-var-0-0', 'prod-14', 'DS-JCK-BLU-S-VINTAGETREATEDINDIGO', 'Vintage Treated Indigo', '#2B3A42', 'S', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-14-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-14-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-14-var-1-0', 'prod-14', 'DS-JCK-BLU-M-VINTAGETREATEDINDIGO', 'Vintage Treated Indigo', '#2B3A42', 'M', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-14-var-1-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-14-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-14-var-2-0', 'prod-14', 'DS-JCK-BLU-L-VINTAGETREATEDINDIGO', 'Vintage Treated Indigo', '#2B3A42', 'L', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-14-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-14-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-14-var-3-0', 'prod-14', 'DS-JCK-BLU-XL-VINTAGETREATEDINDIGO', 'Vintage Treated Indigo', '#2B3A42', 'XL', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-14-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-14-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-15',
    'U.S. Polo Assn. Heritage Pique Polo',
    'us-polo-classic-pique-polo',
    'USP-POLO-WHT',
    'us-polo-assn',
    'clothing',
    'cat-clothing',
    'Polo T-Shirts',
    'Men',
    'Crafted from 100% breathable combed cotton pique with the iconic double horseman embroidered crest on the chest.',
    2499,
    1599,
    36,
    'published',
    true,
    false,
    'U.S. Polo Assn. Heritage Pique Polo',
    'Crafted from 100% breathable combed cotton pique with the iconic double horseman embroidered crest on the chest.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Polo T-Shirts","fit":"Regular Fit","sleeve":"Half Sleeve","fabric":"100% Combed Cotton Pique","careInstructions":["Machine wash warm with like colours","Iron on reverse","Do not dry clean"]}'::jsonb,
    '{"100% Combed cotton pique fabric.","Two-button ribbed placket with mother-of-pearl finish.","Vented tennis tail hem for casual wear.","Authorized brand outlet stock."}'::text[],
    '2026-11-15T18:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-15', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-15', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-15', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-15', 'inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'image', 'webp', 1200, 1200, 'U.S. Polo Assn. Heritage Pique Polo', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-0-0', 'prod-15', 'USP-POLO-WHT-S-OPTICWHITE', 'Optic White', '#FFFFFF', 'S', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-0-1', 'prod-15', 'USP-POLO-WHT-S-NAVYBLUE', 'Navy Blue', '#0B1D3A', 'S', false, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-0-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-1-0', 'prod-15', 'USP-POLO-WHT-M-OPTICWHITE', 'Optic White', '#FFFFFF', 'M', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-1-1', 'prod-15', 'USP-POLO-WHT-M-NAVYBLUE', 'Navy Blue', '#0B1D3A', 'M', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-1-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-2-0', 'prod-15', 'USP-POLO-WHT-L-OPTICWHITE', 'Optic White', '#FFFFFF', 'L', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-2-1', 'prod-15', 'USP-POLO-WHT-L-NAVYBLUE', 'Navy Blue', '#0B1D3A', 'L', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-2-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-3-0', 'prod-15', 'USP-POLO-WHT-XL-OPTICWHITE', 'Optic White', '#FFFFFF', 'XL', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-3-1', 'prod-15', 'USP-POLO-WHT-XL-NAVYBLUE', 'Navy Blue', '#0B1D3A', 'XL', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-3-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-4-0', 'prod-15', 'USP-POLO-WHT-XXL-OPTICWHITE', 'Optic White', '#FFFFFF', 'XXL', false, 8)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-4-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-4-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-15-var-4-1', 'prod-15', 'USP-POLO-WHT-XXL-NAVYBLUE', 'Navy Blue', '#0B1D3A', 'XXL', false, 9)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-15-var-4-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-15-var-4-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-16',
    'Nike Club Fleece Pullover Hoodie',
    'nike-sportswear-club-fleece',
    'NK-CLB-OAT',
    'nike',
    'clothing',
    'cat-clothing',
    'Hoodies',
    'Unisex',
    'A closet staple, the Nike Sportswear Club Fleece Pullover Hoodie combines classic style with the soft comfort of brushed-back fleece.',
    4295,
    2995,
    30,
    'published',
    false,
    true,
    'Nike Club Fleece Pullover Hoodie',
    'A closet staple, the Nike Sportswear Club Fleece Pullover Hoodie combines classic style with the soft comfort of brushed-back fleece.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Hoodies","fit":"Relaxed Fit","sleeve":"Full Sleeve","fabric":"80% Cotton / 20% Polyester Brushed Fleece","careInstructions":["Machine wash cold","Tumble dry low","Cool iron if needed"]}'::jsonb,
    '{"Brushed-back fleece is soft and smooth against the skin.","Hood with drawstring offers adjustable coverage.","Ribbed hem and cuffs lock in warmth.","100% Original Nike distributor stock."}'::text[],
    '2026-11-15T17:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-16', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-16', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-16', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-16', 'col-10')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-16', 'inestyle-outlet/products/clothing/men/nike-club-hoodie', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/nike-club-hoodie', 'image', 'webp', 1200, 1200, 'Nike Club Fleece Pullover Hoodie', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-0-0', 'prod-16', 'NK-CLB-OAT-S-OATMEALHEATHER', 'Oatmeal Heather', '#E0D7C6', 'S', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-0-1', 'prod-16', 'NK-CLB-OAT-S-BLACK', 'Black', '#111111', 'S', false, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-0-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-1-0', 'prod-16', 'NK-CLB-OAT-M-OATMEALHEATHER', 'Oatmeal Heather', '#E0D7C6', 'M', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-1-1', 'prod-16', 'NK-CLB-OAT-M-BLACK', 'Black', '#111111', 'M', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-1-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-2-0', 'prod-16', 'NK-CLB-OAT-L-OATMEALHEATHER', 'Oatmeal Heather', '#E0D7C6', 'L', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-2-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-2-1', 'prod-16', 'NK-CLB-OAT-L-BLACK', 'Black', '#111111', 'L', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-2-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-3-0', 'prod-16', 'NK-CLB-OAT-XL-OATMEALHEATHER', 'Oatmeal Heather', '#E0D7C6', 'XL', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-3-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-16-var-3-1', 'prod-16', 'NK-CLB-OAT-XL-BLACK', 'Black', '#111111', 'XL', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-16-var-3-1', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-16-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-17',
    'Levi''s Type III Trucker Denim Jacket',
    'levis-trucker-jacket-type-3',
    'LV-TRK-TYP3',
    'levis',
    'clothing',
    'cat-clothing',
    'Jackets',
    'Men',
    'The original denim jacket since 1967. A symbol of self-expression for decades and a great starting point for customization.',
    6999,
    4799,
    31,
    'published',
    true,
    false,
    'Levi''s Type III Trucker Denim Jacket',
    'The original denim jacket since 1967. A symbol of self-expression for decades and a great starting point for customization.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Jackets","fit":"Regular Fit","sleeve":"Full Sleeve","fabric":"100% Heavyweight Cotton Denim","careInstructions":["Wash your trucker jacket sparingly","Spot treat when possible"]}'::jsonb,
    '{"Standard regular fit.","Hits at the hip.","Welt side pockets.","Side hem adjusters."}'::text[],
    '2026-11-15T16:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-17', 'col-8')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-17', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-17', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-17', 'col-11')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-17', 'inestyle-outlet/products/clothing/men/diesel-denim-jacket', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/diesel-denim-jacket', 'image', 'webp', 1200, 1200, 'Levi''s Type III Trucker Denim Jacket', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-17-var-0-0', 'prod-17', 'LV-TRK-TYP3-S-COLUSAMEDIUMWASH', 'Colusa Medium Wash', '#3A506B', 'S', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-17-var-0-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-17-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-17-var-1-0', 'prod-17', 'LV-TRK-TYP3-M-COLUSAMEDIUMWASH', 'Colusa Medium Wash', '#3A506B', 'M', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-17-var-1-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-17-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-17-var-2-0', 'prod-17', 'LV-TRK-TYP3-L-COLUSAMEDIUMWASH', 'Colusa Medium Wash', '#3A506B', 'L', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-17-var-2-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-17-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-17-var-3-0', 'prod-17', 'LV-TRK-TYP3-XL-COLUSAMEDIUMWASH', 'Colusa Medium Wash', '#3A506B', 'XL', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-17-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-17-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-18',
    'DIESEL 1995 Straight Distressed Denim',
    'diesel-1995-straight-distressed',
    'DS-95-STR',
    'diesel',
    'clothing',
    'cat-clothing',
    'Jeans',
    'Men',
    'Inspired by mid-nineties streetwear, this straight-leg silhouette features handcrafted whiskering and light abrasions.',
    22999,
    15999,
    30,
    'published',
    false,
    true,
    'DIESEL 1995 Straight Distressed Denim',
    'Inspired by mid-nineties streetwear, this straight-leg silhouette features handcrafted whiskering and light abrasions.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Jeans","fit":"Relaxed Fit","sleeve":"Sleeveless","fabric":"100% Italian Cotton Denim","careInstructions":["Machine wash delicate","Do not tumble dry","Dry flat"]}'::jsonb,
    '{"Button fly.","Non-stretch denim with vintage treatment.","DIESEL Industry coin pocket patch."}'::text[],
    '2026-11-15T15:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-18', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-18', 'col-8')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-18', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-18', 'inestyle-outlet/products/clothing/men/levis-501-original', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/levis-501-original', 'image', 'webp', 1200, 1200, 'DIESEL 1995 Straight Distressed Denim', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-18-var-0-0', 'prod-18', 'DS-95-STR-30-DIRTYVINTAGELIGHTBLUE', 'Dirty Vintage Light Blue', '#8DA9C4', '30', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-18-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-18-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-18-var-1-0', 'prod-18', 'DS-95-STR-32-DIRTYVINTAGELIGHTBLUE', 'Dirty Vintage Light Blue', '#8DA9C4', '32', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-18-var-1-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-18-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-18-var-2-0', 'prod-18', 'DS-95-STR-34-DIRTYVINTAGELIGHTBLUE', 'Dirty Vintage Light Blue', '#8DA9C4', '34', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-18-var-2-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-18-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-18-var-3-0', 'prod-18', 'DS-95-STR-36-DIRTYVINTAGELIGHTBLUE', 'Dirty Vintage Light Blue', '#8DA9C4', '36', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-18-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-18-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-19',
    'U.S. Polo Assn. Classic Oxford Shirt',
    'us-polo-oxford-shirt',
    'USP-OXF-BLU',
    'us-polo-assn',
    'clothing',
    'cat-clothing',
    'Shirts',
    'Men',
    'Timeless cotton Oxford cloth with button-down collar and signature embroidered crest. Crisp, breathable, and versatile.',
    2999,
    1999,
    33,
    'published',
    true,
    false,
    'U.S. Polo Assn. Classic Oxford Shirt',
    'Timeless cotton Oxford cloth with button-down collar and signature embroidered crest. Crisp, breathable, and versatile.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Shirts","fit":"Regular Fit","sleeve":"Full Sleeve","fabric":"100% Combed Oxford Cotton","careInstructions":["Machine wash warm","Warm iron","Do not dry clean"]}'::jsonb,
    '{"100% Cotton Oxford weave.","Button-down collar.","Curved shirttail hem."}'::text[],
    '2026-11-15T14:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-19', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-19', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-19', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-19', 'inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'image', 'webp', 1200, 1200, 'U.S. Polo Assn. Classic Oxford Shirt', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-19-var-0-0', 'prod-19', 'USP-OXF-BLU-S-LIGHTBLUEOXFORD', 'Light Blue Oxford', '#B0C4DE', 'S', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-19-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-19-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-19-var-1-0', 'prod-19', 'USP-OXF-BLU-M-LIGHTBLUEOXFORD', 'Light Blue Oxford', '#B0C4DE', 'M', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-19-var-1-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-19-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-19-var-2-0', 'prod-19', 'USP-OXF-BLU-L-LIGHTBLUEOXFORD', 'Light Blue Oxford', '#B0C4DE', 'L', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-19-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-19-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-19-var-3-0', 'prod-19', 'USP-OXF-BLU-XL-LIGHTBLUEOXFORD', 'Light Blue Oxford', '#B0C4DE', 'XL', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-19-var-3-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-19-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-20',
    'Nike Sportswear Essential Crew Tee',
    'nike-sportswear-essential-tee',
    'NK-ESS-TEE',
    'nike',
    'clothing',
    'cat-clothing',
    'T-Shirts',
    'Women',
    'Soft cotton jersey feels lightweight and comfortable for everyday movement. Relaxed fit with classic embroidered Swoosh.',
    1995,
    1395,
    30,
    'published',
    false,
    true,
    'Nike Sportswear Essential Crew Tee',
    'Soft cotton jersey feels lightweight and comfortable for everyday movement. Relaxed fit with classic embroidered Swoosh.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"T-Shirts","fit":"Relaxed Fit","sleeve":"Half Sleeve","fabric":"100% Soft Cotton Jersey","careInstructions":["Machine wash cold","Tumble dry low"]}'::jsonb,
    '{"100% Lightweight cotton.","Ribbed crew neck.","Standard relaxed fit."}'::text[],
    '2026-11-15T13:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-20', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-20', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-20', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-20', 'inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'image', 'webp', 1200, 1200, 'Nike Sportswear Essential Crew Tee', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-0-0', 'prod-20', 'NK-ESS-TEE-XS-HEATHERGREY', 'Heather Grey', '#CCCCCC', 'XS', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-0-1', 'prod-20', 'NK-ESS-TEE-XS-BLACK', 'Black', '#111111', 'XS', false, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-0-1', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-0-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-1-0', 'prod-20', 'NK-ESS-TEE-S-HEATHERGREY', 'Heather Grey', '#CCCCCC', 'S', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-1-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-1-1', 'prod-20', 'NK-ESS-TEE-S-BLACK', 'Black', '#111111', 'S', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-1-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-1-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-2-0', 'prod-20', 'NK-ESS-TEE-M-HEATHERGREY', 'Heather Grey', '#CCCCCC', 'M', true, 4)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-2-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-2-1', 'prod-20', 'NK-ESS-TEE-M-BLACK', 'Black', '#111111', 'M', true, 5)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-2-1', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-2-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-3-0', 'prod-20', 'NK-ESS-TEE-L-HEATHERGREY', 'Heather Grey', '#CCCCCC', 'L', true, 6)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-20-var-3-1', 'prod-20', 'NK-ESS-TEE-L-BLACK', 'Black', '#111111', 'L', true, 7)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-20-var-3-1', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-20-var-3-1')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-21',
    'Levi''s 724 High-Rise Straight Jeans',
    'levis-724-high-rise-straight',
    'LV-724-W',
    'levis',
    'clothing',
    'cat-clothing',
    'Jeans',
    'Women',
    'High-rise fit with a versatile straight leg designed to sculpt and hold. Levi''s Stellar Stretch recovery ensures shape retention.',
    4799,
    3199,
    33,
    'published',
    false,
    true,
    'Levi''s 724 High-Rise Straight Jeans',
    'High-rise fit with a versatile straight leg designed to sculpt and hold. Levi''s Stellar Stretch recovery ensures shape retention.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Jeans","fit":"Slim Fit","sleeve":"Sleeveless","fabric":"92% Cotton / 6% Polyester / 2% Elastane","careInstructions":["Machine wash cold inside out","Line dry recommended"]}'::jsonb,
    '{"High rise: 10.25 inches.","Slim through hip and thigh.","Stellar Stretch innovation."}'::text[],
    '2026-11-15T12:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-21', 'col-1')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-21', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-21', 'col-8')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-21', 'inestyle-outlet/products/clothing/men/levis-501-original', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/levis-501-original', 'image', 'webp', 1200, 1200, 'Levi''s 724 High-Rise Straight Jeans', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-21-var-0-0', 'prod-21', 'LV-724-W-26-CASTSHADOWDARKWASH', 'Cast Shadow Dark Wash', '#1C2D42', '26', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-21-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-21-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-21-var-1-0', 'prod-21', 'LV-724-W-28-CASTSHADOWDARKWASH', 'Cast Shadow Dark Wash', '#1C2D42', '28', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-21-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-21-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-21-var-2-0', 'prod-21', 'LV-724-W-30-CASTSHADOWDARKWASH', 'Cast Shadow Dark Wash', '#1C2D42', '30', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-21-var-2-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-21-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-21-var-3-0', 'prod-21', 'LV-724-W-32-CASTSHADOWDARKWASH', 'Cast Shadow Dark Wash', '#1C2D42', '32', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-21-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-21-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-22',
    'Puma Classics Archive Relaxed Hoodie',
    'puma-classics-relaxed-hoodie',
    'PM-CLS-HD',
    'puma',
    'clothing',
    'cat-clothing',
    'Hoodies',
    'Unisex',
    'Relaxed streetwear proportions cut from heavyweight French terry with subtle Puma archive tonal chest embroidery.',
    4999,
    3499,
    30,
    'published',
    true,
    false,
    'Puma Classics Archive Relaxed Hoodie',
    'Relaxed streetwear proportions cut from heavyweight French terry with subtle Puma archive tonal chest embroidery.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Hoodies","fit":"Oversized Fit","sleeve":"Full Sleeve","fabric":"100% Heavyweight French Terry Cotton","careInstructions":["Machine wash cold","Warm iron","Do not iron print"]}'::jsonb,
    '{"100% Cotton French terry.","Kangaroo pocket.","Dropped shoulders for easy slouch."}'::text[],
    '2026-11-15T11:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-22', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-22', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-22', 'col-2')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-22', 'inestyle-outlet/products/clothing/men/nike-club-hoodie', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/nike-club-hoodie', 'image', 'webp', 1200, 1200, 'Puma Classics Archive Relaxed Hoodie', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-22-var-0-0', 'prod-22', 'PM-CLS-HD-S-PUMABLACK', 'Puma Black', '#121212', 'S', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-22-var-0-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-22-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-22-var-1-0', 'prod-22', 'PM-CLS-HD-M-PUMABLACK', 'Puma Black', '#121212', 'M', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-22-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-22-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-22-var-2-0', 'prod-22', 'PM-CLS-HD-L-PUMABLACK', 'Puma Black', '#121212', 'L', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-22-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-22-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-22-var-3-0', 'prod-22', 'PM-CLS-HD-XL-PUMABLACK', 'Puma Black', '#121212', 'XL', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-22-var-3-0', 'kapadwanj-flagship', 4, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-22-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-23',
    'Nike Sportswear Club Fleece Track Pants',
    'nike-club-fleece-track-pants',
    'NK-TRK-PNT',
    'nike',
    'clothing',
    'cat-clothing',
    'Track Pants',
    'Men',
    'Combining a classic look with soft fleece, the Nike Club Fleece Joggers give you an elevated, everyday look.',
    3495,
    2495,
    28,
    'published',
    true,
    false,
    'Nike Sportswear Club Fleece Track Pants',
    'Combining a classic look with soft fleece, the Nike Club Fleece Joggers give you an elevated, everyday look.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Track Pants","fit":"Athletic Fit","sleeve":"Sleeveless","fabric":"80% Cotton / 20% Polyester","careInstructions":["Machine wash cold","Tumble dry low"]}'::jsonb,
    '{"Brushed-back fleece fabric feels soft.","Ribbed cuffs give classic jogger look.","Elastic waistband with drawcord."}'::text[],
    '2026-11-15T10:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-23', 'col-3')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-23', 'col-4')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-23', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-23', 'inestyle-outlet/products/clothing/men/nike-club-hoodie', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/nike-club-hoodie', 'image', 'webp', 1200, 1200, 'Nike Sportswear Club Fleece Track Pants', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-23-var-0-0', 'prod-23', 'NK-TRK-PNT-S-CHARCOALHEATHER', 'Charcoal Heather', '#333333', 'S', false, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-23-var-0-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-23-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-23-var-1-0', 'prod-23', 'NK-TRK-PNT-M-CHARCOALHEATHER', 'Charcoal Heather', '#333333', 'M', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-23-var-1-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-23-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-23-var-2-0', 'prod-23', 'NK-TRK-PNT-L-CHARCOALHEATHER', 'Charcoal Heather', '#333333', 'L', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-23-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-23-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-23-var-3-0', 'prod-23', 'NK-TRK-PNT-XL-CHARCOALHEATHER', 'Charcoal Heather', '#333333', 'XL', true, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-23-var-3-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-23-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;

INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    'prod-24',
    'U.S. Polo Assn. Stretch Chino Shorts',
    'us-polo-chino-shorts',
    'USP-SHT-KHK',
    'us-polo-assn',
    'clothing',
    'cat-clothing',
    'Shorts',
    'Men',
    'Versatile cotton stretch chino shorts designed for warm-weather casual comfort with button-through back welt pockets.',
    2799,
    1899,
    32,
    'published',
    false,
    false,
    'U.S. Polo Assn. Stretch Chino Shorts',
    'Versatile cotton stretch chino shorts designed for warm-weather casual comfort with button-through back welt pockets.',
    false,
    NULL,
    '{"shoeType":null,"upperMaterial":null,"soleDetails":null,"fitInfo":null}'::jsonb,
    '{"clothingCategory":"Shorts","fit":"Regular Fit","sleeve":"Sleeveless","fabric":"98% Cotton / 2% Elastane Chino Twill","careInstructions":["Machine wash warm","Tumble dry medium"]}'::jsonb,
    '{"98% Cotton with 2% elastane flex.","9-inch inseam.","Embroidered tonal horseman logo."}'::text[],
    '2026-11-15T09:59:24.035Z'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-24', 'col-7')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-24', 'col-9')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_collections (product_id, collection_id)
VALUES ('prod-24', 'col-10')
ON CONFLICT (product_id, collection_id) DO NOTHING;
INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), 'prod-24', 'inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/clothing/men/us-polo-classic-tee', 'image', 'webp', 1200, 1200, 'U.S. Polo Assn. Stretch Chino Shorts', 0, true);
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-24-var-0-0', 'prod-24', 'USP-SHT-KHK-30-CLASSICKHAKI', 'Classic Khaki', '#C3B091', '30', true, 0)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-24-var-0-0', 'kapadwanj-flagship', 2, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-24-var-0-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-24-var-1-0', 'prod-24', 'USP-SHT-KHK-32-CLASSICKHAKI', 'Classic Khaki', '#C3B091', '32', true, 1)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-24-var-1-0', 'kapadwanj-flagship', 3, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-24-var-1-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-24-var-2-0', 'prod-24', 'USP-SHT-KHK-34-CLASSICKHAKI', 'Classic Khaki', '#C3B091', '34', true, 2)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-24-var-2-0', 'kapadwanj-flagship', 1, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-24-var-2-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;
INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES ('prod-24-var-3-0', 'prod-24', 'USP-SHT-KHK-36-CLASSICKHAKI', 'Classic Khaki', '#C3B091', '36', false, 3)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT 'prod-24-var-3-0', 'kapadwanj-flagship', 0, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = 'prod-24-var-3-0')
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;


-- ------------------------------------------------------------------------------
-- 5. SIZE GUIDES
-- ------------------------------------------------------------------------------
INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    'sg-men-footwear',
    'menFootwear',
    'Men''s Footwear Conversion Chart',
    'footwear',
    'Men',
    'Standard UK, US Men, EU, and foot length (CM) conversion table for athletic and casual footwear.',
    'Stand barefoot on a piece of paper with your heel against a flat wall. Mark the longest point of your toe and measure the distance in centimeters.',
    '[{"key":"uk","label":"UK (Store Default)"},{"key":"usMen","label":"US Men"},{"key":"eu","label":"EU"},{"key":"cm","label":"Foot Length (CM)"}]'::jsonb,
    '[{"id":"mf-1","uk":"6.0","usMen":"6.5","eu":"39.5","cm":"24.5"},{"id":"mf-2","uk":"7.0","usMen":"7.5","eu":"41.0","cm":"25.5"},{"id":"mf-3","uk":"8.0","usMen":"8.5","eu":"42.5","cm":"26.5"},{"id":"mf-4","uk":"9.0","usMen":"9.5","eu":"44.0","cm":"27.5"},{"id":"mf-5","uk":"10.0","usMen":"10.5","eu":"45.0","cm":"28.5"},{"id":"mf-6","uk":"11.0","usMen":"11.5","eu":"46.5","cm":"29.5"},{"id":"mf-7","uk":"12.0","usMen":"12.5","eu":"47.5","cm":"30.5"}]'::jsonb,
    true
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;
INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    'sg-women-footwear',
    'womenFootwear',
    'Women''s Footwear Conversion Chart',
    'footwear',
    'Women',
    'UK, US Women, EU, and CM conversion for women''s lifestyle and running footwear.',
    'If you have wider feet or prefer extra room in running footwear, consider going up by half a UK size.',
    '[{"key":"uk","label":"UK (Store Default)"},{"key":"usWomen","label":"US Women"},{"key":"eu","label":"EU"},{"key":"cm","label":"Foot Length (CM)"}]'::jsonb,
    '[{"id":"wf-1","uk":"3.5","usWomen":"5.5","eu":"36.0","cm":"22.5"},{"id":"wf-2","uk":"4.5","usWomen":"6.5","eu":"37.5","cm":"23.5"},{"id":"wf-3","uk":"5.5","usWomen":"7.5","eu":"38.5","cm":"24.5"},{"id":"wf-4","uk":"6.5","usWomen":"8.5","eu":"40.0","cm":"25.5"},{"id":"wf-5","uk":"7.5","usWomen":"9.5","eu":"41.5","cm":"26.5"},{"id":"wf-6","uk":"8.5","usWomen":"10.5","eu":"42.5","cm":"27.5"}]'::jsonb,
    true
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;
INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    'sg-unisex-footwear',
    'unisexFootwear',
    'Unisex & Heritage Footwear Conversion Chart',
    'footwear',
    'Unisex',
    'Universal cross-gender sizing for iconic sneaker silhouettes.',
    'Unisex shoes are based on standard Men''s UK sizing. Women should subtract 1.5 to 2 from their usual US Women size.',
    '[{"key":"uk","label":"UK (Unisex)"},{"key":"usMen","label":"US Men"},{"key":"usWomen","label":"US Women"},{"key":"eu","label":"EU"},{"key":"cm","label":"CM"}]'::jsonb,
    '[{"id":"uf-1","uk":"5.0","usMen":"5.5","usWomen":"7.0","eu":"38.0","cm":"24.0"},{"id":"uf-2","uk":"6.0","usMen":"6.5","usWomen":"8.0","eu":"39.5","cm":"24.8"},{"id":"uf-3","uk":"7.0","usMen":"7.5","usWomen":"9.0","eu":"41.0","cm":"25.7"},{"id":"uf-4","uk":"8.0","usMen":"8.5","usWomen":"10.0","eu":"42.5","cm":"26.5"},{"id":"uf-5","uk":"9.0","usMen":"9.5","usWomen":"11.0","eu":"44.0","cm":"27.4"},{"id":"uf-6","uk":"10.0","usMen":"10.5","usWomen":"12.0","eu":"45.0","cm":"28.2"},{"id":"uf-7","uk":"11.0","usMen":"11.5","usWomen":"13.0","eu":"46.5","cm":"29.1"}]'::jsonb,
    true
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;
INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    'sg-men-clothing',
    'menClothing',
    'Men''s Apparel Size Guide',
    'clothing',
    'Men',
    'Body measurements in inches for men''s t-shirts, polos, shirts, and outerwear.',
    'Chest: Measure around the fullest part of your chest, keeping tape horizontal. Waist: Measure around natural waistline.',
    '[{"key":"size","label":"Standard Size"},{"key":"chest","label":"Chest (Inches)"},{"key":"waist","label":"Waist (Inches)"},{"key":"collar","label":"Collar (Inches)"},{"key":"length","label":"Length (Inches)"}]'::jsonb,
    '[{"id":"mc-1","size":"S","chest":"36 - 38","waist":"30 - 31","collar":"14.5","length":"27.5"},{"id":"mc-2","size":"M","chest":"39 - 41","waist":"32 - 33","collar":"15.5","length":"28.5"},{"id":"mc-3","size":"L","chest":"42 - 44","waist":"34 - 36","collar":"16.5","length":"29.5"},{"id":"mc-4","size":"XL","chest":"45 - 47","waist":"37 - 39","collar":"17.5","length":"30.5"},{"id":"mc-5","size":"XXL","chest":"48 - 50","waist":"40 - 42","collar":"18.5","length":"31.5"}]'::jsonb,
    true
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;
INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    'sg-women-clothing',
    'womenClothing',
    'Women''s Apparel Size Guide',
    'clothing',
    'Women',
    'Body measurements in inches for women''s tees, tops, and casual apparel.',
    'Bust: Measure fullest part under armpits. Hips: Measure around fullest point of hips/seat.',
    '[{"key":"size","label":"Standard Size"},{"key":"bust","label":"Bust (Inches)"},{"key":"waist","label":"Waist (Inches)"},{"key":"hips","label":"Hips (Inches)"}]'::jsonb,
    '[{"id":"wc-1","size":"XS","bust":"31 - 33","waist":"24 - 25","hips":"34 - 35"},{"id":"wc-2","size":"S","bust":"34 - 35","waist":"26 - 27","hips":"36 - 37"},{"id":"wc-3","size":"M","bust":"36 - 38","waist":"28 - 30","hips":"38 - 40"},{"id":"wc-4","size":"L","bust":"39 - 41","waist":"31 - 33","hips":"41 - 43"},{"id":"wc-5","size":"XL","bust":"42 - 44","waist":"34 - 37","hips":"44 - 46"}]'::jsonb,
    true
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;

-- ------------------------------------------------------------------------------
-- 6. HOMEPAGE SECTIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('heroBanner', 'heroBanner', 'Full-Width Hero Campaign', true, 1)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('brandMarquee', 'brandMarquee', 'Authorized Brand Partners Marquee', true, 2)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('curatedCategories', 'curatedCategories', 'Curated Category Exploration', true, 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('featuredProducts', 'featuredProducts', 'Standout Footwear & Apparel Grid', true, 4)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('newArrivalsBanner', 'newArrivalsBanner', 'New Season Arrivals Banner', true, 5)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('collectionsSpotlight', 'collectionsSpotlight', 'Thematic Collection Spotlight', true, 6)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('storeVisitSection', 'storeVisitSection', 'Kapadwanj Flagship Store Visit', true, 7)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;
INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES ('trustPillars', 'trustPillars', 'Authenticity & Trust Pillars', true, 8)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;

-- ------------------------------------------------------------------------------
-- 7. STORE SETTINGS
-- ------------------------------------------------------------------------------

INSERT INTO public.store_settings (key, value, description, is_public) VALUES
    ('store_info', '{"name": "iNESTYL OUTLET Flagship", "city": "Kapadwanj", "state": "Gujarat", "pincode": "387620", "location": "Station Road, Kapadwanj, Gujarat 387620", "hours": "Mon - Sun: 10:00 AM - 9:00 PM"}'::jsonb, 'Public flagship location and operating hours.', true),
    ('contact_info', '{"phone": "919876543210", "whatsapp": "919876543210", "email": "concierge@inestyle.com"}'::jsonb, 'Store customer concierge contact details.', true),
    ('inventory_policy', '{"lowStockThreshold": 2, "alertEmail": "inventory@inestyle.com"}'::jsonb, 'Internal inventory operational thresholds.', false)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
