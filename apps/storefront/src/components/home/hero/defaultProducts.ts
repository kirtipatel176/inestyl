import { OrbitProductItem } from "./types";

/**
 * INESTYLE OUTLET — Five Premium Coordinated Fashion Showcase Assets
 *
 * 1. Premium white low-top lifestyle sneaker
 * 2. Modern white and burnt-orange performance running shoe
 * 3. Warm stone-beige oversized heavyweight hoodie
 * 4. Premium black oversized cotton T-shirt
 * 5. Charcoal-grey lightweight bomber jacket
 *
 * All 5 assets are exported with 100% verified alpha-channel transparency,
 * individual normalized visual scaling, and exact bounding box aspect ratios.
 */
export const DEFAULT_ORBIT_PRODUCTS: OrbitProductItem[] = [
  {
    id: "showcase-1",
    title: "Atelier Low-Top Lifestyle Sneaker",
    slug: "nike-air-max-270",
    brand: "INESTYLE STUDIO",
    department: "footwear",
    subcategory: "Lifestyle Sneakers",
    mrp: 12995,
    outletPrice: 8995,
    discount: 31,
    imageUrl: "/images/products/showcase/product-1-white-sneaker.webp",
    cutoutUrl: "/images/products/showcase/product-1-white-sneaker.webp",
    aspectRatio: 1.46,
    scaleFactor: 1.05,
    isTransparent: true,
  },
  {
    id: "showcase-2",
    title: "Velocity Nitro Running Shoe",
    slug: "puma-rs-x",
    brand: "TECHNICAL RUNNING",
    department: "footwear",
    subcategory: "Performance Runners",
    mrp: 9999,
    outletPrice: 7999,
    discount: 20,
    imageUrl: "/images/products/showcase/product-2-orange-runner.webp",
    cutoutUrl: "/images/products/showcase/product-2-orange-runner.webp",
    aspectRatio: 1.79,
    scaleFactor: 1.08,
    isTransparent: true,
  },
  {
    id: "showcase-3",
    title: "Stone Heavyweight Oversized Hoodie",
    slug: "nike-sportswear-club-fleece",
    brand: "EDITION APPAREL",
    department: "clothing",
    subcategory: "Heavyweight Hoodies",
    mrp: 3995,
    outletPrice: 2795,
    discount: 30,
    imageUrl: "/images/products/showcase/product-3-stone-hoodie.webp",
    cutoutUrl: "/images/products/showcase/product-3-stone-hoodie.webp",
    aspectRatio: 0.85,
    scaleFactor: 0.95,
    isTransparent: true,
  },
  {
    id: "showcase-4",
    title: "Minimal Boxy Cotton T-Shirt",
    slug: "us-polo-classic-pique-polo",
    brand: "ESSENTIALS",
    department: "clothing",
    subcategory: "Oversized Tees",
    mrp: 2499,
    outletPrice: 1599,
    discount: 36,
    imageUrl: "/images/products/showcase/product-4-black-tshirt.webp",
    cutoutUrl: "/images/products/showcase/product-4-black-tshirt.webp",
    aspectRatio: 1.03,
    scaleFactor: 0.95,
    isTransparent: true,
  },
  {
    id: "showcase-5",
    title: "Matte Technical Bomber Jacket",
    slug: "diesel-denim-trucker-jacket",
    brand: "OUTERWEAR",
    department: "clothing",
    subcategory: "Bomber Jackets",
    mrp: 24999,
    outletPrice: 16999,
    discount: 32,
    imageUrl: "/images/products/showcase/product-5-charcoal-bomber.webp",
    cutoutUrl: "/images/products/showcase/product-5-charcoal-bomber.webp",
    aspectRatio: 0.80,
    scaleFactor: 0.94,
    isTransparent: true,
  },
];
