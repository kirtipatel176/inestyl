"use client";

export interface ProductResultCountProps {
  count?: number;
  filteredCount?: number;
  totalCatalogueCount?: number;
  totalCount?: number;
}

export function ProductResultCount({
  count,
  filteredCount,
  totalCatalogueCount,
  totalCount,
}: ProductResultCountProps) {
  const displayCount = count ?? filteredCount ?? 0;
  const catalogueTotal = totalCatalogueCount ?? totalCount;

  return (
    <div className="flex items-center gap-2 text-xs text-[#86868B] select-none">
      <span className="font-semibold text-[#1D1D1F]">
        {displayCount} {displayCount === 1 ? "Product" : "Products"}
      </span>
      {catalogueTotal && displayCount < catalogueTotal && (
        <span>(filtered from {catalogueTotal})</span>
      )}
      <span className="hidden sm:inline-block text-[#E5E7EB]">•</span>
      <span className="hidden sm:inline-block text-[#0071E3] font-medium">
        Verified Store Inventory
      </span>
    </div>
  );
}
