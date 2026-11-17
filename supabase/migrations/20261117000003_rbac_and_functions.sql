-- ==============================================================================
-- INESTYLE OUTLET — Production Database Architecture
-- Migration 03: RBAC Configuration, Security Definer Functions & Transactions
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SEED ROLES & PERMISSIONS
-- ------------------------------------------------------------------------------

INSERT INTO public.roles (id, name, description) VALUES
    ('owner', 'Owner', 'Full technological, financial, and organizational authority across INESTYLE OUTLET.'),
    ('administrator', 'Administrator', 'Complete store management, operational access, and administrative privileges.'),
    ('inventory_manager', 'Inventory Manager', 'Stock intake, variant adjustments, inventory levels, and low-stock handling.'),
    ('content_manager', 'Content Manager', 'Product merchandising, media curation, banners, navigation, and size guides.'),
    ('enquiry_manager', 'Enquiry Manager', 'Customer enquiries, WhatsApp concierge, and store visit coordination.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

INSERT INTO public.permissions (id, module, description) VALUES
    ('products.read', 'products', 'View all product listings including drafts and archived items.'),
    ('products.create', 'products', 'Create new footwear and clothing products.'),
    ('products.update', 'products', 'Update product attributes, prices, details, and status.'),
    ('products.delete', 'products', 'Archive or permanently delete products.'),
    ('inventory.read', 'inventory', 'View variant inventory balances and reorder alerts.'),
    ('inventory.update', 'inventory', 'Perform stock adjustments, intake, and correction movements.'),
    ('media.manage', 'media', 'Upload, tag, replace, and delete Cloudinary media assets.'),
    ('enquiries.read', 'enquiries', 'Read customer leads, WhatsApp enquiries, and consultation notes.'),
    ('enquiries.update', 'enquiries', 'Update enquiry status, assign staff, and log follow-ups.'),
    ('settings.manage', 'settings', 'Manage navigation, homepage sections, banners, and store configurations.'),
    ('users.manage', 'users', 'Invite staff, manage administrative roles, and assign permissions.'),
    ('reports.read', 'reports', 'Access analytics, audit trails, and store activity logs.')
ON CONFLICT (id) DO UPDATE SET
    module = EXCLUDED.module,
    description = EXCLUDED.description;

-- Grant permissions to Roles
-- Owner: All permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 'owner', id FROM public.permissions
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Administrator: All permissions except users.manage can be restricted or included
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 'administrator', id FROM public.permissions
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Inventory Manager
INSERT INTO public.role_permissions (role_id, permission_id) VALUES
    ('inventory_manager', 'products.read'),
    ('inventory_manager', 'inventory.read'),
    ('inventory_manager', 'inventory.update'),
    ('inventory_manager', 'reports.read')
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Content Manager
INSERT INTO public.role_permissions (role_id, permission_id) VALUES
    ('content_manager', 'products.read'),
    ('content_manager', 'products.create'),
    ('content_manager', 'products.update'),
    ('content_manager', 'media.manage'),
    ('content_manager', 'settings.manage'),
    ('content_manager', 'reports.read')
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Enquiry Manager
INSERT INTO public.role_permissions (role_id, permission_id) VALUES
    ('enquiry_manager', 'products.read'),
    ('enquiry_manager', 'inventory.read'),
    ('enquiry_manager', 'enquiries.read'),
    ('enquiry_manager', 'enquiries.update'),
    ('enquiry_manager', 'reports.read')
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. SECURITY DEFINER HELPER FUNCTIONS
-- ------------------------------------------------------------------------------

-- Check if current authenticated user has a specific granular permission
CREATE OR REPLACE FUNCTION public.has_permission(requested_permission TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        JOIN public.role_permissions rp ON ur.role_id = rp.role_id
        WHERE ur.user_id = auth.uid()
          AND rp.permission_id = requested_permission
    );
$$;

-- Check if current user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(requested_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        WHERE ur.user_id = auth.uid()
          AND ur.role_id = requested_role
    );
$$;

-- Check if current user is an active admin or owner
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        WHERE ur.user_id = auth.uid()
          AND ur.role_id IN ('owner', 'administrator')
    );
$$;

-- Retrieve array of granted permissions for the authenticated session
CREATE OR REPLACE FUNCTION public.get_my_permissions()
RETURNS TABLE (permission_id TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT DISTINCT rp.permission_id
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    WHERE ur.user_id = auth.uid();
$$;

-- ------------------------------------------------------------------------------
-- 3. ATOMIC TRANSACTIONS: STOCK MOVEMENT & INVENTORY ADJUSTMENT
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.adjust_variant_stock(
    p_variant_id TEXT,
    p_quantity_delta INT,
    p_movement_type TEXT,
    p_reason TEXT,
    p_reference_id TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_inv_id UUID;
    v_prev_qty INT;
    v_new_qty INT;
    v_user_id UUID;
    v_result JSONB;
BEGIN
    -- Verify permission
    IF NOT (public.has_permission('inventory.update') OR public.is_admin()) THEN
        RAISE EXCEPTION 'Access Denied: You lack inventory.update permissions.';
    END IF;

    v_user_id := auth.uid();

    -- Lock inventory row for update
    SELECT id, available_quantity
    INTO v_inv_id, v_prev_qty
    FROM public.inventory
    WHERE variant_id = p_variant_id
    FOR UPDATE;

    IF NOT FOUND THEN
        -- If inventory record doesn't exist yet, initialize it
        IF p_quantity_delta < 0 THEN
            RAISE EXCEPTION 'Cannot reduce stock below zero for uninitialized variant.';
        END IF;

        INSERT INTO public.inventory (variant_id, available_quantity, reserved_quantity, reorder_threshold)
        VALUES (p_variant_id, p_quantity_delta, 0, 2)
        RETURNING id, available_quantity INTO v_inv_id, v_new_qty;

        v_prev_qty := 0;
    ELSE
        v_new_qty := v_prev_qty + p_quantity_delta;
        IF v_new_qty < 0 THEN
            RAISE EXCEPTION 'Stock adjustment cannot result in negative balance. Current: %, Delta: %', v_prev_qty, p_quantity_delta;
        END IF;

        UPDATE public.inventory
        SET available_quantity = v_new_qty,
            last_updated_at = timezone('utc'::text, now())
        WHERE id = v_inv_id;
    END IF;

    -- Record immutable stock movement
    INSERT INTO public.stock_movements (
        inventory_id,
        movement_type,
        quantity_delta,
        previous_quantity,
        new_quantity,
        reason,
        reference_id,
        created_by
    ) VALUES (
        v_inv_id,
        p_movement_type,
        p_quantity_delta,
        v_prev_qty,
        v_new_qty,
        p_reason,
        p_reference_id,
        v_user_id
    );

    v_result := jsonb_build_object(
        'variant_id', p_variant_id,
        'inventory_id', v_inv_id,
        'previous_quantity', v_prev_qty,
        'new_quantity', v_new_qty,
        'quantity_delta', p_quantity_delta,
        'movement_type', p_movement_type,
        'success', true
    );

    RETURN v_result;
END;
$$;

-- ------------------------------------------------------------------------------
-- 4. IMMUTABLE AUDIT LOGGING HELPER
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.log_activity(
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id TEXT,
    p_entity_name TEXT,
    p_details TEXT,
    p_previous_state JSONB DEFAULT NULL,
    p_new_state JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_author_name TEXT;
    v_log_id UUID;
BEGIN
    v_user_id := auth.uid();

    IF v_user_id IS NOT NULL THEN
        SELECT full_name INTO v_author_name
        FROM public.profiles
        WHERE id = v_user_id;
    END IF;

    IF v_author_name IS NULL THEN
        v_author_name := 'System Process';
    END IF;

    INSERT INTO public.activity_logs (
        user_id,
        action,
        entity_type,
        entity_id,
        entity_name,
        author_name,
        previous_state,
        new_state,
        details
    ) VALUES (
        v_user_id,
        p_action,
        p_entity_type,
        p_entity_id,
        p_entity_name,
        v_author_name,
        p_previous_state,
        p_new_state,
        p_details
    ) RETURNING id INTO v_log_id;

    RETURN v_log_id;
END;
$$;
