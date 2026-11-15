"use client";

import { useState, useMemo } from "react";
import { Search, Check } from "lucide-react";
import { AVAILABLE_BRANDS } from "@/hooks/useProductFilters";

interface BrandFilterProps {
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  onClear?: () => void;
}

export function BrandFilter({
  selectedBrands,
  onToggleBrand,
  onClear,
}: BrandFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return AVAILABLE_BRANDS;
    const term = searchTerm.toLowerCase();
    return AVAILABLE_BRANDS.filter((b) => b.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Filter by Brand
        </span>
        {selectedBrands.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Brand Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search brands..."
          className="w-full h-8 pl-8 pr-3 text-xs bg-[#F5F5F7] border border-[#E5E7EB] rounded-lg text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
        />
      </div>

      {/* Brand Options List */}
      <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
        {filteredBrands.map((brand) => {
          const isSelected = selectedBrands.includes(brand);
          return (
            <label
              key={brand}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                isSelected
                  ? "bg-[#0071E3]/10 text-[#0071E3] font-medium"
                  : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#0071E3] border-[#0071E3] text-white"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{brand}</span>
              </div>
            </label>
          );
        })}
        {filteredBrands.length === 0 && (
          <p className="text-[11px] text-[#86868B] py-3 text-center">
            No brands matching &quot;{searchTerm}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
