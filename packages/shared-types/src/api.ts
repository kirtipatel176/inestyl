import { Product, Brand, CollectionItem, StoreEnquiry } from "./domain";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
}

export interface PaginatedProductsResponse {
  success: boolean;
  count: number;
  totalCount: number;
  products: Product[];
  error?: string;
}

export interface BrandListResponse {
  success: boolean;
  brands: Brand[];
}

export interface CollectionListResponse {
  success: boolean;
  collections: CollectionItem[];
}

export interface EnquirySubmissionRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productId?: string;
  productTitle?: string;
  variantId?: string;
  sizeRequested?: string;
  colourRequested?: string;
  outletPrice?: number;
  channel: "whatsapp" | "form" | "store_visit";
  message?: string;
}

export interface EnquirySubmissionResponse {
  success: boolean;
  enquiry?: StoreEnquiry;
  error?: string;
}
