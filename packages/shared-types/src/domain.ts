// Core Domain Types for iNESTYL OUTLET Discovery Platform & Admin System

export type DepartmentType = "footwear" | "clothing";
export type ProductType = DepartmentType | "apparel";
export type GenderType = "Men" | "Women" | "Unisex";
export type ProductStatus = "draft" | "published" | "scheduled" | "archived";

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
  department: "shoes" | "clothing" | "men" | "women" | "both" | "footwear";
  parentCategory?: string;
  description?: string;
  itemCount?: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  colour: string;
  colourHex?: string;
  sku?: string;
  stockQuantity: number;
  isAvailable: boolean;
  priceOverride?: number;
  barcode?: string;
}

export interface ProductColour {
  name: string;
  hex: string;
}

export interface FootwearAttributes {
  shoeType?: ShoeType | string;
  upperMaterial?: string;
  soleDetails?: string;
  soleMaterial?: string;
  closureType?: string;
  fitInfo?: string;
}

export interface ClothingAttributes {
  clothingCategory?: ClothingCategory | string;
  fit?: ClothingFit | string;
  sleeve?: SleeveType | string;
  fabric?: string;
  pattern?: string;
  careInstructions?: string[];
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
  department?: DepartmentType;
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

  // Footwear-specific attributes
  shoeType?: ShoeType;
  upperMaterial?: string;
  soleDetails?: string;
  fitInfo?: string;
  footwearAttributes?: FootwearAttributes;

  // Clothing-specific attributes
  clothingCategory?: ClothingCategory;
  fit?: ClothingFit;
  sleeve?: SleeveType;
  fabric?: string;
  careInstructions?: string[];
  clothingAttributes?: ClothingAttributes;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Publishing Workflow & Lifecycle
  status?: ProductStatus;
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
  key: "menFootwear" | "womenFootwear" | "unisexFootwear" | "menClothing" | "womenClothing" | string;
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

export interface HomepageSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export type EnquiryChannel = "whatsapp" | "form" | "store_visit";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "In Store Visit" | "Resolved" | "Closed";

export interface CustomerProfile {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreEnquiry {
  id?: string;
  customerId?: string;
  productId?: string;
  variantId?: string;
  productTitle?: string;
  brandName?: string;
  outletPrice?: number;
  sizeRequested?: string;
  colourRequested?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  message?: string;
  channel: EnquiryChannel;
  status: EnquiryStatus;
  assignedTo?: string;
  resolutionNotes?: string;
  followUpDate?: string;
  resolvedAt?: string;
  updatedAt?: string;
  createdAt: string;
}

export interface EnquiryNote {
  id: string;
  enquiryId: string;
  authorId?: string;
  authorName: string;
  note: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  variantId: string;
  locationId: string;
  availableQuantity: number;
  reservedQuantity: number;
  reorderThreshold: number;
  lastUpdatedAt: string;
}

export type StockMovementType =
  | "stock_addition"
  | "stock_correction"
  | "stock_reduction"
  | "damaged_stock"
  | "manual_adjustment";

export interface StockMovement {
  id: string;
  inventoryId: string;
  movementType: StockMovementType;
  quantityDelta: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  referenceId?: string;
  createdBy?: string;
  createdAt: string;
}

export interface ProductMediaItem {
  id: string;
  productId: string;
  variantId?: string;
  cloudinaryPublicId: string;
  secureUrl: string;
  resourceType: "image" | "video" | "raw";
  format: string;
  width: number;
  height: number;
  altText?: string;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  ctaLabel?: string;
  position: string;
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
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
  entity: string;
  entityId: string;
  entityName?: string;
  author: string;
  timestamp: string;
  previousValue?: any;
  updatedValue?: any;
  details: string;
}
