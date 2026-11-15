"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductItem, CollectionItem } from "@/constants/mock-data";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductFilterToolbar } from "@/components/products/filters/ProductFilterToolbar";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyFilterResults } from "@/components/products/filters/EmptyFilterResults";
import { getOptimizedImagePath } from "@/lib/images";

interface CollectionListingClientProps {
  collection: CollectionItem;
  initialProducts: ProductItem[];
}

export function CollectionListingClient({
  collection,
  initialProducts,
}: CollectionListingClientProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Requirement 3: "The Collection filter should not be redundantly displayed when the user is already browsing a single collection."
  const {
    filters,
    filteredProducts,
    totalCount,
    totalCatalogueCount,
    activeFilterCount,
    activeFilterChips,
    getPreviewCount,
    toggleCategory,
    toggleBrand,
    toggleGender,
    toggleSize,
    toggleColour,
    toggleAvailability,
    setPriceRange,
    setSortOption,
    applyCompleteState,
    clearAllFilters,
    removeChip,
  } = useProductFilters({
    initialProducts,
    lockedCollection: collection.slug,
    isCollectionPage: true,
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="space-y-8">
      {/* 1. Large Editorial Campaign Hero Header */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#E5E7EB] aspect-[21/9] sm:aspect-[24/8] min-h-[220px]">
        <Image
          src={getOptimizedImagePath(collection.image)}
          alt={collection.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
          <div className="max-w-2xl space-y-2">
            {collection.badge && (
              <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0071E3] text-white">
                {collection.badge}
              </span>
            )}
            <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {collection.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Adaptive Desktop & Mobile Filter Toolbar (No redundant collection filter) */}
      <ProductFilterToolbar
        filters={filters}
        activeFilterCount={activeFilterCount}
        activeFilterChips={activeFilterChips}
        totalCount={totalCount}
        totalCatalogueCount={totalCatalogueCount}
        isCollectionPage={true}
        department="all"
        onToggleCategory={toggleCategory}
        onToggleBrand={toggleBrand}
        onToggleGender={toggleGender}
        onToggleSize={toggleSize}
        onToggleColour={toggleColour}
        onToggleAvailability={toggleAvailability}
        onPriceChange={setPriceRange}
        onSortChange={setSortOption}
        onApplyCompleteState={applyCompleteState}
        onClearAll={clearAllFilters}
        onRemoveChip={removeChip}
        getPreviewCount={getPreviewCount}
      />

      {/* 3. Product Grid or Empty State */}
      {displayedProducts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Pagination */}
          {hasMore && (
            <div className="pt-4 flex flex-col items-center justify-center space-y-2">
              <button
                type="button"
                onClick={handleLoadMore}
                className="h-11 px-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-[#1D1D1F] text-xs font-semibold hover:border-[#1D1D1F] hover:bg-[#F5F5F7] transition-all shadow-subtle active:scale-98"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
              <span className="text-[11px] text-[#86868B]">
                Showing {visibleCount} of {filteredProducts.length} items
              </span>
            </div>
          )}
        </div>
      ) : (
        <EmptyFilterResults onClearFilters={clearAllFilters} />
      )}
    </div>
  );
}
