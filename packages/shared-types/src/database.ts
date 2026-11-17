// PostgreSQL Database Entity Row Interfaces (Supabase Schema)

export interface DbProfile {
  id: string; // UUID
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbRole {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DbPermission {
  id: string;
  module: string;
  description: string | null;
  created_at: string;
}

export interface DbUserRole {
  user_id: string;
  role_id: string;
  assigned_by: string | null;
  assigned_at: string;
}

export interface DbRolePermission {
  role_id: string;
  permission_id: string;
}

export interface DbActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  entity_name: string | null;
  author_name: string;
  previous_state: any;
  new_state: any;
  details: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface DbBrand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  category: "footwear" | "apparel" | "both";
  description: string | null;
  item_count: number;
  is_featured: boolean;
  tile_bg: string | null;
  text_color: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  department: "footwear" | "clothing" | "men" | "women" | "both";
  parent_category_id: string | null;
  description: string | null;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export interface DbCollection {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string;
  badge: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbProduct {
  id: string;
  title: string;
  slug: string;
  sku: string;
  brand_id: string;
  department: "footwear" | "clothing";
  category_id: string | null;
  subcategory: string | null;
  gender: "Men" | "Women" | "Unisex";
  description: string | null;
  regular_price: number;
  sale_price: number;
  discount_percent: number;
  status: "draft" | "published" | "scheduled" | "archived";
  is_featured: boolean;
  is_new: boolean;
  seo_title: string | null;
  seo_description: string | null;
  has_video: boolean;
  video_url: string | null;
  footwear_attributes: Record<string, any>;
  clothing_attributes: Record<string, any>;
  features: string[];
  created_at: string;
  updated_at: string;
  published_at: string | null;
  scheduled_publish_date: string | null;
}

export interface DbProductVariant {
  id: string;
  product_id: string;
  sku: string;
  colour: string;
  colour_hex: string | null;
  size: string;
  price_override: number | null;
  is_active: boolean;
  barcode: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbInventory {
  id: string;
  variant_id: string;
  location_id: string;
  available_quantity: number;
  reserved_quantity: number;
  reorder_threshold: number;
  last_updated_at: string;
}

export interface DbStockMovement {
  id: string;
  inventory_id: string;
  movement_type: "stock_addition" | "stock_correction" | "stock_reduction" | "damaged_stock" | "manual_adjustment";
  quantity_delta: number;
  previous_quantity: number;
  new_quantity: number;
  reason: string;
  reference_id: string | null;
  created_by: string | null;
  created_at: string;
}

export interface DbProductMedia {
  id: string;
  product_id: string;
  variant_id: string | null;
  cloudinary_public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  width: number;
  height: number;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface DbBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  cta_label: string | null;
  position: string;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbCustomer {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbEnquiry {
  id: string;
  customer_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_title: string | null;
  brand_name: string | null;
  outlet_price: number | null;
  size_requested: string | null;
  colour_requested: string | null;
  message: string | null;
  channel: "whatsapp" | "form" | "store_visit";
  status: "New" | "Contacted" | "In Progress" | "In Store Visit" | "Resolved" | "Closed";
  assigned_to: string | null;
  resolution_notes: string | null;
  follow_up_date: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbStoreSetting {
  key: string;
  value: any;
  description: string | null;
  is_public: boolean;
  updated_at: string;
}
