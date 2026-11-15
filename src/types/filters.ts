export type SortOption = "recommended" | "newest" | "price-low" | "price-high";

export type AvailabilityStatus =
  | "In Stock"
  | "Limited Stock"
  | "Out of Stock"
  | "Contact for Availability";

export interface FilterState {
  categories: string[];
  brands: string[];
  genders: string[];
  sizes: string[];
  colours: string[];
  minPrice: number | null;
  maxPrice: number | null;
  availability: string[];
  collections: string[];
  shoeTypes: string[];
  clothingCategories: string[];
  fits: string[];
  sleeves: string[];
  fabrics: string[];
  sortBy: SortOption;
}

export interface ActiveFilterChip {
  id: string;
  type: keyof FilterState;
  categoryLabel: string;
  displayValue: string;
  rawKey: string;
  rawValue?: string | number;
}

export interface ColourOption {
  name: string;
  hex: string;
  count: number;
}

export interface BrandFilterOption {
  name: string;
  slug: string;
  count: number;
}

export interface CategoryFilterOption {
  name: string;
  slug: string;
  count: number;
  department?: "shoes" | "clothing" | "both";
}
