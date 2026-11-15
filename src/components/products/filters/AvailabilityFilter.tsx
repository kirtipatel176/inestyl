"use client";

import { Check } from "lucide-react";
import { AVAILABILITY_OPTIONS } from "@/hooks/useProductFilters";

interface AvailabilityFilterProps {
  selectedAvailability: string[];
  onToggleAvailability: (status: string) => void;
  onClear?: () => void;
}

export function AvailabilityFilter({
  selectedAvailability,
  onToggleAvailability,
  onClear,
}: AvailabilityFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Stock Availability
        </span>
        {selectedAvailability.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {AVAILABILITY_OPTIONS.map((status) => {
          const isSelected = selectedAvailability.includes(status);
          const isAvailable = status === "In Stock" || status === "Limited Stock";

          return (
            <label
              key={status}
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
                <span>{status}</span>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${
                  status === "In Stock"
                    ? "bg-emerald-500"
                    : status === "Limited Stock"
                    ? "bg-amber-500"
                    : "bg-neutral-400"
                }`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
