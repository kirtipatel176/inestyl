"use client";

import { Check } from "lucide-react";
import { COLLECTIONS_DATA } from "@/constants/mock-data";

interface CollectionFilterProps {
  selectedCollections: string[];
  onToggleCollection: (collectionSlug: string) => void;
  onClear?: () => void;
}

export function CollectionFilter({
  selectedCollections,
  onToggleCollection,
  onClear,
}: CollectionFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Curated Collections
        </span>
        {selectedCollections.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
        {COLLECTIONS_DATA.map((col) => {
          const isSelected = selectedCollections.includes(col.slug);
          return (
            <label
              key={col.slug}
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
                <span>{col.title}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

