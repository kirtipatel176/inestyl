"use client";

import { useState } from "react";
import { ProductItem, BrandItem } from "@/constants/mock-data";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductFilterToolbar } from "@/components/products/filters/ProductFilterToolbar";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyFilterResults } from "@/components/products/filters/EmptyFilterResults";

interface BrandListingClientProps {
  brand: BrandItem;
  initialProducts: ProductItem[];
}

export function BrandListingClient({ brand, initialProducts }: BrandListingClientProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  const {
    filters,
    filteredProducts,
    totalCount,
    totalCatalogueCount,
    activeFilterCount,
    activeFilterChips,
    getPreviewCount,
    toggleCategory,
    toggleShoeType,
    toggleClothingCategory,
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
    applyCompleteState,
    clearAllFilters,
    removeChip,
  } = useProductFilters({
    initialProducts,
    lockedBrand: brand.name,
    department: brand.category === "footwear" ? "footwear" : brand.category === "apparel" ? "clothing" : "all",
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="space-y-6">
      {/* Brand Specific Filters */}
      <ProductFilterToolbar
        filters={filters}
        activeFilterCount={activeFilterCount}
        activeFilterChips={activeFilterChips}
        totalCount={totalCount}
        totalCatalogueCount={totalCatalogueCount}
        department={brand.category === "footwear" ? "footwear" : brand.category === "apparel" ? "clothing" : "all"}
        onToggleCategory={toggleCategory}
        onToggleShoeType={toggleShoeType}
        onToggleClothingCategory={toggleClothingCategory}
        onToggleBrand={() => {}} // locked
        onToggleGender={toggleGender}
        onToggleSize={toggleSize}
        onToggleColour={toggleColour}
        onToggleFit={toggleFit}
        onToggleSleeve={toggleSleeve}
        onToggleFabric={toggleFabric}
        onToggleCollection={toggleCollection}
        onToggleAvailability={toggleAvailability}
        onPriceChange={setPriceRange}
        onSortChange={setSortOption}
        onApplyCompleteState={applyCompleteState}
        onClearAll={clearAllFilters}
        onRemoveChip={removeChip}
        getPreviewCount={getPreviewCount}
      />

      {displayedProducts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="pt-4 flex flex-col items-center justify-center space-y-2">
              <button
                type="button"
                onClick={() => setVisibleCount((p) => p + 12)}
                className="h-11 px-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-[#1D1D1F] text-xs font-semibold hover:border-[#1D1D1F] hover:bg-[#F5F5F7] transition-all shadow-subtle active:scale-98"
              >
                Load More ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      ) : (
        <EmptyFilterResults onClearFilters={clearAllFilters} />
      )}
    </div>
  );
}

