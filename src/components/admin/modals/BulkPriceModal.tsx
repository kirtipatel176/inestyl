"use client";

import { useState } from "react";
import { Tag, X, Percent, ArrowRight } from "lucide-react";

interface BulkPriceModalProps {
  selectedCount: number;
  onClose: () => void;
  onSubmit: (updateType: "discount_percent" | "flat_outlet_price" | "adjust_percent", value: number) => void;
}

export function BulkPriceModal({
  selectedCount,
  onClose,
  onSubmit,
}: BulkPriceModalProps) {
  const [updateType, setUpdateType] = useState<
    "discount_percent" | "flat_outlet_price" | "adjust_percent"
  >("discount_percent");
  const [value, setValue] = useState<number>(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(updateType, Number(value));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-[#E5E7EB]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                Bulk Price &amp; Discount Update
              </h3>
              <p className="text-xs text-[#86868B]">
                Applying to {selectedCount} selected products
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Strategy Options */}
          <div className="space-y-2">
            <label className="font-bold text-[#1D1D1F] block">Select Pricing Rule:</label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#F5F5F7] cursor-pointer">
              <input
                type="radio"
                name="rule"
                checked={updateType === "discount_percent"}
                onChange={() => {
                  setUpdateType("discount_percent");
                  setValue(35);
                }}
                className="mt-0.5 accent-[#0071E3]"
              />
              <div>
                <span className="font-semibold block text-[#1D1D1F]">
                  Set Target Discount % from Retail MRP
                </span>
                <span className="text-[11px] text-[#6E6E73]">
                  Automatically recomputes Outlet Price based on product MRP.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#F5F5F7] cursor-pointer">
              <input
                type="radio"
                name="rule"
                checked={updateType === "flat_outlet_price"}
                onChange={() => {
                  setUpdateType("flat_outlet_price");
                  setValue(4999);
                }}
                className="mt-0.5 accent-[#0071E3]"
              />
              <div>
                <span className="font-semibold block text-[#1D1D1F]">
                  Set Uniform Flat Outlet Price (₹)
                </span>
                <span className="text-[11px] text-[#6E6E73]">
                  Applies fixed price across selected styles and calculates % discount.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#F5F5F7] cursor-pointer">
              <input
                type="radio"
                name="rule"
                checked={updateType === "adjust_percent"}
                onChange={() => {
                  setUpdateType("adjust_percent");
                  setValue(-10);
                }}
                className="mt-0.5 accent-[#0071E3]"
              />
              <div>
                <span className="font-semibold block text-[#1D1D1F]">
                  Adjust Current Outlet Price (+/- %)
                </span>
                <span className="text-[11px] text-[#6E6E73]">
                  e.g. -10 for additional 10% off current outlet price.
                </span>
              </div>
            </label>
          </div>

          {/* Value Input */}
          <div className="pt-2">
            <label className="font-bold text-[#1D1D1F] block mb-1">
              {updateType === "discount_percent"
                ? "Discount Percentage (%):"
                : updateType === "flat_outlet_price"
                ? "Flat Outlet Price (₹):"
                : "Percentage Adjustment (%):"}
            </label>
            <div className="relative">
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-sm font-semibold focus:outline-none focus:border-[#0071E3]"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-[#86868B] font-bold">
                {updateType === "flat_outlet_price" ? "INR (₹)" : "%"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC] transition-colors"
            >
              Apply Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
