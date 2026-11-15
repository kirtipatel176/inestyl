"use client";

import { useState, useEffect } from "react";
import { DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "@/hooks/useProductFilters";

interface PriceRangeFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  onPriceChange: (min: number | null, max: number | null) => void;
  onClear?: () => void;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  onClear,
}: PriceRangeFilterProps) {
  const currentMin = minPrice ?? DEFAULT_MIN_PRICE;
  const currentMax = maxPrice ?? DEFAULT_MAX_PRICE;

  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  useEffect(() => {
    setLocalMin(minPrice ?? DEFAULT_MIN_PRICE);
    setLocalMax(maxPrice ?? DEFAULT_MAX_PRICE);
  }, [minPrice, maxPrice]);

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), localMax - 500);
    setLocalMin(val);
    onPriceChange(val, localMax);
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), localMin + 500);
    setLocalMax(val);
    onPriceChange(localMin, val);
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalMin(val);
    if (!isNaN(val) && val < localMax) {
      onPriceChange(val, localMax);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalMax(val);
    if (!isNaN(val) && val > localMin) {
      onPriceChange(localMin, val);
    }
  };

  const isCustomRange = minPrice !== null || maxPrice !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
          Price Range (INR)
        </span>
        {isCustomRange && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#0071E3] hover:underline font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Selected Range Readout */}
      <div className="text-center bg-[#F5F5F7] py-2 px-3 rounded-lg border border-[#E5E7EB]">
        <span className="text-xs font-semibold text-[#1D1D1F]">
          ₹{localMin.toLocaleString("en-IN")} — ₹{localMax.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Dual Sliders */}
      <div className="space-y-3 px-1">
        <div className="space-y-1">
          <label htmlFor="min-price-slider" className="text-[10px] text-[#86868B] block font-medium">
            Minimum Price
          </label>
          <input
            id="min-price-slider"
            type="range"
            min={DEFAULT_MIN_PRICE}
            max={DEFAULT_MAX_PRICE}
            step={500}
            value={localMin}
            onChange={handleMinSlider}
            aria-label="Minimum Price Slider"
            className="w-full accent-[#0071E3] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="max-price-slider" className="text-[10px] text-[#86868B] block font-medium">
            Maximum Price
          </label>
          <input
            id="max-price-slider"
            type="range"
            min={DEFAULT_MIN_PRICE}
            max={DEFAULT_MAX_PRICE}
            step={500}
            value={localMax}
            onChange={handleMaxSlider}
            aria-label="Maximum Price Slider"
            className="w-full accent-[#0071E3] cursor-pointer"
          />
        </div>
      </div>

      {/* Direct Numeric Inputs */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <span className="text-[10px] text-[#86868B] block font-medium">Min (₹)</span>
          <input
            type="number"
            value={localMin}
            onChange={handleMinInput}
            step={500}
            aria-label="Minimum Price Input"
            className="w-full h-8 px-2 text-xs border border-[#E5E7EB] rounded-lg bg-white text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
          />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-[#86868B] block font-medium">Max (₹)</span>
          <input
            type="number"
            value={localMax}
            onChange={handleMaxInput}
            step={500}
            aria-label="Maximum Price Input"
            className="w-full h-8 px-2 text-xs border border-[#E5E7EB] rounded-lg bg-white text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
          />
        </div>
      </div>
    </div>
  );
}
