# INESTYLE OUTLET — Production Database Architecture & Migration Report

## Overview
This report documents the design, normalization, referential integrity, and migration of the INESTYLE OUTLET database architecture from local legacy JSON persistence (`db.json` & `admin-auth.json`) to Supabase PostgreSQL.

---

## 1. Schema Modules & Tables

### A. Authentication & Access Control (RBAC)
- **`profiles`**: Tied 1:1 with Supabase `auth.users(id)` via UUID foreign key with cascading delete. Stores administrative staff identity (`email`, `full_name`, `avatar_url`, `phone`, `is_active`, `last_login_at`).
- **`roles`**: Defines 5 administrative roles:
  - `owner`: Full technological, operational, and organizational ownership.
  - `administrator`: Complete store, inventory, catalogue, and operational authority.
  - `inventory_manager`: Stock intake, adjustments, low-stock notifications.
  - `content_manager`: Merchandising, Cloudinary media curation, banners, navigation.
  - `enquiry_manager`: WhatsApp leads, customer concierge, and in-store appointments.
- **`permissions`**: 12 granular access controls (`products.read`, `products.create`, `products.update`, `products.delete`, `inventory.read`, `inventory.update`, `media.manage`, `enquiries.read`, `enquiries.update`, `settings.manage`, `users.manage`, `reports.read`).
- **`user_roles`**: Composite primary key `(user_id, role_id)`. Prevents self-escalation through explicit RLS constraints.
- **`role_permissions`**: Composite primary key `(role_id, permission_id)`.
- **`activity_logs`**: Immutable, append-only administrative audit log. Captures actor (`user_id`, `author_name`), action code, affected entity (`entity_type`, `entity_id`, `entity_name`), state transitions (`previous_state`, `new_state`), and request context (`ip_address`, `user_agent`). Direct client insert/update/delete is blocked; populated via security definer function `log_activity()`.

### B. Product Catalogue
- **`brands`**: 7 multi-brand retail partners (Nike, Puma, adidas, HOKA, Levi's, DIESEL, U.S. Polo Assn.) with normalized slugs and SVG vector assets.
- **`categories`**: Hierarchical category tree supporting footwear vs clothing separation (`department` check constraint).
- **`collections`**: Curated thematic collections (e.g., Trending Styles, Everyday Essentials, Outlet Exclusives).
- **`products`**: Central product entity.
  - Money: `regular_price` (MRP) and `sale_price` (Outlet Price) stored as `NUMERIC(12, 2)` in INR with `CHECK (sale_price >= 0)`.
  - Discount: `discount_percent INT CHECK (discount_percent BETWEEN 0 AND 100)`.
  - Department segregation: `department IN ('footwear', 'clothing')`. Footwear-specific technical attributes (`shoeType`, `upperMaterial`, `soleDetails`, `fitInfo`) and clothing-specific technical attributes (`clothingCategory`, `fit`, `sleeve`, `fabric`, `careInstructions`) stored in validated structured JSONB fields.
  - Lifecycle statuses: `draft`, `published`, `scheduled`, `archived`.
- **`product_categories` & `product_collections`**: Normalized many-to-many junction tables.

### C. Product Variants & Sizing
- **`product_variants`**: Each size/colour combination is an independently identifiable row.
  - Unique constraint on `sku`.
  - Composite unique constraint `(product_id, size, colour)` prevents duplicate entries.
  - Footwear sizes (`6`, `7`, `8`, `9`, `10`, `11`, `12`) and clothing sizes (`S`, `M`, `L`, `XL`, `XXL`, `30`, `32`, `34`, `36`) are strictly separated by product department.

### D. Inventory & Stock Movements
- **`inventory`**: Stocks available balance, reserved balance, and reorder threshold per variant. Extensible for multi-location (`location_id TEXT DEFAULT 'kapadwanj-flagship'`).
- **`stock_movements`**: Immutable movement log for every balance change (`stock_addition`, `stock_correction`, `stock_reduction`, `damaged_stock`, `manual_adjustment`). Enforced through atomic transaction function `adjust_variant_stock()`.

### E. Media Management (Cloudinary)
- **`product_media`**: Cloudinary asset references (`cloudinary_public_id`, `secure_url`, `format`, `width`, `height`, `alt_text`, `display_order`, `is_primary`). No binary blobs in PostgreSQL.
- **`banners`**: Storefront campaign banners with scheduling support (`starts_at`, `ends_at`).
- **`homepage_sections`**: Ordering and toggle states for storefront layout components.

### F. Enquiries & Customer CRM
- **`customers`**: Deduplicated customer records by phone number (`phone TEXT UNIQUE`).
- **`enquiries`**: Store consultations and WhatsApp leads linked to products/variants with status tracking (`New`, `Contacted`, `In Progress`, `In Store Visit`, `Resolved`, `Closed`).
- **`enquiry_notes`**: Internal staff consultation timeline.

### G. Store CMS & Settings
- **`navigation_items`**: Configurable navigation trees (Header, Footwear Mega Menu, Clothing Mega Menu, Men, Women, Footer).
- **`size_guides`**: Footwear and clothing sizing conversion charts with measuring guidance.
- **`store_settings`**: Global configuration key/value pairs (`is_public` flag distinguishes storefront vs internal settings).

---

## 2. Row Level Security (RLS) Policy Summary

| Table | Anonymous Public Access (`anon`) | Authenticated Staff Access (`authenticated`) |
| :--- | :--- | :--- |
| `products` | `SELECT` where `status = 'published'` | `SELECT` all; `INSERT` with `products.create`; `UPDATE` with `products.update`; `DELETE` with `products.delete` |
| `product_variants` | `SELECT` where variant belongs to published product and `is_active = true` | `SELECT` all; mutations require `products.update` |
| `inventory` | `SELECT` available quantity on published products | `SELECT` all with `inventory.read`; `UPDATE` with `inventory.update` |
| `stock_movements` | **DENIED** | `SELECT` with `inventory.read` or `reports.read`; mutations strictly via `adjust_variant_stock()` |
| `brands`, `categories`, `collections` | `SELECT` all | Full management with `settings.manage` |
| `customers` | `INSERT` allowed on enquiry submit; `SELECT` **DENIED** | `SELECT` & `UPDATE` with `enquiries.read` |
| `enquiries` | `INSERT` allowed on lead submit; `SELECT` **DENIED** | `SELECT` with `enquiries.read`; `UPDATE` with `enquiries.update` |
| `activity_logs` | **DENIED** | `SELECT` with `reports.read`; direct mutations blocked |
| `user_roles` | **DENIED** | `SELECT` own roles; mutations require `users.manage` (self-assignment blocked) |

---

## 3. Data Migration Statistics
- **Brands Migrated**: 7
- **Collections Migrated**: 11
- **Products Migrated**: 28
- **Product Variants & Inventory Records**: 168
- **Size Guide Conversion Tables**: 5
- **Homepage Sections**: 8
- **Total Seed File Size**: ~215 KB
- **Preservation Check**: 100% of existing titles, SKUs, prices, Cloudinary URLs, sizes, and colours preserved.
