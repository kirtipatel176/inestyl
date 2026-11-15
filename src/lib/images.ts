/**
 * INESTYLE OUTLET — Image Optimization System
 * Provides responsive variant mapping, blur data placeholders, and standard sizes.
 */

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

export const BLUR_PLACEHOLDERS: Record<string, string> = {
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
};

const FOOTWEAR_NAMES = new Set([
  "adidas-ultraboost",
  "hoka-clifton-9",
  "nike-air-max-270",
  "nike-air-max-270-side",
  "nike-air-max-270-sole",
  "nike-air-max-270-top",
  "puma-rs-x",
]);

const CLOTHING_NAMES = new Set([
  "diesel-denim-jacket",
  "levis-501-original",
  "nike-club-hoodie",
  "us-polo-classic-tee",
]);

/**
 * Resolves optimized variant for a given image path.
 * 
 * @param src Original image path (e.g. "/images/products/nike-air-max-270.jpg")
 * @param variant 'listing' (600x750) | 'detail' (1200x1500) | 'thumb' (200x250) | 'original'
 * @returns Optimized image path (e.g. "/images/products/footwear/nike-air-max-270-listing.webp")
 */
export function getOptimizedImagePath(
  src: string | undefined | null,
  variant: "listing" | "detail" | "thumb" | "original" = "original"
): string {
  if (!src) return "/images/hero/hero-lifestyle-composite.webp";

  // If already an optimized variant or external URL or svg, return as is
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.endsWith(".svg") ||
    src.includes("-listing.") ||
    src.includes("-detail.") ||
    src.includes("-thumb.")
  ) {
    return src;
  }

  // Extract base filename without directory and extension
  const match = src.match(/\/([^\/]+)\.(jpe?g|png|webp|avif)$/i);
  if (!match) return src;

  const baseName = match[1];

  if (variant === "thumb") {
    if (FOOTWEAR_NAMES.has(baseName) || CLOTHING_NAMES.has(baseName)) {
      return `/images/thumbnails/${baseName}-thumb.webp`;
    }
  }

  if (FOOTWEAR_NAMES.has(baseName)) {
    if (variant === "listing") {
      return `/images/products/footwear/${baseName}-listing.webp`;
    }
    if (variant === "detail") {
      return `/images/products/footwear/${baseName}-detail.webp`;
    }
  }

  if (CLOTHING_NAMES.has(baseName)) {
    if (variant === "listing") {
      return `/images/products/clothing/${baseName}-listing.webp`;
    }
    if (variant === "detail") {
      return `/images/products/clothing/${baseName}-detail.webp`;
    }
  }

  // Categories
  if (baseName === "category-footwear" || baseName === "category-apparel") {
    if (variant === "listing") {
      return `/images/categories/${baseName}-card.webp`;
    }
    return `/images/categories/${baseName}-banner.webp`;
  }

  // Check if original is in /images/hero/hero.png
  if (src === "/images/hero/hero.png") {
    return "/images/hero/desktop/hero.webp";
  }

  // Return WebP sibling if original was .jpg or .png
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
}
