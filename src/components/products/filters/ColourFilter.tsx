"use client";

import { Check } from "lucide-react";
import { AVAILABLE_COLOURS } from "@/hooks/useProductFilters";

interface ColourFilterProps {
  selectedColours: string[];
  onToggleColour: (colour: string) => void;
  onClear?: () => void;
}

export function ColourFilter({
  selectedColours,
  onToggleColour,
  onClear,
}: ColourFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Colours
        </span>
        {selectedColours.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {AVAILABLE_COLOURS.map((col) => {
          const isSelected = selectedColours.includes(col.name);
          const isLight = col.name === "White" || col.name === "Beige";

          return (
            <button
              key={col.name}
              type="button"
              onClick={() => onToggleColour(col.name)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                isSelected
                  ? "bg-[#0071E3]/10 border-[#0071E3] text-[#0071E3]"
                  : "bg-white border-[#E5E7EB] text-[#1D1D1F] hover:border-[#1D1D1F]"
              }`}
            >
              <span
                style={{ backgroundColor: col.hex }}
                className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  isLight ? "border-black/20" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <Check
                    className={`w-2.5 h-2.5 stroke-[3] ${
                      isLight ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </span>
              <span className="truncate">{col.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
