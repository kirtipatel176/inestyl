"use client";

import { Check } from "lucide-react";
import { AVAILABLE_CATEGORIES } from "@/hooks/useProductFilters";

interface CategoryFilterProps {
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
  onClear?: () => void;
}

export function CategoryFilter({
  selectedCategories,
  onToggleCategory,
  onClear,
}: CategoryFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Select Categories
        </span>
        {selectedCategories.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
        {AVAILABLE_CATEGORIES.map((item) => {
          const isSelected = selectedCategories.some(
            (c) => c.toLowerCase() === item.value.toLowerCase()
          );
          return (
            <label
              key={item.value}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors focus-within:ring-2 focus-within:ring-[#0071E3] focus-within:ring-offset-1 ${
                isSelected
                  ? "bg-[#0071E3]/10 text-[#0071E3] font-medium"
                  : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  aria-hidden="true"
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#0071E3] border-[#0071E3] text-white"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{item.label}</span>
              </div>
              <input
                type="checkbox"
                name="category"
                value={item.value}
                checked={isSelected}
                onChange={() => onToggleCategory(item.value)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
