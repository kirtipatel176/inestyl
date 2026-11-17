-- ==============================================================================
-- INESTYLE OUTLET — Production Database Architecture
-- Migration 04: Comprehensive Row Level Security (RLS) Policies
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENABLE ROW LEVEL SECURITY ACROSS ALL TABLES (DENY-BY-DEFAULT)
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. AUTHENTICATION & ACCESS CONTROL POLICIES
-- ------------------------------------------------------------------------------

-- profiles
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Administrators can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_permission('users.manage') OR public.is_admin());

CREATE POLICY "Administrators can update profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (public.has_permission('users.manage') OR public.is_admin())
WITH CHECK (public.has_permission('users.manage') OR public.is_admin());

-- roles & permissions: authenticated staff can view roles & permissions
CREATE POLICY "Staff can view roles"
ON public.roles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can view permissions"
ON public.permissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can view role permissions"
ON public.role_permissions FOR SELECT
TO authenticated
USING (true);

-- user_roles
CREATE POLICY "Staff can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_permission('users.manage') OR public.is_admin());

CREATE POLICY "Only authorized administrators can assign roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
    (public.has_permission('users.manage') OR public.is_admin())
    -- Prevent self-granting of additional privileges
    AND user_id != auth.uid()
);

CREATE POLICY "Only authorized administrators can modify or remove roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (
    (public.has_permission('users.manage') OR public.is_admin())
    -- Prevent self-demotion or self-modification
    AND user_id != auth.uid()
);

-- activity_logs (Immutable audit trail)
CREATE POLICY "Authorized staff can read audit activity logs"
ON public.activity_logs FOR SELECT
TO authenticated
USING (public.has_permission('reports.read') OR public.is_admin());

-- No direct client insert, update, or delete on activity_logs (strictly through log_activity function)

-- ------------------------------------------------------------------------------
-- 3. PRODUCT CATALOGUE POLICIES
-- ------------------------------------------------------------------------------

-- brands
CREATE POLICY "Public can view all brands"
ON public.brands FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Staff with settings.manage can modify brands"
ON public.brands FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- categories
CREATE POLICY "Public can view all categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Staff with settings.manage can modify categories"
ON public.categories FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- collections
CREATE POLICY "Public can view all collections"
ON public.collections FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Staff with settings.manage can modify collections"
ON public.collections FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- products
CREATE POLICY "Public storefront can view published products"
ON public.products FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Staff with products.read can view all products"
ON public.products FOR SELECT
TO authenticated
USING (public.has_permission('products.read') OR public.is_admin());

CREATE POLICY "Staff with products.create can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('products.create') OR public.is_admin());

CREATE POLICY "Staff with products.update can update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.has_permission('products.update') OR public.is_admin())
WITH CHECK (public.has_permission('products.update') OR public.is_admin());

CREATE POLICY "Staff with products.delete can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.has_permission('products.delete') OR public.is_admin());

-- product_categories
CREATE POLICY "Public can view product category mappings for published products"
ON public.product_categories FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = product_id
          AND (p.status = 'published' OR public.has_permission('products.read') OR public.is_admin())
    )
);

CREATE POLICY "Staff can manage product categories"
ON public.product_categories FOR ALL
TO authenticated
USING (public.has_permission('products.update') OR public.is_admin())
WITH CHECK (public.has_permission('products.update') OR public.is_admin());

-- product_collections
CREATE POLICY "Public can view product collection mappings for published products"
ON public.product_collections FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = product_id
          AND (p.status = 'published' OR public.has_permission('products.read') OR public.is_admin())
    )
);

CREATE POLICY "Staff can manage product collections"
ON public.product_collections FOR ALL
TO authenticated
USING (public.has_permission('products.update') OR public.is_admin())
WITH CHECK (public.has_permission('products.update') OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. PRODUCT VARIANTS POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Public can view active variants of published products"
ON public.product_variants FOR SELECT
TO anon, authenticated
USING (
    is_active = true
    AND EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = product_id AND p.status = 'published'
    )
);

CREATE POLICY "Staff with products.read can view all variants"
ON public.product_variants FOR SELECT
TO authenticated
USING (public.has_permission('products.read') OR public.is_admin());

CREATE POLICY "Staff with products.update can insert variants"
ON public.product_variants FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('products.update') OR public.has_permission('products.create') OR public.is_admin());

CREATE POLICY "Staff with products.update can update variants"
ON public.product_variants FOR UPDATE
TO authenticated
USING (public.has_permission('products.update') OR public.is_admin())
WITH CHECK (public.has_permission('products.update') OR public.is_admin());

CREATE POLICY "Staff with products.delete can delete variants"
ON public.product_variants FOR DELETE
TO authenticated
USING (public.has_permission('products.delete') OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. INVENTORY & STOCK MOVEMENT POLICIES
-- ------------------------------------------------------------------------------

-- inventory
CREATE POLICY "Public storefront can view available stock numbers"
ON public.inventory FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.product_variants pv
        JOIN public.products p ON pv.product_id = p.id
        WHERE pv.id = variant_id AND p.status = 'published'
    )
);

CREATE POLICY "Staff with inventory.read can view all inventory"
ON public.inventory FOR SELECT
TO authenticated
USING (public.has_permission('inventory.read') OR public.is_admin());

CREATE POLICY "Staff with inventory.update can update inventory"
ON public.inventory FOR UPDATE
TO authenticated
USING (public.has_permission('inventory.update') OR public.is_admin())
WITH CHECK (public.has_permission('inventory.update') OR public.is_admin());

-- stock_movements (Strictly internal; public denied)
CREATE POLICY "Staff with inventory.read or reports.read can view stock movements"
ON public.stock_movements FOR SELECT
TO authenticated
USING (public.has_permission('inventory.read') OR public.has_permission('reports.read') OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. MEDIA POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Public can view media of published products"
ON public.product_media FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = product_id
          AND (p.status = 'published' OR public.has_permission('products.read') OR public.is_admin())
    )
);

CREATE POLICY "Staff with media.manage can manage media"
ON public.product_media FOR ALL
TO authenticated
USING (public.has_permission('media.manage') OR public.is_admin())
WITH CHECK (public.has_permission('media.manage') OR public.is_admin());

CREATE POLICY "Public can view active banners"
ON public.banners FOR SELECT
TO anon, authenticated
USING (is_active = true AND (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at >= now()));

CREATE POLICY "Staff with settings.manage can view all banners"
ON public.banners FOR SELECT
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin());

CREATE POLICY "Staff with settings.manage can manage banners"
ON public.banners FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

CREATE POLICY "Public can view enabled homepage sections"
ON public.homepage_sections FOR SELECT
TO anon, authenticated
USING (is_enabled = true);

CREATE POLICY "Staff with settings.manage can manage homepage sections"
ON public.homepage_sections FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. CUSTOMERS & ENQUIRIES POLICIES
-- ------------------------------------------------------------------------------

-- customers: public cannot read; public can insert via lead form; staff can read/manage
CREATE POLICY "Staff with enquiries.read can view customers"
ON public.customers FOR SELECT
TO authenticated
USING (public.has_permission('enquiries.read') OR public.is_admin());

CREATE POLICY "Staff with enquiries.update can update customers"
ON public.customers FOR UPDATE
TO authenticated
USING (public.has_permission('enquiries.update') OR public.is_admin())
WITH CHECK (public.has_permission('enquiries.update') OR public.is_admin());

CREATE POLICY "Public storefront can create customers upon enquiry"
ON public.customers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- enquiries
CREATE POLICY "Public storefront can submit customer enquiries"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Staff with enquiries.read can view enquiries"
ON public.enquiries FOR SELECT
TO authenticated
USING (public.has_permission('enquiries.read') OR public.is_admin());

CREATE POLICY "Staff with enquiries.update can update enquiries"
ON public.enquiries FOR UPDATE
TO authenticated
USING (public.has_permission('enquiries.update') OR public.is_admin())
WITH CHECK (public.has_permission('enquiries.update') OR public.is_admin());

-- enquiry_notes
CREATE POLICY "Staff with enquiries.read can view enquiry notes"
ON public.enquiry_notes FOR SELECT
TO authenticated
USING (public.has_permission('enquiries.read') OR public.is_admin());

CREATE POLICY "Staff with enquiries.update can create enquiry notes"
ON public.enquiry_notes FOR INSERT
TO authenticated
WITH CHECK (public.has_permission('enquiries.update') OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 8. CMS CONFIGURATION & STORE SETTINGS POLICIES
-- ------------------------------------------------------------------------------

-- navigation_items
CREATE POLICY "Public can view visible navigation items"
ON public.navigation_items FOR SELECT
TO anon, authenticated
USING (is_visible = true);

CREATE POLICY "Staff with settings.manage can view all navigation items"
ON public.navigation_items FOR SELECT
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin());

CREATE POLICY "Staff with settings.manage can manage navigation items"
ON public.navigation_items FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- size_guides
CREATE POLICY "Public can view published size guides"
ON public.size_guides FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Staff with settings.manage can manage size guides"
ON public.size_guides FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());

-- store_settings
CREATE POLICY "Public can view public store settings"
ON public.store_settings FOR SELECT
TO anon, authenticated
USING (is_public = true);

CREATE POLICY "Staff with settings.manage can view all store settings"
ON public.store_settings FOR SELECT
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin());

CREATE POLICY "Staff with settings.manage can modify store settings"
ON public.store_settings FOR ALL
TO authenticated
USING (public.has_permission('settings.manage') OR public.is_admin())
WITH CHECK (public.has_permission('settings.manage') OR public.is_admin());
