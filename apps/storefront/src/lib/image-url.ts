/**
 * iNESTYL OUTLET — Centralized Cloudinary Image Delivery & Optimization Helper
 * 
 * Safely usable in both Client Components and Server Components.
 * Generates responsive, optimized Cloudinary URLs using dynamic transformations:
 * - f_auto: Automatic next-gen format negotiation (AVIF > WebP > JPEG)
 * - q_auto: Intelligent perceptual visual quality compression
 * - Contextual sizing: Target dimensions matching editorial and mobile breakpoints
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

export const TARGET_DIMENSIONS: Record<string, ImageDimensions> = {
  heroDesktop: { width: 1600, height: 900 },
  heroMobile: { width: 750, height: 1000 },
  productListing: { width: 800, height: 800 },
  productDetail: { width: 1400, height: 1400 },
  categoryBanner: { width: 900, height: 1100 },
  categoryCard: { width: 600, height: 750 },
  collectionBanner: { width: 1200, height: 600 },
  collectionCard: { width: 600, height: 750 },
  thumbnail: { width: 200, height: 200 },
  storeWide: { width: 1200, height: 800 },
  brandLogo: { width: 400, height: 200 },
};

export type ImageVariant =
  | "heroDesktop"
  | "heroMobile"
  | "productListing"
  | "productDetail"
  | "categoryBanner"
  | "categoryCard"
  | "collectionBanner"
  | "collectionCard"
  | "thumbnail"
  | "storeWide"
  | "brandLogo"
  | "original";

export interface ImageUrlOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "pad" | "scale" | "thumb";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  gravity?: "center" | "auto" | "face";
  variant?: ImageVariant;
}

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  "egjn8ayb";

/**
 * Mapping of legacy local image paths to Cloudinary public IDs.
 */
export const LOCAL_TO_CLOUDINARY_PUBLIC_ID: Record<string, string> = {
  // Hero & Homepage
  "/images/hero/hero-lifestyle-composite.jpg": "inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
  "/images/hero/desktop/hero-lifestyle-composite.webp": "inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
  "/images/hero/desktop/hero-lifestyle-composite.avif": "inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
  "/images/hero/hero-mobile.jpg": "inestyle-outlet/homepage/mobile/hero-mobile",
  "/images/hero/mobile/hero-mobile.webp": "inestyle-outlet/homepage/mobile/hero-mobile",
  "/images/hero/mobile/hero-mobile.avif": "inestyle-outlet/homepage/mobile/hero-mobile",
  "/images/hero/hero-sneaker-apparel.jpg": "inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
  "/images/hero/new-arrivals-banner.jpg": "inestyle-outlet/homepage/campaigns/new-arrivals-banner",
  "/images/hero/hero-offer-banner.jpg": "inestyle-outlet/homepage/campaigns/hero-offer-banner",
  "/images/hero/hero-statement-curation.webp": "inestyle-outlet/homepage/campaigns/hero-statement-curation",
  "/images/hero/hero.png": "inestyle-outlet/homepage/desktop/hero-main",

  // Categories
  "/images/categories/category-footwear.jpg": "inestyle-outlet/categories/footwear/category-footwear",
  "/images/categories/category-footwear.webp": "inestyle-outlet/categories/footwear/category-footwear",
  "/images/categories/category-footwear-banner.jpg": "inestyle-outlet/categories/footwear/category-footwear-banner",
  "/images/categories/category-footwear-banner.webp": "inestyle-outlet/categories/footwear/category-footwear-banner",
  "/images/categories/category-footwear-card.jpg": "inestyle-outlet/categories/footwear/category-footwear-card",
  "/images/categories/category-footwear-card.webp": "inestyle-outlet/categories/footwear/category-footwear-card",
  "/images/categories/category-apparel.jpg": "inestyle-outlet/categories/clothing/category-apparel",
  "/images/categories/category-apparel.webp": "inestyle-outlet/categories/clothing/category-apparel",
  "/images/categories/category-apparel-banner.jpg": "inestyle-outlet/categories/clothing/category-apparel-banner",
  "/images/categories/category-apparel-banner.webp": "inestyle-outlet/categories/clothing/category-apparel-banner",
  "/images/categories/category-apparel-card.jpg": "inestyle-outlet/categories/clothing/category-apparel-card",
  "/images/categories/category-apparel-card.webp": "inestyle-outlet/categories/clothing/category-apparel-card",

  // Collections
  "/images/collections/new-arrivals.webp": "inestyle-outlet/collections/new-arrivals",
  "/images/collections/new-arrivals.jpg": "inestyle-outlet/collections/new-arrivals",
  "/images/collections/trending-styles.webp": "inestyle-outlet/collections/trending-styles",
  "/images/collections/trending-styles.jpg": "inestyle-outlet/collections/trending-styles",
  "/images/collections/everyday-essentials.webp": "inestyle-outlet/collections/everyday-essentials",
  "/images/collections/everyday-essentials.jpg": "inestyle-outlet/collections/everyday-essentials",
  "/images/collections/sports-performance.webp": "inestyle-outlet/collections/sports-performance",
  "/images/collections/sports-performance.jpg": "inestyle-outlet/collections/sports-performance",
  "/images/collections/sneakers-collection.webp": "inestyle-outlet/collections/sneakers-collection",
  "/images/collections/sneakers-collection.jpg": "inestyle-outlet/collections/sneakers-collection",
  "/images/collections/weekend-edit.webp": "inestyle-outlet/collections/weekend-edit",
  "/images/collections/weekend-edit.jpg": "inestyle-outlet/collections/weekend-edit",

  // Products - Footwear
  "/images/products/nike-air-max-270.jpg": "inestyle-outlet/products/footwear/men/nike-air-max-270",
  "/images/products/nike-air-max-270.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270",
  "/images/products/footwear/nike-air-max-270-listing.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270",
  "/images/products/footwear/nike-air-max-270-detail.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270",
  "/images/thumbnails/nike-air-max-270-thumb.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270",

  "/images/products/nike-air-max-270-side.jpg": "inestyle-outlet/products/footwear/men/nike-air-max-270-side",
  "/images/products/nike-air-max-270-side.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-side",
  "/images/products/footwear/nike-air-max-270-side-listing.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-side",
  "/images/products/footwear/nike-air-max-270-side-detail.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-side",
  "/images/thumbnails/nike-air-max-270-side-thumb.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-side",

  "/images/products/nike-air-max-270-top.jpg": "inestyle-outlet/products/footwear/men/nike-air-max-270-top",
  "/images/products/nike-air-max-270-top.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-top",
  "/images/products/footwear/nike-air-max-270-top-listing.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-top",
  "/images/products/footwear/nike-air-max-270-top-detail.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-top",
  "/images/thumbnails/nike-air-max-270-top-thumb.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-top",

  "/images/products/nike-air-max-270-sole.jpg": "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",
  "/images/products/nike-air-max-270-sole.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",
  "/images/products/footwear/nike-air-max-270-sole-listing.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",
  "/images/products/footwear/nike-air-max-270-sole-detail.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",
  "/images/thumbnails/nike-air-max-270-sole-thumb.webp": "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",

  "/images/products/puma-rs-x.jpg": "inestyle-outlet/products/footwear/men/puma-rs-x",
  "/images/products/puma-rs-x.webp": "inestyle-outlet/products/footwear/men/puma-rs-x",
  "/images/products/footwear/puma-rs-x-listing.webp": "inestyle-outlet/products/footwear/men/puma-rs-x",
  "/images/products/footwear/puma-rs-x-detail.webp": "inestyle-outlet/products/footwear/men/puma-rs-x",
  "/images/thumbnails/puma-rs-x-thumb.webp": "inestyle-outlet/products/footwear/men/puma-rs-x",

  "/images/products/adidas-ultraboost.jpg": "inestyle-outlet/products/footwear/men/adidas-ultraboost",
  "/images/products/adidas-ultraboost.webp": "inestyle-outlet/products/footwear/men/adidas-ultraboost",
  "/images/products/footwear/adidas-ultraboost-listing.webp": "inestyle-outlet/products/footwear/men/adidas-ultraboost",
  "/images/products/footwear/adidas-ultraboost-detail.webp": "inestyle-outlet/products/footwear/men/adidas-ultraboost",
  "/images/thumbnails/adidas-ultraboost-thumb.webp": "inestyle-outlet/products/footwear/men/adidas-ultraboost",

  "/images/products/hoka-clifton-9.jpg": "inestyle-outlet/products/footwear/women/hoka-clifton-9",
  "/images/products/hoka-clifton-9.webp": "inestyle-outlet/products/footwear/women/hoka-clifton-9",
  "/images/products/footwear/hoka-clifton-9-listing.webp": "inestyle-outlet/products/footwear/women/hoka-clifton-9",
  "/images/products/footwear/hoka-clifton-9-detail.webp": "inestyle-outlet/products/footwear/women/hoka-clifton-9",
  "/images/thumbnails/hoka-clifton-9-thumb.webp": "inestyle-outlet/products/footwear/women/hoka-clifton-9",

  // Products - Clothing
  "/images/products/diesel-denim-jacket.jpg": "inestyle-outlet/products/clothing/men/diesel-denim-jacket",
  "/images/products/diesel-denim-jacket.webp": "inestyle-outlet/products/clothing/men/diesel-denim-jacket",
  "/images/products/clothing/diesel-denim-jacket-listing.webp": "inestyle-outlet/products/clothing/men/diesel-denim-jacket",
  "/images/products/clothing/diesel-denim-jacket-detail.webp": "inestyle-outlet/products/clothing/men/diesel-denim-jacket",
  "/images/thumbnails/diesel-denim-jacket-thumb.webp": "inestyle-outlet/products/clothing/men/diesel-denim-jacket",

  "/images/products/levis-501-original.jpg": "inestyle-outlet/products/clothing/men/levis-501-original",
  "/images/products/levis-501-original.webp": "inestyle-outlet/products/clothing/men/levis-501-original",
  "/images/products/clothing/levis-501-original-listing.webp": "inestyle-outlet/products/clothing/men/levis-501-original",
  "/images/products/clothing/levis-501-original-detail.webp": "inestyle-outlet/products/clothing/men/levis-501-original",
  "/images/thumbnails/levis-501-original-thumb.webp": "inestyle-outlet/products/clothing/men/levis-501-original",

  "/images/products/nike-club-hoodie.jpg": "inestyle-outlet/products/clothing/men/nike-club-hoodie",
  "/images/products/nike-club-hoodie.webp": "inestyle-outlet/products/clothing/men/nike-club-hoodie",
  "/images/products/clothing/nike-club-hoodie-listing.webp": "inestyle-outlet/products/clothing/men/nike-club-hoodie",
  "/images/products/clothing/nike-club-hoodie-detail.webp": "inestyle-outlet/products/clothing/men/nike-club-hoodie",
  "/images/thumbnails/nike-club-hoodie-thumb.webp": "inestyle-outlet/products/clothing/men/nike-club-hoodie",

  "/images/products/us-polo-classic-tee.jpg": "inestyle-outlet/products/clothing/men/us-polo-classic-tee",
  "/images/products/us-polo-classic-tee.webp": "inestyle-outlet/products/clothing/men/us-polo-classic-tee",
  "/images/products/clothing/us-polo-classic-tee-listing.webp": "inestyle-outlet/products/clothing/men/us-polo-classic-tee",
  "/images/products/clothing/us-polo-classic-tee-detail.webp": "inestyle-outlet/products/clothing/men/us-polo-classic-tee",
  "/images/thumbnails/us-polo-classic-tee-thumb.webp": "inestyle-outlet/products/clothing/men/us-polo-classic-tee",

  // Store
  "/images/store/store-interior-1.webp": "inestyle-outlet/store/store-interior-1",
  "/images/store/store-interior-1.jpg": "inestyle-outlet/store/store-interior-1",
  "/images/store/store-interior-2.webp": "inestyle-outlet/store/store-interior-2",
  "/images/store/store-interior-2.jpg": "inestyle-outlet/store/store-interior-2",
  "/images/store/store-interior-3.webp": "inestyle-outlet/store/store-interior-3",
  "/images/store/store-interior-3.jpg": "inestyle-outlet/store/store-interior-3",

  // Brand Partners Logos
  "/brand/partners/nike.svg": "inestyle-outlet/brands/logos/nike",
  "/brand/partners/puma.svg": "inestyle-outlet/brands/logos/puma",
  "/brand/partners/adidas.svg": "inestyle-outlet/brands/logos/adidas",
  "/brand/partners/hoka.svg": "inestyle-outlet/brands/logos/hoka",
  "/brand/partners/levis.svg": "inestyle-outlet/brands/logos/levis",
  "/brand/partners/diesel.svg": "inestyle-outlet/brands/logos/diesel",
  "/brand/partners/us-polo-assn.svg": "inestyle-outlet/brands/logos/us-polo-assn",

  // Branding
  "/brand/logo-primary-stacked.svg": "inestyle-outlet/branding/logo/logo-primary-stacked",
  "/brand/logo-primary-stacked-light.svg": "inestyle-outlet/branding/logo/logo-primary-stacked-light",
  "/brand/logo-primary-stacked-dark.svg": "inestyle-outlet/branding/logo/logo-primary-stacked-dark",
  "/brand/logo-horizontal.svg": "inestyle-outlet/branding/logo/logo-horizontal",
  "/brand/logo-horizontal-light.svg": "inestyle-outlet/branding/logo/logo-horizontal-light",
  "/brand/logo-horizontal-dark.svg": "inestyle-outlet/branding/logo/logo-horizontal-dark",
  "/brand/logo-monogram.svg": "inestyle-outlet/branding/logo/logo-monogram",
  "/brand/logo-monogram-light.svg": "inestyle-outlet/branding/logo/logo-monogram-light",
  "/brand/logo-monogram-dark.svg": "inestyle-outlet/branding/logo/logo-monogram-dark",
};

/**
 * Resolves a public ID or path to a fully qualified, optimized Cloudinary delivery URL.
 * 
 * @param pathOrId Either a Cloudinary public ID, a local path (e.g. /images/products/nike-air-max-270.jpg),
 *                 or an existing Cloudinary URL.
 * @param options  Transformation options including dimensions, crop mode, and format.
 */
export function getCloudinaryUrl(
  pathOrId: string | null | undefined,
  options: ImageUrlOptions = {}
): string {
  if (!pathOrId) {
    return getCloudinaryUrl("inestyle-outlet/homepage/desktop/hero-lifestyle-composite", {
      variant: "heroDesktop",
    });
  }

  // If already an external third-party URL that is NOT Cloudinary, return as is
  if (pathOrId.startsWith("http") && !pathOrId.includes("res.cloudinary.com")) {
    return pathOrId;
  }

  let publicId = pathOrId;

  // If it is a full Cloudinary URL, extract the public ID
  const cloudinaryMatch = pathOrId.match(
    /res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:(?:c_[^,/]+|w_\d+|h_\d+|f_[^,/]+|q_[^,/]+|g_[^,/]+|dpr_[^,/]+|v\d+)[,/]+)*(?:v\d+\/)?(.+)$/
  );
  if (cloudinaryMatch) {
    publicId = cloudinaryMatch[1];
  } else if (LOCAL_TO_CLOUDINARY_PUBLIC_ID[pathOrId]) {
    // Map from known local path to Cloudinary public ID
    publicId = LOCAL_TO_CLOUDINARY_PUBLIC_ID[pathOrId];
  } else if (pathOrId.startsWith("/images/") || pathOrId.startsWith("/brand/")) {
    // Check if filename matches any known asset
    const filename = pathOrId.replace(/^.*[\\\/]/, "").replace(/\.[^.]+$/, "");
    for (const [local, cloud] of Object.entries(LOCAL_TO_CLOUDINARY_PUBLIC_ID)) {
      if (local.includes(filename)) {
        publicId = cloud;
        break;
      }
    }
  }

  // Strip extension if present in publicId (e.g. .jpg, .webp) unless it's an SVG
  const isSvg = publicId.endsWith(".svg");
  if (!isSvg) {
    publicId = publicId.replace(/\.(jpe?g|png|webp|avif)$/i, "");
  }

  // Determine dimensions based on variant if specified
  let width = options.width;
  let height = options.height;
  let crop = options.crop;

  if (options.variant && TARGET_DIMENSIONS[options.variant]) {
    const target = TARGET_DIMENSIONS[options.variant];
    width = width || target.width;
    height = height || target.height;

    // For product catalog and thumbnail assets, enforce non-destructive limit crop
    // to preserve exact silhouettes and aspect ratios without clipping toes, heels, or hems
    if (!crop && (options.variant.startsWith("product") || options.variant === "thumbnail")) {
      crop = "limit";
    }
  }

  // Build transformation query
  const parts: string[] = [];

  // Format and quality
  if (!isSvg) {
    parts.push(`f_${options.format || "auto"}`);
    parts.push(`q_${options.quality || "auto"}`);
  }

  // Crop & Dimensions
  if (crop) {
    parts.push(`c_${crop}`);
  } else if (width && height) {
    parts.push("c_fill");
  } else if (width || height) {
    parts.push("c_limit");
  }

  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (options.gravity) parts.push(`g_${options.gravity}`);

  const transformString = parts.length > 0 ? parts.join(",") + "/" : "";

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}${publicId}`;
}

/**
 * Standard preset helper for product images.
 * Replaces getOptimizedImagePath with Cloudinary CDN transformations.
 */
export function getOptimizedImageUrl(
  src: string | undefined | null,
  variant: "listing" | "detail" | "thumb" | "hero" | "banner" | "card" | "original" = "original"
): string {
  if (!src) {
    return getCloudinaryUrl("inestyle-outlet/homepage/desktop/hero-lifestyle-composite", {
      variant: "heroDesktop",
    });
  }

  switch (variant) {
    case "listing":
      return getCloudinaryUrl(src, { variant: "productListing" });
    case "detail":
      return getCloudinaryUrl(src, { variant: "productDetail" });
    case "thumb":
      return getCloudinaryUrl(src, { variant: "thumbnail" });
    case "hero":
      return getCloudinaryUrl(src, { variant: "heroDesktop" });
    case "banner":
      return getCloudinaryUrl(src, { variant: "categoryBanner" });
    case "card":
      return getCloudinaryUrl(src, { variant: "categoryCard" });
    case "original":
    default:
      return getCloudinaryUrl(src, { format: "auto", quality: "auto" });
  }
}
