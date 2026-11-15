"use client";

import { SlidersHorizontal } from "lucide-react";

interface EmptyFilterResultsProps {
  onClearFilters: () => void;
}

export function EmptyFilterResults({ onClearFilters }: EmptyFilterResultsProps) {
  return (
    <div className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 space-y-4 max-w-lg mx-auto shadow-subtle">
      <div className="w-12 h-12 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center mx-auto text-[#0071E3]">
        <SlidersHorizontal className="w-5 h-5" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
          No matching products found
        </h3>
        <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-sm mx-auto">
          We couldn&apos;t find any items matching your selected criteria. Try adjusting or clearing some of your filters.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
