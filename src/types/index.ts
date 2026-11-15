// Core Domain Types for iNESTYL OUTLET Discovery Platform

export type ProductType = "footwear" | "clothing" | "apparel";
export type GenderType = "Men" | "Women" | "Unisex";

export type ShoeType =
  | "Sneakers"
  | "Running"
  | "Walking"
  | "Casual"
  | "Sports"
  | "Training"
  | "Lifestyle";

export type ClothingCategory =
  | "T-Shirts"
  | "Polo T-Shirts"
  | "Shirts"
  | "Jeans"
  | "Trousers"
  | "Shorts"
  | "Hoodies"
  | "Sweatshirts"
  | "Jackets"
  | "Sportswear"
  | "Track Pants";

export type ClothingFit =
  | "Slim Fit"
  | "Regular Fit"
  | "Relaxed Fit"
  | "Oversized Fit"
  | "Athletic Fit";

export type SleeveType = "Sleeveless" | "Half Sleeve" | "Full Sleeve";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: "footwear" | "apparel" | "both";
  description: string;
  itemCount: number;
  featured?: boolean;
  tileBg?: string;
  textColor?: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  featured?: boolean;
  itemCount?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  department: "shoes" | "clothing" | "men" | "women" | "both";
  parentCategory?: string;
  description?: string;
  itemCount?: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  colour: string;
  stockQuantity: number;
  isAvailable: boolean;
}

export interface ProductColour {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  brand: string;
  brandSlug: string;
  category: string;
  subcategory: string;
  type: ProductType;
  gender: GenderType;
  collections: string[]; // Slugs of collections this product belongs to
  mrp: number;
  outletPrice: number;
  discount: number; // Percentage
  image: string;
  gallery: string[];
  sizes: string[];
  inStockSizes: string[];
  colours: ProductColour[];
  isNew: boolean;
  isFeatured: boolean;
  description: string;
  features: string[];
  variants: ProductVariant[];

  // Footwear-specific attributes (optional)
  shoeType?: ShoeType;
  upperMaterial?: string;
  soleDetails?: string;
  fitInfo?: string;

  // Clothing-specific attributes (optional)
  clothingCategory?: ClothingCategory;
  fit?: ClothingFit;
  sleeve?: SleeveType;
  fabric?: string;
  careInstructions?: string[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;
}

export interface StoreEnquiry {
  id?: string;
  productId?: string;
  productTitle?: string;
  brandName?: string;
  outletPrice?: number;
  sizeRequested?: string;
  colourRequested?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  message?: string;
  channel: "whatsapp" | "form" | "store_visit";
  status: "New" | "Contacted" | "In Store Visit" | "Resolved";
  createdAt: string;
}
