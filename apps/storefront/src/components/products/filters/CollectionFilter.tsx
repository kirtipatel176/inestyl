"use client";

import { Check } from "lucide-react";
import { NAV_COLLECTIONS } from "@/constants/navigation";

interface CollectionFilterProps {
  selectedCollections: string[];
  onToggleCollection: (collectionSlug: string) => void;
  onClear?: () => void;
  collections?: { slug: string; title: string }[];
}

export function CollectionFilter({
  selectedCollections,
  onToggleCollection,
  onClear,
  collections = NAV_COLLECTIONS,
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
        {collections.map((col) => {
          const isSelected = selectedCollections.some(
            (c) => c.toLowerCase() === col.slug.toLowerCase()
          );
          return (
            <label
              key={col.slug}
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
                <span>{col.title}</span>
              </div>
              <input
                type="checkbox"
                name="collection"
                value={col.slug}
                checked={isSelected}
                onChange={() => onToggleCollection(col.slug)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

