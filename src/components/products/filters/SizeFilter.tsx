"use client";

import { FOOTWEAR_SIZES, APPAREL_SIZES } from "@/hooks/useProductFilters";

interface SizeFilterProps {
  selectedSizes: string[];
  selectedCategories: string[];
  onToggleSize: (size: string) => void;
  onClear?: () => void;
}

export function SizeFilter({
  selectedSizes,
  selectedCategories,
  onToggleSize,
  onClear,
}: SizeFilterProps) {
  // Determine whether to display footwear sizes, clothing sizes, or both
  const hasApparelOnly =
    selectedCategories.length > 0 &&
    selectedCategories.every((c) =>
      ["clothing", "apparel", "jeans", "jackets", "t-shirts", "hoodies"].includes(c.toLowerCase())
    );

  const hasFootwearOnly =
    selectedCategories.length > 0 &&
    selectedCategories.every((c) =>
      ["shoes", "footwear", "sneakers", "running shoes", "casual shoes", "running", "lifestyle", "training", "casual"].includes(c.toLowerCase())
    );

  const showFootwear = !hasApparelOnly;
  const showApparel = !hasFootwearOnly;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Sizes
        </span>
        {selectedSizes.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Footwear UK Sizes */}
      {showFootwear && (
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block">
            Footwear (UK)
          </span>
          <div className="grid grid-cols-4 gap-2">
            {FOOTWEAR_SIZES.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={`uk-${size}`}
                  type="button"
                  onClick={() => onToggleSize(size)}
                  className={`h-9 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#0071E3] text-white border-[#0071E3] shadow-xs"
                      : "bg-white text-[#1D1D1F] border-[#E5E7EB] hover:border-[#1D1D1F]"
                  }`}
                >
                  UK {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Clothing Sizes */}
      {showApparel && (
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block">
            Clothing Sizes
          </span>
          <div className="grid grid-cols-4 gap-2">
            {APPAREL_SIZES.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={`app-${size}`}
                  type="button"
                  onClick={() => onToggleSize(size)}
                  className={`h-9 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#0071E3] text-white border-[#0071E3] shadow-xs"
                      : "bg-white text-[#1D1D1F] border-[#E5E7EB] hover:border-[#1D1D1F]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
