"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ProductItem } from "@/constants/mock-data";
import { useProductFilters, UseProductFiltersProps } from "@/hooks/useProductFilters";
import { ProductFilterToolbar } from "@/components/products/filters/ProductFilterToolbar";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyFilterResults } from "@/components/products/filters/EmptyFilterResults";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ProductListingViewProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs: BreadcrumbItem[];
  department?: "footwear" | "clothing" | "all";
  lockedGender?: "Men" | "Women";
  lockedBrand?: string;
  lockedCategory?: string;
  lockedShoeType?: string;
  lockedClothingCategory?: string;
  lockedCollection?: string;
  isCollectionPage?: boolean;
  initialProducts?: ProductItem[];
  pageSize?: number;
}

export function ProductListingView({
  title,
  subtitle,
  badge,
  breadcrumbs,
  department = "all",
  lockedGender,
  lockedBrand,
  lockedCategory,
  lockedShoeType,
  lockedClothingCategory,
  lockedCollection,
  isCollectionPage = false,
  initialProducts,
  pageSize = 12,
}: ProductListingViewProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

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
    applyCompleteState,
    clearAllFilters,
    removeChip,
  } = useProductFilters({
    initialProducts,
    department,
    lockedGender,
    lockedBrand,
    lockedCategory,
    lockedShoeType,
    lockedClothingCategory,
    lockedCollection,
    isCollectionPage,
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  return (
    <div className="container-luxury py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-[#86868B] overflow-x-auto no-scrollbar">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <div key={crumb.label} className="flex items-center gap-1.5 whitespace-nowrap">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[#1D1D1F] font-semibold" : ""}>
                  {crumb.label}
                </span>
              )}
              {!isLast && <span className="text-[#86868B]/60">/</span>}
            </div>
          );
        })}
      </nav>

      {/* 2. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div className="space-y-1.5 max-w-3xl">
          {badge && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
              {badge}
            </span>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Store Location Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] text-[11px] font-medium text-[#1D1D1F] self-start md:self-auto flex-shrink-0">
          <MapPin className="w-3 h-3 text-[#0071E3]" />
          <span>Kapadwanj Flagship Store</span>
        </div>
      </div>

      {/* 3. Product Filter Toolbar (Horizontal Desktop + Mobile Sheet) */}
      <ProductFilterToolbar
        filters={filters}
        activeFilterCount={activeFilterCount}
        activeFilterChips={activeFilterChips}
        totalCount={totalCount}
        totalCatalogueCount={totalCatalogueCount}
        department={department}
        isCollectionPage={isCollectionPage}
        onToggleCategory={toggleCategory}
        onToggleShoeType={toggleShoeType}
        onToggleClothingCategory={toggleClothingCategory}
        onToggleBrand={toggleBrand}
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

      {/* 4. Product Grid or Empty State */}
      {displayedProducts.length > 0 ? (
        <div className="space-y-10">
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
