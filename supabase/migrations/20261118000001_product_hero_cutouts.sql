-- ==============================================================================
-- INESTYLE OUTLET — Separate Hero Product Media System
-- Supports high-resolution transparent WebP/PNG cutouts for 3D showcase
-- without altering or overwriting original catalogue images.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.product_hero_cutouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    hero_cutout_url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    transparency_status TEXT NOT NULL DEFAULT 'transparent_verified' CHECK (transparency_status IN ('transparent_verified', 'processing', 'unsuitable')),
    processing_status TEXT NOT NULL DEFAULT 'completed' CHECK (processing_status IN ('completed', 'pending', 'manual')),
    visual_scale NUMERIC(4, 2) NOT NULL DEFAULT 1.00,
    display_order INT NOT NULL DEFAULT 0,
    aspect_ratio NUMERIC(5, 3) DEFAULT 1.000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_product_hero_cutout UNIQUE (product_id)
);

CREATE INDEX IF NOT EXISTS idx_hero_cutouts_product_id ON public.product_hero_cutouts(product_id);
CREATE INDEX IF NOT EXISTS idx_hero_cutouts_order ON public.product_hero_cutouts(display_order ASC);

-- Row Level Security
ALTER TABLE public.product_hero_cutouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for verified hero cutouts"
ON public.product_hero_cutouts FOR SELECT
USING (transparency_status = 'transparent_verified');

CREATE POLICY "Admin full access for hero cutouts"
ON public.product_hero_cutouts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
