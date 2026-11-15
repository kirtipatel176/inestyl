"use client";

import { Check } from "lucide-react";
import { CLOTHING_FITS, SLEEVE_TYPES, FABRICS } from "@/hooks/useProductFilters";

interface FitFilterProps {
  selectedFits: string[];
  onToggleFit: (fit: string) => void;
  onClear?: () => void;
}

export function FitFilter({ selectedFits, onToggleFit, onClear }: FitFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Clothing Fit
        </span>
        {selectedFits.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {CLOTHING_FITS.map((fit) => {
          const isSelected = selectedFits.includes(fit);
          return (
            <label
              key={fit}
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
                <span>{fit}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

interface SleeveFilterProps {
  selectedSleeves: string[];
  onToggleSleeve: (sleeve: string) => void;
  onClear?: () => void;
}

export function SleeveFilter({ selectedSleeves, onToggleSleeve, onClear }: SleeveFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Sleeve Length
        </span>
        {selectedSleeves.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {SLEEVE_TYPES.map((sleeve) => {
          const isSelected = selectedSleeves.includes(sleeve);
          return (
            <label
              key={sleeve}
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
                <span>{sleeve}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

interface FabricFilterProps {
  selectedFabrics: string[];
  onToggleFabric: (fabric: string) => void;
  onClear?: () => void;
}

export function FabricFilter({ selectedFabrics, onToggleFabric, onClear }: FabricFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Fabric / Material
        </span>
        {selectedFabrics.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {FABRICS.map((fabric) => {
          const isSelected = selectedFabrics.includes(fabric);
          return (
            <label
              key={fabric}
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
                <span>{fabric}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

