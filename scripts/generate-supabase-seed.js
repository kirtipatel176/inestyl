const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../src/data/db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeJson(obj) {
  if (obj === null || obj === undefined) return "'{}'::jsonb";
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

let sql = `-- ==============================================================================
-- INESTYLE OUTLET — Comprehensive Development Seed Data
-- Auto-generated from existing verified store catalogue
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BRANDS
-- ------------------------------------------------------------------------------
`;

for (const b of db.brands) {
  sql += `INSERT INTO public.brands (id, name, slug, logo_url, category, description, item_count, is_featured, tile_bg, text_color)
VALUES (${escapeSql(b.id)}, ${escapeSql(b.name)}, ${escapeSql(b.slug)}, ${escapeSql(b.logo)}, ${escapeSql(b.category)}, ${escapeSql(b.description)}, ${b.itemCount || 0}, ${Boolean(b.featured)}, ${escapeSql(b.tileBg || '#111111')}, ${escapeSql(b.textColor || '#FFFFFF')})
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = EXCLUDED.logo_url,
  description = EXCLUDED.description;\n\n`;
}

sql += `\n-- ------------------------------------------------------------------------------
-- 2. CATEGORIES
-- ------------------------------------------------------------------------------
`;

const categories = [
  { id: "cat-footwear", name: "Footwear", slug: "footwear", department: "footwear", description: "All athletic, lifestyle and casual footwear." },
  { id: "cat-clothing", name: "Clothing", slug: "clothing", department: "clothing", description: "Apparel, denim, tees and jackets." },
  { id: "cat-sneakers", name: "Sneakers", slug: "sneakers", department: "footwear", parent: "cat-footwear", description: "Lifestyle and street sneakers." },
  { id: "cat-running", name: "Running", slug: "running", department: "footwear", parent: "cat-footwear", description: "Performance running shoes." },
  { id: "cat-casual-shoes", name: "Casual Shoes", slug: "casual-shoes", department: "footwear", parent: "cat-footwear", description: "Comfortable daily footwear." },
  { id: "cat-jeans", name: "Jeans", slug: "jeans", department: "clothing", parent: "cat-clothing", description: "Original denim and trousers." },
  { id: "cat-tshirts", name: "T-Shirts", slug: "t-shirts", department: "clothing", parent: "cat-clothing", description: "Polo and graphic crew tees." },
  { id: "cat-jackets", name: "Jackets", slug: "jackets", department: "clothing", parent: "cat-clothing", description: "Outerwear, track tops and hoodies." },
];

for (const c of categories) {
  sql += `INSERT INTO public.categories (id, name, slug, department, parent_category_id, description)
VALUES (${escapeSql(c.id)}, ${escapeSql(c.name)}, ${escapeSql(c.slug)}, ${escapeSql(c.department)}, ${c.parent ? escapeSql(c.parent) : 'NULL'}, ${escapeSql(c.description)})
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
}

sql += `\n-- ------------------------------------------------------------------------------
-- 3. COLLECTIONS
-- ------------------------------------------------------------------------------
`;

let order = 1;
for (const c of db.collections) {
  sql += `INSERT INTO public.collections (id, slug, title, description, image_url, badge, is_featured, display_order)
VALUES (${escapeSql(c.id)}, ${escapeSql(c.slug)}, ${escapeSql(c.title)}, ${escapeSql(c.description)}, ${escapeSql(c.image)}, ${escapeSql(c.badge || '')}, ${Boolean(c.featured)}, ${order++})
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, image_url = EXCLUDED.image_url;\n`;
}

sql += `\n-- ------------------------------------------------------------------------------
-- 4. PRODUCTS, VARIANTS, MEDIA & INVENTORY
-- ------------------------------------------------------------------------------
`;

for (const p of db.products) {
  const fwAttrs = {
    shoeType: p.shoeType || null,
    upperMaterial: p.upperMaterial || null,
    soleDetails: p.soleDetails || null,
    fitInfo: p.fitInfo || null,
  };

  const clAttrs = {
    clothingCategory: p.clothingCategory || null,
    fit: p.fit || null,
    sleeve: p.sleeve || null,
    fabric: p.fabric || null,
    careInstructions: p.careInstructions || [],
  };

  const catId = p.type === 'footwear' ? 'cat-footwear' : 'cat-clothing';

  sql += `INSERT INTO public.products (
    id, title, slug, sku, brand_id, department, category_id, subcategory, gender,
    description, regular_price, sale_price, discount_percent, status, is_featured, is_new,
    seo_title, seo_description, has_video, video_url, footwear_attributes, clothing_attributes,
    features, published_at
) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.title)},
    ${escapeSql(p.slug)},
    ${escapeSql(p.sku)},
    ${escapeSql(p.brandSlug)},
    ${escapeSql(p.type === 'footwear' ? 'footwear' : 'clothing')},
    ${escapeSql(catId)},
    ${escapeSql(p.subcategory || '')},
    ${escapeSql(p.gender || 'Unisex')},
    ${escapeSql(p.description || '')},
    ${p.mrp || 0},
    ${p.outletPrice || 0},
    ${p.discount || 0},
    ${escapeSql(p.status || 'published')},
    ${Boolean(p.isFeatured)},
    ${Boolean(p.isNew)},
    ${escapeSql(p.metaTitle || p.title)},
    ${escapeSql(p.metaDescription || p.description)},
    ${Boolean(p.hasVideo)},
    ${escapeSql(p.videoUrl || null)},
    ${escapeJson(fwAttrs)},
    ${escapeJson(clAttrs)},
    ${escapeSql(`{${(p.features || []).map(f => `"${f.replace(/"/g, '\\"')}"`).join(',')}}`)}::text[],
    ${p.publishedAt ? escapeSql(p.publishedAt) : 'now()'}
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    regular_price = EXCLUDED.regular_price,
    sale_price = EXCLUDED.sale_price,
    status = EXCLUDED.status;\n`;

  // Product collections
  if (p.collections && Array.isArray(p.collections)) {
    for (const colSlug of p.collections) {
      const col = db.collections.find(c => c.slug === colSlug);
      if (col) {
        sql += `INSERT INTO public.product_collections (product_id, collection_id)
VALUES (${escapeSql(p.id)}, ${escapeSql(col.id)})
ON CONFLICT (product_id, collection_id) DO NOTHING;\n`;
      }
    }
  }

  // Primary media
  if (p.image) {
    const pubId = p.image.replace(/^.*\/image\/upload\/([^/]+\/)?/, "");
    sql += `INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), ${escapeSql(p.id)}, ${escapeSql(pubId)}, ${escapeSql(p.image)}, 'image', 'webp', 1200, 1200, ${escapeSql(p.title)}, 0, true);\n`;
  }

  // Gallery media
  if (p.gallery && Array.isArray(p.gallery)) {
    let gOrder = 1;
    for (const imgUrl of p.gallery) {
      if (imgUrl === p.image) continue;
      const gPubId = imgUrl.replace(/^.*\/image\/upload\/([^/]+\/)?/, "");
      sql += `INSERT INTO public.product_media (id, product_id, cloudinary_public_id, secure_url, resource_type, format, width, height, alt_text, display_order, is_primary)
VALUES (gen_random_uuid(), ${escapeSql(p.id)}, ${escapeSql(gPubId)}, ${escapeSql(imgUrl)}, 'image', 'webp', 1200, 1200, ${escapeSql(p.title + ' detail ' + gOrder)}, ${gOrder}, false);\n`;
      gOrder++;
    }
  }

  // Variants & Inventory
  if (p.variants && Array.isArray(p.variants)) {
    let vOrder = 0;
    for (const v of p.variants) {
      const vSku = `${p.sku}-${v.size}-${v.colour.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;
      const colourObj = (p.colours || []).find(c => c.name === v.colour);
      const hex = colourObj ? colourObj.hex : '#000000';
      const variantId = `${p.id}-${v.id}`;

      sql += `INSERT INTO public.product_variants (id, product_id, sku, colour, colour_hex, size, is_active, sort_order)
VALUES (${escapeSql(variantId)}, ${escapeSql(p.id)}, ${escapeSql(vSku)}, ${escapeSql(v.colour)}, ${escapeSql(hex)}, ${escapeSql(v.size)}, ${Boolean(v.isAvailable)}, ${vOrder++})
ON CONFLICT (sku) DO NOTHING;\n`;

      sql += `INSERT INTO public.inventory (variant_id, location_id, available_quantity, reserved_quantity, reorder_threshold)
SELECT ${escapeSql(variantId)}, 'kapadwanj-flagship', ${v.stockQuantity || 0}, 0, 2
WHERE EXISTS (SELECT 1 FROM public.product_variants WHERE id = ${escapeSql(variantId)})
ON CONFLICT (variant_id) DO UPDATE SET available_quantity = EXCLUDED.available_quantity;\n`;
    }
  }

  sql += "\n";
}

sql += `\n-- ------------------------------------------------------------------------------
-- 5. SIZE GUIDES
-- ------------------------------------------------------------------------------
`;

if (db.sizeGuides) {
  for (const [key, sg] of Object.entries(db.sizeGuides)) {
    sql += `INSERT INTO public.size_guides (id, key, title, category, gender, description, measuring_tip, headers, rows, is_published)
VALUES (
    ${escapeSql(sg.id || 'sg-' + key)},
    ${escapeSql(key)},
    ${escapeSql(sg.title)},
    ${escapeSql(sg.category)},
    ${escapeSql(sg.gender)},
    ${escapeSql(sg.description || '')},
    ${escapeSql(sg.measuringTip || '')},
    ${escapeJson(sg.headers || [])},
    ${escapeJson(sg.rows || [])},
    ${Boolean(sg.isPublished)}
) ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    headers = EXCLUDED.headers,
    rows = EXCLUDED.rows;\n`;
  }
}

sql += `\n-- ------------------------------------------------------------------------------
-- 6. HOMEPAGE SECTIONS
-- ------------------------------------------------------------------------------
`;

if (db.homepageSections) {
  for (const hs of db.homepageSections) {
    sql += `INSERT INTO public.homepage_sections (id, key, label, is_enabled, sort_order)
VALUES (${escapeSql(hs.id)}, ${escapeSql(hs.id)}, ${escapeSql(hs.label)}, ${Boolean(hs.enabled)}, ${hs.order})
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, is_enabled = EXCLUDED.is_enabled, sort_order = EXCLUDED.sort_order;\n`;
  }
}

sql += `\n-- ------------------------------------------------------------------------------
-- 7. STORE SETTINGS
-- ------------------------------------------------------------------------------

INSERT INTO public.store_settings (key, value, description, is_public) VALUES
    ('store_info', '{"name": "iNESTYL OUTLET Flagship", "city": "Kapadwanj", "state": "Gujarat", "pincode": "387620", "location": "Station Road, Kapadwanj, Gujarat 387620", "hours": "Mon - Sun: 10:00 AM - 9:00 PM"}'::jsonb, 'Public flagship location and operating hours.', true),
    ('contact_info', '{"phone": "919876543210", "whatsapp": "919876543210", "email": "concierge@inestyle.com"}'::jsonb, 'Store customer concierge contact details.', true),
    ('inventory_policy', '{"lowStockThreshold": 2, "alertEmail": "inventory@inestyle.com"}'::jsonb, 'Internal inventory operational thresholds.', false)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;\n`;

fs.writeFileSync(path.join(__dirname, "../supabase/seed.sql"), sql);
console.log("Successfully generated supabase/seed.sql! File size: " + sql.length + " bytes.");
