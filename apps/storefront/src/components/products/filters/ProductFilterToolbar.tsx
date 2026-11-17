"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { FilterState, SortOption, ActiveFilterChip } from "@/types/filters";
import { FilterPopover } from "./FilterPopover";
import { CategoryFilter } from "./CategoryFilter";
import { ShoeTypeFilter } from "./ShoeTypeFilter";
import { BrandFilter } from "./BrandFilter";
import { GenderFilter } from "./GenderFilter";
import { SizeFilter } from "./SizeFilter";
import { ColourFilter } from "./ColourFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AvailabilityFilter } from "./AvailabilityFilter";
import { FitFilter, SleeveFilter, FabricFilter } from "./ClothingSpecFilter";
import { CollectionFilter } from "./CollectionFilter";
import { SortPopover } from "./SortPopover";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ProductResultCount } from "./ProductResultCount";

interface ProductFilterToolbarProps {
  filters: FilterState;
  activeFilterCount: number;
  activeFilterChips: ActiveFilterChip[];
  totalCount: number;
  totalCatalogueCount?: number;
  department?: "footwear" | "clothing" | "all";
  isCollectionPage?: boolean;
  onToggleCategory: (cat: string) => void;
  onToggleShoeType?: (st: string) => void;
  onToggleClothingCategory?: (cc: string) => void;
  onToggleBrand: (brand: string) => void;
  onToggleGender: (gender: string) => void;
  onToggleSize: (size: string) => void;
  onToggleColour: (col: string) => void;
  onToggleFit?: (fit: string) => void;
  onToggleSleeve?: (sleeve: string) => void;
  onToggleFabric?: (fabric: string) => void;
  onToggleCollection?: (col: string) => void;
  onToggleAvailability: (avail: string) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onSortChange: (sort: SortOption) => void;
  onApplyCompleteState: (state: FilterState) => void;
  onClearAll: () => void;
  onRemoveChip: (chip: ActiveFilterChip) => void;
  getPreviewCount: (draft: FilterState) => number;
}

export function ProductFilterToolbar({
  filters,
  activeFilterCount,
  activeFilterChips,
  totalCount,
  totalCatalogueCount,
  department = "all",
  isCollectionPage = false,
  onToggleCategory,
  onToggleShoeType,
  onToggleClothingCategory,
  onToggleBrand,
  onToggleGender,
  onToggleSize,
  onToggleColour,
  onToggleFit,
  onToggleSleeve,
  onToggleFabric,
  onToggleCollection,
  onToggleAvailability,
  onPriceChange,
  onSortChange,
  onApplyCompleteState,
  onClearAll,
  onRemoveChip,
  getPreviewCount,
}: ProductFilterToolbarProps) {
  // Track open desktop popover (only one open at a time for cleanliness)
  const [activePopover, setActivePopover] = useState<string | null>(null);

  // Mobile sheet states
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  const togglePopover = (name: string) => {
    setActivePopover((prev) => (prev === name ? null : name));
  };

  const closePopover = () => {
    setActivePopover(null);
  };

  return (
    <div className="space-y-4">
      {/* 1. MOBILE TOOLBAR (< lg screens): Clean 3-part layout */}
      <div className="flex lg:hidden items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
        {/* Left: Product Count */}
        <span className="text-xs font-semibold text-[#1D1D1F]">
          {totalCount} {totalCount === 1 ? "Product" : "Products"}
        </span>

        {/* Right: Filter & Sort Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            className={`h-9 px-4 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all ${
              activeFilterCount > 0
                ? "bg-[#0071E3] text-white border-[#0071E3] shadow-xs"
                : "bg-[#FFFFFF] text-[#1D1D1F] border-[#E5E7EB]"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#0071E3] text-[10px] font-bold flex items-center justify-center ml-0.5">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Mobile Sort Button */}
          <button
            type="button"
            onClick={() => setIsMobileSortOpen(true)}
            className="h-9 px-3.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E5E7EB] text-[#1D1D1F] flex items-center gap-1.5 transition-all"
          >
            <ArrowDownUp className="w-3.5 h-3.5 text-[#86868B]" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* 2. DESKTOP HORIZONTAL FILTER TOOLBAR (>= lg screens) */}
      <div className="hidden lg:flex items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        {/* Left: Minimal Filter Dropdown Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* A. If general page: Category Filter */}
          {department === "all" && (
            <FilterPopover
              label="Category"
              isOpen={activePopover === "category"}
              onToggle={() => togglePopover("category")}
              onClose={closePopover}
              badgeCount={filters.categories.length}
              widthClass="w-64"
            >
              <CategoryFilter
                selectedCategories={filters.categories}
                onToggleCategory={onToggleCategory}
                onClear={() => onApplyCompleteState({ ...filters, categories: [] })}
              />
            </FilterPopover>
          )}

          {/* B. If Footwear page: Shoe Type Filter */}
          {department === "footwear" && onToggleShoeType && (
            <FilterPopover
              label="Shoe Type"
              isOpen={activePopover === "shoeType"}
              onToggle={() => togglePopover("shoeType")}
              onClose={closePopover}
              badgeCount={filters.shoeTypes?.length || 0}
              widthClass="w-64"
            >
              <ShoeTypeFilter
                selectedShoeTypes={filters.shoeTypes ?? []}
                onToggleShoeType={onToggleShoeType}
                onClear={() => onApplyCompleteState({ ...filters, shoeTypes: [] })}
              />
            </FilterPopover>
          )}

          {/* C. If Clothing page: Clothing Category */}
          {department === "clothing" && (
            <FilterPopover
              label="Category"
              isOpen={activePopover === "category"}
              onToggle={() => togglePopover("category")}
              onClose={closePopover}
              badgeCount={filters.categories.length}
              widthClass="w-64"
            >
              <CategoryFilter
                selectedCategories={filters.categories}
                onToggleCategory={onToggleCategory}
                onClear={() => onApplyCompleteState({ ...filters, categories: [] })}
              />
            </FilterPopover>
          )}

          {/* Brand Filter */}
          <FilterPopover
            label="Brand"
            isOpen={activePopover === "brand"}
            onToggle={() => togglePopover("brand")}
            onClose={closePopover}
            badgeCount={filters.brands.length}
            widthClass="w-72"
          >
            <BrandFilter
              selectedBrands={filters.brands}
              onToggleBrand={onToggleBrand}
              onClear={() => onApplyCompleteState({ ...filters, brands: [] })}
            />
          </FilterPopover>

          {/* Gender Filter */}
          <FilterPopover
            label="Gender"
            isOpen={activePopover === "gender"}
            onToggle={() => togglePopover("gender")}
            onClose={closePopover}
            badgeCount={filters.genders.length}
            widthClass="w-64"
          >
            <GenderFilter
              selectedGenders={filters.genders}
              onToggleGender={onToggleGender}
              onClear={() => onApplyCompleteState({ ...filters, genders: [] })}
            />
          </FilterPopover>

          {/* Size Filter */}
          <FilterPopover
            label={department === "footwear" ? "UK Size" : "Size"}
            isOpen={activePopover === "size"}
            onToggle={() => togglePopover("size")}
            onClose={closePopover}
            badgeCount={filters.sizes.length}
            widthClass="w-72"
          >
            <SizeFilter
              selectedSizes={filters.sizes}
              selectedCategories={filters.categories}
              onToggleSize={onToggleSize}
              onClear={() => onApplyCompleteState({ ...filters, sizes: [] })}
            />
          </FilterPopover>

          {/* Colour Filter */}
          <FilterPopover
            label="Colour"
            isOpen={activePopover === "colour"}
            onToggle={() => togglePopover("colour")}
            onClose={closePopover}
            badgeCount={filters.colours.length}
            widthClass="w-72"
          >
            <ColourFilter
              selectedColours={filters.colours}
              onToggleColour={onToggleColour}
              onClear={() => onApplyCompleteState({ ...filters, colours: [] })}
            />
          </FilterPopover>

          {/* Clothing-Specific: Fit Filter */}
          {department === "clothing" && onToggleFit && (
            <FilterPopover
              label="Fit"
              isOpen={activePopover === "fit"}
              onToggle={() => togglePopover("fit")}
              onClose={closePopover}
              badgeCount={filters.fits?.length || 0}
              widthClass="w-64"
            >
              <FitFilter
                selectedFits={filters.fits ?? []}
                onToggleFit={onToggleFit}
                onClear={() => onApplyCompleteState({ ...filters, fits: [] })}
              />
            </FilterPopover>
          )}

          {/* Clothing-Specific: Sleeve Filter */}
          {department === "clothing" && onToggleSleeve && (
            <FilterPopover
              label="Sleeve"
              isOpen={activePopover === "sleeve"}
              onToggle={() => togglePopover("sleeve")}
              onClose={closePopover}
              badgeCount={filters.sleeves?.length || 0}
              widthClass="w-64"
            >
              <SleeveFilter
                selectedSleeves={filters.sleeves ?? []}
                onToggleSleeve={onToggleSleeve}
                onClear={() => onApplyCompleteState({ ...filters, sleeves: [] })}
              />
            </FilterPopover>
          )}

          {/* Clothing-Specific: Fabric Filter */}
          {department === "clothing" && onToggleFabric && (
            <FilterPopover
              label="Fabric"
              isOpen={activePopover === "fabric"}
              onToggle={() => togglePopover("fabric")}
              onClose={closePopover}
              badgeCount={filters.fabrics?.length || 0}
              widthClass="w-64"
            >
              <FabricFilter
                selectedFabrics={filters.fabrics ?? []}
                onToggleFabric={onToggleFabric}
                onClear={() => onApplyCompleteState({ ...filters, fabrics: [] })}
              />
            </FilterPopover>
          )}

          {/* Price Range Filter */}
          <FilterPopover
            label="Price"
            isOpen={activePopover === "price"}
            onToggle={() => togglePopover("price")}
            onClose={closePopover}
            badgeCount={filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0}
            widthClass="w-72"
          >
            <PriceRangeFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={onPriceChange}
              onClear={() => onPriceChange(null, null)}
            />
          </FilterPopover>

          {/* Collection Filter (Hidden if browsing a single collection) */}
          {!isCollectionPage && onToggleCollection && (
            <FilterPopover
              label="Collection"
              isOpen={activePopover === "collection"}
              onToggle={() => togglePopover("collection")}
              onClose={closePopover}
              badgeCount={filters.collections?.length || 0}
              widthClass="w-72"
            >
              <CollectionFilter
                selectedCollections={filters.collections ?? []}
                onToggleCollection={onToggleCollection}
                onClear={() => onApplyCompleteState({ ...filters, collections: [] })}
              />
            </FilterPopover>
          )}

          {/* Availability Filter */}
          <FilterPopover
            label="Availability"
            isOpen={activePopover === "availability"}
            onToggle={() => togglePopover("availability")}
            onClose={closePopover}
            badgeCount={filters.availability.length}
            widthClass="w-64"
          >
            <AvailabilityFilter
              selectedAvailability={filters.availability}
              onToggleAvailability={onToggleAvailability}
              onClear={() => onApplyCompleteState({ ...filters, availability: [] })}
            />
          </FilterPopover>
        </div>

        {/* Right: Sort Popover Control */}
        <div className="flex-shrink-0">
          <SortPopover
            currentSort={filters.sortBy}
            onSortChange={onSortChange}
          />
        </div>
      </div>

      {/* 3. ACTIVE FILTER CHIPS & RESULT COUNT ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <ActiveFilterChips
          chips={activeFilterChips}
          onRemoveChip={onRemoveChip}
          onClearAll={onClearAll}
        />
        <div className="hidden lg:block">
          <ProductResultCount
            count={totalCount}
            totalCatalogueCount={totalCatalogueCount ?? totalCount}
          />
        </div>
      </div>

      {/* 4. MOBILE FILTER SHEET */}
      <MobileFilterSheet
        isOpen={isMobileSheetOpen}
        onClose={() => setIsMobileSheetOpen(false)}
        activeFilters={filters}
        onApplyFilters={onApplyCompleteState}
        onClearAll={onClearAll}
        getPreviewCount={getPreviewCount}
        department={department}
        isCollectionPage={isCollectionPage}
      />

      {/* 5. MOBILE SORT SHEET / MODAL */}
      {isMobileSortOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-black/50 backdrop-blur-xs">
          <div className="w-full bg-white rounded-t-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <span className="font-heading text-base font-semibold text-[#1D1D1F]">
                Sort By
              </span>
              <button
                onClick={() => setIsMobileSortOpen(false)}
                className="text-xs font-semibold text-[#0071E3]"
              >
                Done
              </button>
            </div>
            <div className="space-y-1">
              {[
                { label: "Recommended", value: "recommended" as SortOption },
                { label: "Newest First", value: "newest" as SortOption },
                { label: "Price: Low to High", value: "price-low" as SortOption },
                { label: "Price: High to Low", value: "price-high" as SortOption },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    setIsMobileSortOpen(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between ${
                    filters.sortBy === opt.value
                      ? "bg-[#0071E3]/10 text-[#0071E3] font-semibold"
                      : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.sortBy === opt.value && (
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
