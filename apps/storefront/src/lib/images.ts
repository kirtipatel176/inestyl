/**
 * INESTYLE OUTLET — Image Optimization System
 * Provides responsive variant mapping, blur data placeholders, and Cloudinary CDN URL delivery.
 */

import { getOptimizedImageUrl, getCloudinaryUrl, TARGET_DIMENSIONS } from "./image-url";

export { getOptimizedImageUrl, getCloudinaryUrl, TARGET_DIMENSIONS };

export const IMAGE_SIZES = {
  hero: "100vw",
  heroMobile: "100vw",
  productCard: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  featuredCard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  categoryGrid: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  collectionBanner: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px",
  productGalleryThumb: "80px",
  productDetailMain: "(max-width: 1024px) 100vw, 55vw",
  searchResultThumb: "48px",
} as const;

const DEFAULT_BLUR =
  "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAwABUB8JZwAAutFX0dvCgD+7UhuyWxyH0oY6/ngYOkuZlZbYzZCBHSTTzRub+AAAA==";

export const BLUR_PLACEHOLDERS: Record<string, string> = {
  // Legacy local paths
  "/images/hero/hero-lifestyle-composite.jpg":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAwABUB8JZwAAutFX0dvCgD+7UhuyWxyH0oY6/ngYOkuZlZbYzZCBHSTTzRub+AAAA==",
  "/images/hero/desktop/hero-lifestyle-composite.webp":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAwABUB8JZwAAutFX0dvCgD+7UhuyWxyH0oY6/ngYOkuZlZbYzZCBHSTTzRub+AAAA==",
  "/images/hero/mobile/hero-lifestyle-composite.webp":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAwABUB8JZwAAutFX0dvCgD+7UhuyWxyH0oY6/ngYOkuZlZbYzZCBHSTTzRub+AAAA==",
  "/images/hero/hero-mobile.jpg":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoQABwAPzmGulOvKSWisAgB4CcJZwAAWlzWPHwhQnINTx3YYwAA/t6W4gWJVme9zVVibXkSI/kP2AsxjfFwR1rclXb2IA9h+1z1Lmd/PCKPKsQ4LmXZ+PssZQ6ekffw1BgIW4aEYLu0b85S4a7AMxmAAAA=",
  "/images/hero/mobile/hero-mobile.webp":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoQABwAPzmGulOvKSWisAgB4CcJZwAAWlzWPHwhQnINTx3YYwAA/t6W4gWJVme9zVVibXkSI/kP2AsxjfFwR1rclXb2IA9h+1z1Lmd/PCKPKsQ4LmXZ+PssZQ6ekffw1BgIW4aEYLu0b85S4a7AMxmAAAA=",
  "/images/hero/hero-sneaker-apparel.jpg":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoQAAwABUB8JbACdAEQNnhVuHgAAP65JIHXFkdyZmXJ4WaRwum6XFwmqf/grxZX5Sf398DlYgAAAA==",
  "/images/hero/new-arrivals-banner.jpg":
    "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAwABUB8JYgCdAEV/MwMaYAAzBzKjl+9/vxenECGMIpU9ZU2aIsNazbcyHSDP2EpCGLVGfNqjyqBsz6z+0IaIhjonFsU/gA=",
  "/images/hero/hero-offer-banner.jpg":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoQAAwABUB8JQBOgB6QcLdbYAD+63wm/9h4EVlstbQUh4Tino+XmNKHxmOUMrFqzbBRAAAA",
  "/images/categories/category-footwear.jpg":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoQAAwABUB8JbAAAudg7PRlJQAA/u1W0BiDDQgqds8MsIvgaaQDKAAA",
  "/images/categories/category-apparel.jpg":
    "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAwABUB8JbACdACqQLprGwAA+9boCq+IE7y6BvRlbL8eusd5cmym4dYOBP/uTf+U29Q5vPO1kiRRN/AAAA==",
  "/images/store/store-interior-1.jpg":
    "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQAgCdASoQAAwABUB8JZQC/OEO7xNsIuAAAP6EDLr8b0391r7OlkbxZCloIT9lSqyO9GTrPMGI4tuGYrfxb/ZOZZzvy3PZpiFzYykAAAA=",

  // Cloudinary Delivery URLs & Public IDs
  "inestyle-outlet/homepage/desktop/hero-lifestyle-composite": DEFAULT_BLUR,
  "inestyle-outlet/homepage/mobile/hero-mobile":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoQABwAPzmGulOvKSWisAgB4CcJZwAAWlzWPHwhQnINTx3YYwAA/t6W4gWJVme9zVVibXkSI/kP2AsxjfFwR1rclXb2IA9h+1z1Lmd/PCKPKsQ4LmXZ+PssZQ6ekffw1BgIW4aEYLu0b85S4a7AMxmAAAA=",
  "https://res.cloudinary.com/inestyle-outlet/image/upload/f_auto,q_auto/inestyle-outlet/homepage/desktop/hero-lifestyle-composite":
    DEFAULT_BLUR,
  "https://res.cloudinary.com/inestyle-outlet/image/upload/f_auto,q_auto/inestyle-outlet/homepage/mobile/hero-mobile":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoQABwAPzmGulOvKSWisAgB4CcJZwAAWlzWPHwhQnINTx3YYwAA/t6W4gWJVme9zVVibXkSI/kP2AsxjfFwR1rclXb2IA9h+1z1Lmd/PCKPKsQ4LmXZ+PssZQ6ekffw1BgIW4aEYLu0b85S4a7AMxmAAAA=",
};

export function getBlurDataUrl(src?: string | null): string {
  if (!src) return DEFAULT_BLUR;
  if (BLUR_PLACEHOLDERS[src]) return BLUR_PLACEHOLDERS[src];

  // Match by public ID substring
  if (src.includes("hero-mobile")) {
    return BLUR_PLACEHOLDERS["inestyle-outlet/homepage/mobile/hero-mobile"];
  }
  if (src.includes("hero-lifestyle-composite")) {
    return DEFAULT_BLUR;
  }

  return DEFAULT_BLUR;
}

/**
 * Resolves optimized Cloudinary delivery URL for a given image path.
 * 
 * @param src Original image path or Cloudinary public ID
 * @param variant 'listing' (800x800 square non-destructive) | 'detail' (1400x1400) | 'thumb' (200x200) | 'original'
 * @returns Cloudinary CDN URL with auto-format, auto-quality, and non-destructive dimensional transformations
 */
export function getOptimizedImagePath(
  src: string | undefined | null,
  variant: "listing" | "detail" | "thumb" | "original" = "original"
): string {
  return getOptimizedImageUrl(src, variant);
}

export interface ProductImageFitting {
  scaleClass: string;
  objectFitClass: string;
  paddingClass?: string;
  containerClass?: string;
}

/**
 * Computes optimal responsive visual scaling and object-fitting for product images.
 * Compensates for source image whitespace and aspect ratios to achieve consistent visual scale
 * (~80-90% usable area for footwear, full silhouette for apparel) without clipping.
 */
export function getProductImageFitting(
  imageSrc: string | null | undefined,
  productType?: "footwear" | "clothing" | string
): ProductImageFitting {
  const isFootwear = productType === "footwear" || (!productType && !imageSrc?.includes("/clothing/"));

  if (!imageSrc) {
    return {
      scaleClass: "scale-100",
      objectFitClass: "object-contain",
    };
  }

  // 1. Compensate for verified built-in whitespace based on audit:
  // - Puma RS-X: has 42% horizontal and 14% vertical whitespace in 800x600 source
  if (imageSrc.includes("puma-rs-x")) {
    return {
      scaleClass: "scale-[1.18] sm:scale-[1.20]",
      objectFitClass: "object-contain",
    };
  }

  // - Nike Air Max 270 Top view: has 69.5% vertical whitespace in 800x1000 source
  if (imageSrc.includes("nike-air-max-270-top")) {
    return {
      scaleClass: "scale-[1.22] sm:scale-[1.25]",
      objectFitClass: "object-contain",
    };
  }

  // - Nike Air Max 270 (catalogue lateral angle): has 34% horizontal whitespace in 800x533 source
  if (
    imageSrc.includes("nike-air-max-270") &&
    !imageSrc.includes("-side") &&
    !imageSrc.includes("-sole") &&
    !imageSrc.includes("-top")
  ) {
    return {
      scaleClass: "scale-[1.12] sm:scale-[1.14]",
      objectFitClass: "object-contain",
    };
  }

  // - adidas Ultraboost: has 21% left whitespace in 800x559 source
  if (imageSrc.includes("adidas-ultraboost")) {
    return {
      scaleClass: "scale-[1.05] sm:scale-[1.06]",
      objectFitClass: "object-contain",
    };
  }

  // 2. Standard Footwear:
  // Fills ~85-90% of usable width naturally with object-contain
  if (isFootwear) {
    return {
      scaleClass: "scale-[1.02] sm:scale-[1.04]",
      objectFitClass: "object-contain",
    };
  }

  // 3. Clothing / Apparel:
  // Full garment silhouette preserved (contain), no cutting off sleeves, collars, or hems
  return {
    scaleClass: "scale-100",
    objectFitClass: "object-contain",
  };
}
