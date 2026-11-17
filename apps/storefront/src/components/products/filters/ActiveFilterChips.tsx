"use client";

import { X } from "lucide-react";
import { ActiveFilterChip } from "@/types/filters";

interface ActiveFilterChipsProps {
  chips: ActiveFilterChip[];
  onRemoveChip: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({
  chips,
  onRemoveChip,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-medium text-[#1D1D1F] shadow-xs group transition-colors hover:border-[#86868B]"
        >
          <span className="text-[#86868B]">{chip.categoryLabel}:</span>
          <span>{chip.displayValue}</span>
          <button
            type="button"
            onClick={() => onRemoveChip(chip)}
            aria-label={`Remove filter ${chip.categoryLabel} ${chip.displayValue}`}
            className="w-4 h-4 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {chips.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-[#0071E3] hover:underline px-2 py-1 rounded-full transition-colors ml-1"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
