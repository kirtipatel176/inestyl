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
  subcategory?: string;
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

  // Publishing Workflow & Lifecycle
  status?: "draft" | "published" | "scheduled" | "archived";
  publishedAt?: string;
  scheduledPublishDate?: string;

  // Media Enhancements
  hasVideo?: boolean;
  videoUrl?: string;

  // Change History / Audit
  changeHistory?: ProductChangeHistoryItem[];
}

export interface ProductChangeHistoryItem {
  id: string;
  timestamp: string;
  author: string;
  field: string;
  from?: any;
  to?: any;
  summary: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  badge?: string;
  visible: boolean;
  order: number;
  openInNewTab?: boolean;
}

export interface MegaMenuSection {
  id: string;
  title: string;
  links: NavigationLink[];
  visible: boolean;
  order: number;
  featuredCard?: {
    title: string;
    description: string;
    image: string;
    href: string;
    cta: string;
  };
}

export interface NavigationConfig {
  header: NavigationLink[];
  footwearMegaMenu: MegaMenuSection[];
  clothingMegaMenu: MegaMenuSection[];
  menMegaMenu: MegaMenuSection[];
  womenMegaMenu: MegaMenuSection[];
  collections: NavigationLink[];
  brands: NavigationLink[];
  footer: {
    id: string;
    title: string;
    links: NavigationLink[];
    visible: boolean;
    order: number;
  }[];
}

export interface SizeGuideRow {
  id: string;
  [key: string]: string;
}

export interface SizeGuideTable {
  id: string;
  key: string;
  title: string;
  category: "footwear" | "clothing";
  gender: "Men" | "Women" | "Unisex";
  description: string;
  measuringTip: string;
  headers: { key: string; label: string }[];
  rows: SizeGuideRow[];
  updatedAt: string;
  isPublished: boolean;
}

export interface AnalyticsEvent {
  id: string;
  type:
    | "product_view"
    | "collection_view"
    | "brand_view"
    | "search_query"
    | "product_enquiry"
    | "whatsapp_click";
  targetId?: string;
  targetName?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  type: "enquiry" | "low_stock" | "out_of_stock" | "banner" | "publication" | "media";
  title: string;
  message: string;
  severity: "info" | "warning" | "alert" | "success";
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface NotificationSettings {
  lowStockThreshold: number;
  alertLowStock: boolean;
  alertOutOfStock: boolean;
  alertNewEnquiry: boolean;
  alertScheduledBanner: boolean;
  alertProductPublication: boolean;
  alertFailedUploads: boolean;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entity: "Product" | "Collection" | "Brand" | "Navigation" | "SizeGuide" | "Store" | "Backup" | "Enquiry";
  entityId: string;
  entityName?: string;
  author: string;
  timestamp: string;
  previousValue?: any;
  updatedValue?: any;
  details: string;
}

export interface BackupSnapshotMeta {
  id: string;
  timestamp: string;
  author: string;
  reason: string;
  productsCount: number;
  sizeKb: number;
}

export interface HomepageSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
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
  resolutionNotes?: string;
  resolvedAt?: string;
  updatedAt?: string;
  createdAt: string;
}
