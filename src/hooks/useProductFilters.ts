"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  PRODUCTS_DATA,
  ProductItem,
  COLLECTIONS_DATA,
  BRANDS_DATA,
  getProductAvailability,
} from "@/constants/mock-data";
import {
  FilterState,
  SortOption,
  ActiveFilterChip,
  AvailabilityStatus,
} from "@/types/filters";

export const DEFAULT_MIN_PRICE = 1000;
export const DEFAULT_MAX_PRICE = 25000;

export const AVAILABLE_COLOURS = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Grey", hex: "#777777" },
  { name: "Blue", hex: "#0047AB" },
  { name: "Red", hex: "#8A1C14" },
  { name: "Green", hex: "#2E7D32" },
  { name: "Beige", hex: "#E0D7C6" },
  { name: "Pink", hex: "#C71585" },
];

export const AVAILABLE_CATEGORIES = [
  { label: "Shoes", value: "Shoes" },
  { label: "Clothing", value: "Clothing" },
  { label: "Sneakers", value: "Sneakers" },
  { label: "Running Shoes", value: "Running Shoes" },
  { label: "Casual Shoes", value: "Casual Shoes" },
  { label: "Jeans", value: "Jeans" },
  { label: "Jackets", value: "Jackets" },
  { label: "T-Shirts", value: "T-Shirts" },
  { label: "Polo T-Shirts", value: "Polo T-Shirts" },
  { label: "Hoodies", value: "Hoodies" },
  { label: "Track Pants", value: "Track Pants" },
  { label: "Shorts", value: "Shorts" },
];

export const AVAILABLE_BRANDS = [
  "Nike",
  "adidas",
  "Puma",
  "HOKA",
  "Levi's",
  "DIESEL",
  "U.S. Polo Assn.",
];

export const AVAILABLE_GENDERS = ["Men", "Women", "Unisex"];

export const SHOE_TYPES = [
  "Sneakers",
  "Running",
  "Walking",
  "Casual",
  "Sports",
  "Training",
  "Lifestyle",
];

export const CLOTHING_CATEGORIES = [
  "T-Shirts",
  "Polo T-Shirts",
  "Shirts",
  "Jeans",
  "Trousers",
  "Shorts",
  "Hoodies",
  "Sweatshirts",
  "Jackets",
  "Sportswear",
  "Track Pants",
];

export const CLOTHING_FITS = [
  "Slim Fit",
  "Regular Fit",
  "Relaxed Fit",
  "Oversized Fit",
  "Athletic Fit",
];

export const SLEEVE_TYPES = ["Sleeveless", "Half Sleeve", "Full Sleeve"];

export const FABRICS = [
  "Cotton",
  "Polyester",
  "Denim",
  "Cotton Blend",
  "Fleece",
];

export const FOOTWEAR_SIZES = ["5", "6", "7", "8", "9", "10", "11"];
export const APPAREL_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
];

export const AVAILABILITY_OPTIONS: AvailabilityStatus[] = [
  "In Stock",
  "Limited Stock",
  "Out of Stock",
  "Contact for Availability",
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
];

export interface UseProductFiltersProps {
  initialProducts?: ProductItem[];
  department?: "footwear" | "clothing" | "all";
  defaultTypeFilter?: "footwear" | "clothing" | "apparel";
  defaultGenderFilter?: string[];
  defaultCategoryFilter?: string[];
  lockedGender?: "Men" | "Women";
  lockedCollection?: string;
  lockedBrand?: string;
  lockedCategory?: string;
  lockedShoeType?: string;
  lockedClothingCategory?: string;
  isCollectionPage?: boolean;
}

export function useProductFilters({
  initialProducts = PRODUCTS_DATA,
  department = "all",
  defaultTypeFilter,
  defaultGenderFilter = [],
  defaultCategoryFilter = [],
  lockedGender,
  lockedCollection,
  lockedBrand,
  lockedCategory,
  lockedShoeType,
  lockedClothingCategory,
  isCollectionPage = false,
}: UseProductFiltersProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Resolved department
  const resolvedDept =
    department !== "all"
      ? department
      : defaultTypeFilter === "footwear"
      ? "footwear"
      : defaultTypeFilter === "clothing" || defaultTypeFilter === "apparel"
      ? "clothing"
      : "all";

  // Helper to parse comma-separated query parameters
  const parseList = (val: string | null): string[] => {
    if (!val) return [];
    return val
      .split(",")
      .map((s) => decodeURIComponent(s.trim()))
      .filter(Boolean);
  };

  // Initial Filter State parsed from URL parameters
  const [filters, setFilters] = useState<FilterState>(() => {
    const categoriesParam = parseList(
      searchParams.get("category") || searchParams.get("cat") || searchParams.get("subcategory")
    );
    const brandsParam = parseList(searchParams.get("brand"));
    const gendersParam = parseList(searchParams.get("gender"));
    const sizesParam = parseList(searchParams.get("size"));
    const coloursParam = parseList(searchParams.get("colour") || searchParams.get("color"));
    const availabilityParam = parseList(searchParams.get("availability"));
    const collectionsParam = parseList(searchParams.get("collection"));
    const shoeTypesParam = parseList(searchParams.get("shoeType"));
    const clothingCatParam = parseList(searchParams.get("clothingCategory"));
    const fitsParam = parseList(searchParams.get("fit"));
    const sleevesParam = parseList(searchParams.get("sleeve"));
    const fabricsParam = parseList(searchParams.get("fabric"));
    const minPriceParam = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : null;
    const maxPriceParam = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null;
    const sortParam = (searchParams.get("sort") as SortOption) || "recommended";

    const initialCats = categoriesParam.length > 0 ? categoriesParam : [...defaultCategoryFilter];
    if (lockedCategory && !initialCats.includes(lockedCategory)) {
      initialCats.push(lockedCategory);
    }

    const initialShoeTypes = [...shoeTypesParam];
    if (lockedShoeType && !initialShoeTypes.includes(lockedShoeType)) {
      initialShoeTypes.push(lockedShoeType);
    }

    const initialClothingCats = [...clothingCatParam];
    if (lockedClothingCategory && !initialClothingCats.includes(lockedClothingCategory)) {
      initialClothingCats.push(lockedClothingCategory);
    }

    const initialBrands = [...brandsParam];
    if (lockedBrand && !initialBrands.includes(lockedBrand)) {
      initialBrands.push(lockedBrand);
    }

    const initialGenders = gendersParam.length > 0 ? gendersParam : [...defaultGenderFilter];
    if (lockedGender && !initialGenders.includes(lockedGender)) {
      initialGenders.push(lockedGender);
    }

    const initialCollections = [...collectionsParam];
    if (lockedCollection && !initialCollections.includes(lockedCollection)) {
      initialCollections.push(lockedCollection);
    }

    return {
      categories: initialCats,
      brands: initialBrands,
      genders: initialGenders,
      sizes: sizesParam,
      colours: coloursParam,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
      availability: availabilityParam,
      collections: initialCollections,
      shoeTypes: initialShoeTypes,
      clothingCategories: initialClothingCats,
      fits: fitsParam,
      sleeves: sleevesParam,
      fabrics: fabricsParam,
      sortBy: ["recommended", "newest", "price-low", "price-high"].includes(sortParam)
        ? sortParam
        : "recommended",
    };
  });

  // Sync state to URL without reloading page
  const syncToUrl = useCallback(
    (newFilters: FilterState) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams();

      if (newFilters.categories.length > 0 && !lockedCategory) {
        params.set("category", newFilters.categories.join(","));
      }
      if (newFilters.brands.length > 0 && !lockedBrand) {
        params.set("brand", newFilters.brands.join(","));
      }
      if (newFilters.genders.length > 0 && !lockedGender) {
        params.set("gender", newFilters.genders.join(","));
      }
      if (newFilters.sizes.length > 0) {
        params.set("size", newFilters.sizes.join(","));
      }
      if (newFilters.colours.length > 0) {
        params.set("colour", newFilters.colours.join(","));
      }
      if (newFilters.availability.length > 0) {
        params.set("availability", newFilters.availability.join(","));
      }
      if (newFilters.collections.length > 0 && !lockedCollection) {
        params.set("collection", newFilters.collections.join(","));
      }
      if (newFilters.shoeTypes.length > 0 && !lockedShoeType) {
        params.set("shoeType", newFilters.shoeTypes.join(","));
      }
      if (newFilters.clothingCategories.length > 0 && !lockedClothingCategory) {
        params.set("clothingCategory", newFilters.clothingCategories.join(","));
      }
      if (newFilters.fits.length > 0) {
        params.set("fit", newFilters.fits.join(","));
      }
      if (newFilters.sleeves.length > 0) {
        params.set("sleeve", newFilters.sleeves.join(","));
      }
      if (newFilters.fabrics.length > 0) {
        params.set("fabric", newFilters.fabrics.join(","));
      }
      if (newFilters.minPrice !== null && newFilters.minPrice > DEFAULT_MIN_PRICE) {
        params.set("minPrice", String(newFilters.minPrice));
      }
      if (newFilters.maxPrice !== null && newFilters.maxPrice < DEFAULT_MAX_PRICE) {
        params.set("maxPrice", String(newFilters.maxPrice));
      }
      if (newFilters.sortBy !== "recommended") {
        params.set("sort", newFilters.sortBy);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    },
    [
      pathname,
      lockedCategory,
      lockedBrand,
      lockedGender,
      lockedCollection,
      lockedShoeType,
      lockedClothingCategory,
    ]
  );

  // Core Filtering Function
  const applyFilterLogic = useCallback(
    (items: ProductItem[], criteria: FilterState) => {
      let result = [...items];

      // 1. Department Filter
      if (resolvedDept === "footwear") {
        result = result.filter((p) => p.type === "footwear");
      } else if (resolvedDept === "clothing") {
        result = result.filter((p) => p.type === "clothing" || p.type === "apparel");
      }

      // 2. Locked filters
      if (lockedGender) {
        result = result.filter(
          (p) => p.gender === lockedGender || p.gender === "Unisex"
        );
      }
      if (lockedCollection) {
        result = result.filter((p) => p.collections?.includes(lockedCollection));
      }
      if (lockedBrand) {
        result = result.filter(
          (p) =>
            p.brand.toLowerCase() === lockedBrand.toLowerCase() ||
            p.brandSlug.toLowerCase() === lockedBrand.toLowerCase()
        );
      }

      // 3. Category & Subcategory Matching
      if (criteria.categories.length > 0) {
        result = result.filter((p) => {
          return criteria.categories.some((cat) => {
            const cLower = cat.toLowerCase();
            if (cLower === "shoes" || cLower === "footwear") return p.type === "footwear";
            if (cLower === "clothing" || cLower === "apparel")
              return p.type === "clothing" || p.type === "apparel";
            const sub = (p.subcategory || "").toLowerCase();
            const mainCat = (p.category || "").toLowerCase();
            return (
              sub === cLower ||
              sub.includes(cLower) ||
              cLower.includes(sub) ||
              mainCat === cLower
            );
          });
        });
      }

      // 4. Shoe Types (when footwear)
      if (criteria.shoeTypes.length > 0) {
        result = result.filter((p) => {
          if (!p.shoeType && p.type !== "footwear") return false;
          return criteria.shoeTypes.some((st) => {
            const stLower = st.toLowerCase();
            const pSt = (p.shoeType || p.subcategory || "").toLowerCase();
            return pSt.includes(stLower) || stLower.includes(pSt);
          });
        });
      }

      // 5. Clothing Categories (when clothing)
      if (criteria.clothingCategories.length > 0) {
        result = result.filter((p) => {
          return criteria.clothingCategories.some((cc) => {
            const ccLower = cc.toLowerCase();
            const pCc = (p.clothingCategory || p.subcategory || "").toLowerCase();
            return pCc.includes(ccLower) || ccLower.includes(pCc);
          });
        });
      }

      // 6. Brand Matching
      if (criteria.brands.length > 0 && !lockedBrand) {
        const brandSet = new Set(criteria.brands.map((b) => b.toLowerCase()));
        result = result.filter(
          (p) =>
            brandSet.has(p.brand.toLowerCase()) || brandSet.has(p.brandSlug.toLowerCase())
        );
      }

      // 7. Gender Matching
      if (criteria.genders.length > 0 && !lockedGender) {
        const genderSet = new Set(criteria.genders.map((g) => g.toLowerCase()));
        result = result.filter(
          (p) => genderSet.has(p.gender.toLowerCase()) || p.gender === "Unisex"
        );
      }

      // 8. Size Matching
      if (criteria.sizes.length > 0) {
        result = result.filter((p) =>
          criteria.sizes.some((size) => p.sizes.includes(size))
        );
      }

      // 9. Colour Matching
      if (criteria.colours.length > 0) {
        result = result.filter((p) => {
          return criteria.colours.some((selectedCol) => {
            const scLower = selectedCol.toLowerCase();
            return p.colours.some((c) => {
              const cName = c.name.toLowerCase();
              return (
                cName.includes(scLower) ||
                (scLower === "black" && cName.includes("dark")) ||
                (scLower === "white" && cName.includes("platinum"))
              );
            });
          });
        });
      }

      // 10. Fit Matching (Clothing)
      if (criteria.fits.length > 0) {
        result = result.filter((p) => {
          if (!p.fit) return false;
          return criteria.fits.includes(p.fit);
        });
      }

      // 11. Sleeve Matching (Clothing)
      if (criteria.sleeves.length > 0) {
        result = result.filter((p) => {
          if (!p.sleeve) return false;
          return criteria.sleeves.includes(p.sleeve);
        });
      }

      // 12. Fabric Matching (Clothing)
      if (criteria.fabrics.length > 0) {
        result = result.filter((p) => {
          if (!p.fabric) return false;
          return criteria.fabrics.some((fab) =>
            p.fabric?.toLowerCase().includes(fab.toLowerCase())
          );
        });
      }

      // 13. Collection Matching
      if (criteria.collections.length > 0 && !lockedCollection) {
        result = result.filter((p) =>
          criteria.collections.some((colSlug) => p.collections?.includes(colSlug))
        );
      }

      // 14. Price Range Matching
      if (criteria.minPrice !== null) {
        result = result.filter((p) => p.outletPrice >= criteria.minPrice!);
      }
      if (criteria.maxPrice !== null) {
        result = result.filter((p) => p.outletPrice <= criteria.maxPrice!);
      }

      // 15. Availability Matching
      if (criteria.availability.length > 0) {
        result = result.filter((p) => {
          const status = getProductAvailability(p);
          return criteria.availability.includes(status);
        });
      }

      // 16. Sorting
      if (criteria.sortBy === "price-low") {
        result.sort((a, b) => a.outletPrice - b.outletPrice);
      } else if (criteria.sortBy === "price-high") {
        result.sort((a, b) => b.outletPrice - a.outletPrice);
      } else if (criteria.sortBy === "newest") {
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      } else {
        // Recommended / Featured
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      }

      return result;
    },
    [resolvedDept, lockedGender, lockedCollection, lockedBrand]
  );

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return applyFilterLogic(initialProducts, filters);
  }, [initialProducts, filters, applyFilterLogic]);

  // Preview Count Calculation for Mobile Filter Sheet
  const getPreviewCount = useCallback(
    (draftState: FilterState) => {
      return applyFilterLogic(initialProducts, draftState).length;
    },
    [initialProducts, applyFilterLogic]
  );

  // Dynamically compute available sizes and colours from current product pool
  const availableSizesForProducts = useMemo(() => {
    const sizeSet = new Set<string>();
    const baseList = initialProducts.filter((p) => {
      if (resolvedDept === "footwear" && p.type !== "footwear") return false;
      if (resolvedDept === "clothing" && p.type !== "clothing" && p.type !== "apparel")
        return false;
      if (lockedGender && p.gender !== lockedGender && p.gender !== "Unisex")
        return false;
      return true;
    });
    baseList.forEach((p) => {
      p.sizes.forEach((s) => sizeSet.add(s));
    });
    return Array.from(sizeSet);
  }, [initialProducts, resolvedDept, lockedGender]);

  const availableColoursForProducts = useMemo(() => {
    const colourMap = new Map<string, { name: string; hex: string; count: number }>();
    const baseList = initialProducts.filter((p) => {
      if (resolvedDept === "footwear" && p.type !== "footwear") return false;
      if (resolvedDept === "clothing" && p.type !== "clothing" && p.type !== "apparel")
        return false;
      if (lockedGender && p.gender !== lockedGender && p.gender !== "Unisex")
        return false;
      return true;
    });
    baseList.forEach((p) => {
      p.colours.forEach((c) => {
        const existing = colourMap.get(c.name);
        if (existing) {
          existing.count += 1;
        } else {
          colourMap.set(c.name, { ...c, count: 1 });
        }
      });
    });
    return Array.from(colourMap.values());
  }, [initialProducts, resolvedDept, lockedGender]);

  // Toggle helpers
  const toggleCategory = useCallback(
    (cat: string) => {
      setFilters((prev) => {
        const exists = prev.categories.includes(cat);
        const nextCategories = exists
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat];
        const next = { ...prev, categories: nextCategories };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleShoeType = useCallback(
    (st: string) => {
      setFilters((prev) => {
        const exists = prev.shoeTypes.includes(st);
        const nextShoeTypes = exists
          ? prev.shoeTypes.filter((item) => item !== st)
          : [...prev.shoeTypes, st];
        const next = { ...prev, shoeTypes: nextShoeTypes };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleClothingCategory = useCallback(
    (cc: string) => {
      setFilters((prev) => {
        const exists = prev.clothingCategories.includes(cc);
        const nextClothingCategories = exists
          ? prev.clothingCategories.filter((item) => item !== cc)
          : [...prev.clothingCategories, cc];
        const next = { ...prev, clothingCategories: nextClothingCategories };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      setFilters((prev) => {
        const exists = prev.brands.includes(brand);
        const nextBrands = exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand];
        const next = { ...prev, brands: nextBrands };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleGender = useCallback(
    (gender: string) => {
      setFilters((prev) => {
        const exists = prev.genders.includes(gender);
        const nextGenders = exists
          ? prev.genders.filter((g) => g !== gender)
          : [...prev.genders, gender];
        const next = { ...prev, genders: nextGenders };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleSize = useCallback(
    (size: string) => {
      setFilters((prev) => {
        const exists = prev.sizes.includes(size);
        const nextSizes = exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size];
        const next = { ...prev, sizes: nextSizes };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleColour = useCallback(
    (colour: string) => {
      setFilters((prev) => {
        const exists = prev.colours.includes(colour);
        const nextColours = exists
          ? prev.colours.filter((c) => c !== colour)
          : [...prev.colours, colour];
        const next = { ...prev, colours: nextColours };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleFit = useCallback(
    (fit: string) => {
      setFilters((prev) => {
        const exists = prev.fits.includes(fit);
        const nextFits = exists
          ? prev.fits.filter((f) => f !== fit)
          : [...prev.fits, fit];
        const next = { ...prev, fits: nextFits };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleSleeve = useCallback(
    (sleeve: string) => {
      setFilters((prev) => {
        const exists = prev.sleeves.includes(sleeve);
        const nextSleeves = exists
          ? prev.sleeves.filter((s) => s !== sleeve)
          : [...prev.sleeves, sleeve];
        const next = { ...prev, sleeves: nextSleeves };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleFabric = useCallback(
    (fabric: string) => {
      setFilters((prev) => {
        const exists = prev.fabrics.includes(fabric);
        const nextFabrics = exists
          ? prev.fabrics.filter((f) => f !== fabric)
          : [...prev.fabrics, fabric];
        const next = { ...prev, fabrics: nextFabrics };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleCollection = useCallback(
    (col: string) => {
      setFilters((prev) => {
        const exists = prev.collections.includes(col);
        const nextCollections = exists
          ? prev.collections.filter((c) => c !== col)
          : [...prev.collections, col];
        const next = { ...prev, collections: nextCollections };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const toggleAvailability = useCallback(
    (status: string) => {
      setFilters((prev) => {
        const exists = prev.availability.includes(status);
        const nextAvailability = exists
          ? prev.availability.filter((a) => a !== status)
          : [...prev.availability, status];
        const next = { ...prev, availability: nextAvailability };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setFilters((prev) => {
        const next = { ...prev, minPrice: min, maxPrice: max };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const setSortOption = useCallback(
    (sort: SortOption) => {
      setFilters((prev) => {
        const next = { ...prev, sortBy: sort };
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  const applyCompleteState = useCallback(
    (newState: FilterState) => {
      setFilters(newState);
      syncToUrl(newState);
    },
    [syncToUrl]
  );

  const clearAllFilters = useCallback(() => {
    const reset: FilterState = {
      categories: lockedCategory ? [lockedCategory] : defaultCategoryFilter,
      brands: lockedBrand ? [lockedBrand] : [],
      genders: lockedGender ? [lockedGender] : defaultGenderFilter,
      sizes: [],
      colours: [],
      minPrice: null,
      maxPrice: null,
      availability: [],
      collections: lockedCollection ? [lockedCollection] : [],
      shoeTypes: lockedShoeType ? [lockedShoeType] : [],
      clothingCategories: lockedClothingCategory ? [lockedClothingCategory] : [],
      fits: [],
      sleeves: [],
      fabrics: [],
      sortBy: "recommended",
    };
    setFilters(reset);
    syncToUrl(reset);
  }, [
    lockedCategory,
    lockedBrand,
    lockedGender,
    lockedCollection,
    lockedShoeType,
    lockedClothingCategory,
    defaultCategoryFilter,
    defaultGenderFilter,
    syncToUrl,
  ]);

  // Remove individual active filter chip
  const removeChip = useCallback(
    (chip: ActiveFilterChip) => {
      setFilters((prev) => {
        const next = { ...prev };
        if (chip.type === "categories") {
          next.categories = next.categories.filter((c) => c !== chip.rawKey);
        } else if (chip.type === "shoeTypes") {
          next.shoeTypes = next.shoeTypes.filter((st) => st !== chip.rawKey);
        } else if (chip.type === "clothingCategories") {
          next.clothingCategories = next.clothingCategories.filter(
            (cc) => cc !== chip.rawKey
          );
        } else if (chip.type === "brands") {
          next.brands = next.brands.filter((b) => b !== chip.rawKey);
        } else if (chip.type === "genders") {
          next.genders = next.genders.filter((g) => g !== chip.rawKey);
        } else if (chip.type === "sizes") {
          next.sizes = next.sizes.filter((s) => s !== chip.rawKey);
        } else if (chip.type === "colours") {
          next.colours = next.colours.filter((c) => c !== chip.rawKey);
        } else if (chip.type === "fits") {
          next.fits = next.fits.filter((f) => f !== chip.rawKey);
        } else if (chip.type === "sleeves") {
          next.sleeves = next.sleeves.filter((s) => s !== chip.rawKey);
        } else if (chip.type === "fabrics") {
          next.fabrics = next.fabrics.filter((f) => f !== chip.rawKey);
        } else if (chip.type === "collections") {
          next.collections = next.collections.filter((c) => c !== chip.rawKey);
        } else if (chip.type === "availability") {
          next.availability = next.availability.filter((a) => a !== chip.rawKey);
        } else if (chip.type === "minPrice" || chip.type === "maxPrice") {
          next.minPrice = null;
          next.maxPrice = null;
        }
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  // Compute Active Filter Chips
  const activeFilterChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];

    // Categories
    filters.categories.forEach((cat) => {
      if (cat !== lockedCategory && !defaultCategoryFilter.includes(cat)) {
        chips.push({
          id: `cat-${cat}`,
          type: "categories",
          categoryLabel: "Category",
          displayValue: cat,
          rawKey: cat,
        });
      }
    });

    // Shoe Types
    filters.shoeTypes.forEach((st) => {
      if (st !== lockedShoeType) {
        chips.push({
          id: `st-${st}`,
          type: "shoeTypes",
          categoryLabel: "Shoe Type",
          displayValue: st,
          rawKey: st,
        });
      }
    });

    // Clothing Categories
    filters.clothingCategories.forEach((cc) => {
      if (cc !== lockedClothingCategory) {
        chips.push({
          id: `cc-${cc}`,
          type: "clothingCategories",
          categoryLabel: "Item",
          displayValue: cc,
          rawKey: cc,
        });
      }
    });

    // Brands
    filters.brands.forEach((brand) => {
      if (brand !== lockedBrand) {
        chips.push({
          id: `brand-${brand}`,
          type: "brands",
          categoryLabel: "Brand",
          displayValue: brand,
          rawKey: brand,
        });
      }
    });

    // Genders
    filters.genders.forEach((gender) => {
      if (gender !== lockedGender && !defaultGenderFilter.includes(gender)) {
        chips.push({
          id: `gender-${gender}`,
          type: "genders",
          categoryLabel: "Gender",
          displayValue: gender,
          rawKey: gender,
        });
      }
    });

    // Sizes
    filters.sizes.forEach((size) => {
      chips.push({
        id: `size-${size}`,
        type: "sizes",
        categoryLabel: resolvedDept === "footwear" ? "UK Size" : "Size",
        displayValue: resolvedDept === "footwear" ? `UK ${size}` : size,
        rawKey: size,
      });
    });

    // Colours
    filters.colours.forEach((col) => {
      chips.push({
        id: `colour-${col}`,
        type: "colours",
        categoryLabel: "Colour",
        displayValue: col,
        rawKey: col,
      });
    });

    // Fits
    filters.fits.forEach((fit) => {
      chips.push({
        id: `fit-${fit}`,
        type: "fits",
        categoryLabel: "Fit",
        displayValue: fit,
        rawKey: fit,
      });
    });

    // Sleeves
    filters.sleeves.forEach((sleeve) => {
      chips.push({
        id: `sleeve-${sleeve}`,
        type: "sleeves",
        categoryLabel: "Sleeve",
        displayValue: sleeve,
        rawKey: sleeve,
      });
    });

    // Fabrics
    filters.fabrics.forEach((fab) => {
      chips.push({
        id: `fabric-${fab}`,
        type: "fabrics",
        categoryLabel: "Fabric",
        displayValue: fab,
        rawKey: fab,
      });
    });

    // Collections
    if (!isCollectionPage) {
      filters.collections.forEach((col) => {
        if (col !== lockedCollection) {
          const colObj = COLLECTIONS_DATA.find((c) => c.slug === col);
          chips.push({
            id: `collection-${col}`,
            type: "collections",
            categoryLabel: "Collection",
            displayValue: colObj ? colObj.title : col,
            rawKey: col,
          });
        }
      });
    }

    // Price Range Chip
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      const minText = filters.minPrice ? `₹${filters.minPrice.toLocaleString("en-IN")}` : "₹0";
      const maxText = filters.maxPrice ? `₹${filters.maxPrice.toLocaleString("en-IN")}` : "Max";
      chips.push({
        id: "price-range",
        type: "minPrice",
        categoryLabel: "Price",
        displayValue: `${minText} – ${maxText}`,
        rawKey: "price",
      });
    }

    // Availability
    filters.availability.forEach((avail) => {
      chips.push({
        id: `avail-${avail}`,
        type: "availability",
        categoryLabel: "Status",
        displayValue: avail,
        rawKey: avail,
      });
    });

    return chips;
  }, [
    filters,
    lockedCategory,
    lockedShoeType,
    lockedClothingCategory,
    lockedBrand,
    lockedGender,
    lockedCollection,
    defaultCategoryFilter,
    defaultGenderFilter,
    resolvedDept,
    isCollectionPage,
  ]);

  const activeFilterCount = activeFilterChips.length;

  return {
    filters,
    filteredProducts,
    totalCount: filteredProducts.length,
    totalCatalogueCount: initialProducts.length,
    activeFilterCount,
    activeFilterChips,
    availableSizesForProducts,
    availableColoursForProducts,
    getPreviewCount,
    toggleCategory,
    toggleShoeType,
    toggleClothingCategory,
    toggleBrand,
    toggleGender,
    toggleSize,
    toggleColour,
    toggleFit,
    toggleSleeve,
    toggleFabric,
    toggleCollection,
    toggleAvailability,
    setPriceRange,
    setSortOption,
    setSortBy: setSortOption,
    applyCompleteState,
    applyCompleteFilterState: applyCompleteState,
    clearAllFilters,
    removeChip,
    removeFilterChip: removeChip,
  };
}
