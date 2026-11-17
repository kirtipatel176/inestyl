"use client";

import { Check } from "lucide-react";
import { AVAILABLE_GENDERS } from "@/hooks/useProductFilters";

interface GenderFilterProps {
  selectedGenders: string[];
  onToggleGender: (gender: string) => void;
  onClear?: () => void;
}

export function GenderFilter({
  selectedGenders,
  onToggleGender,
  onClear,
}: GenderFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Gender
        </span>
        {selectedGenders.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {AVAILABLE_GENDERS.map((gender) => {
          const isSelected = selectedGenders.includes(gender);
          return (
            <button
              key={gender}
              type="button"
              onClick={() => onToggleGender(gender)}
              className={`h-9 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${
                isSelected
                  ? "bg-[#0071E3] text-white border-[#0071E3] shadow-xs"
                  : "bg-white text-[#1D1D1F] border-[#E5E7EB] hover:border-[#1D1D1F]"
              }`}
            >
              {gender}
            </button>
          );
        })}
      </div>
    </div>
  );
}
