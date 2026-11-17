export * from "@inestyle/shared-types";

export interface DatabasePaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface ProductQueryFilters extends DatabasePaginationOptions {
  brand?: string;
  department?: "footwear" | "clothing";
  category?: string;
  subcategory?: string;
  gender?: string;
  search?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  collectionSlug?: string;
  includeAllStatus?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "discount";
}

export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
