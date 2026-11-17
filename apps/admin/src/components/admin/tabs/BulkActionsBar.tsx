"use client";

import { useState } from "react";
import {
  CheckSquare,
  Layers,
  Tag,
  FolderTree,
  Eye,
  EyeOff,
  Archive,
  X,
  ChevronDown,
} from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  totalCount: number;
  onClearSelection: () => void;
  onSelectAll: () => void;
  onBulkStock: (action: "in_stock" | "out_of_stock") => void;
  onBulkPriceModal: () => void;
  onBulkAssignModal: () => void;
  onBulkPublish: (publish: boolean) => void;
  onBulkArchive: () => void;
}

export function BulkActionsBar({
  selectedCount,
  totalCount,
  onClearSelection,
  onSelectAll,
  onBulkStock,
  onBulkPriceModal,
  onBulkAssignModal,
  onBulkPublish,
  onBulkArchive,
}: BulkActionsBarProps) {
  const [isStockOpen, setIsStockOpen] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1D1D1F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex flex-wrap items-center gap-3 sm:gap-4 text-xs animate-in fade-in slide-in-from-bottom-4">
      {/* Selection Stats */}
      <div className="flex items-center gap-2 border-r border-white/20 pr-3">
        <CheckSquare className="w-4 h-4 text-[#2997FF]" />
        <span className="font-bold">
          {selectedCount} Selected
        </span>
        {selectedCount < totalCount && (
          <button
            type="button"
            onClick={onSelectAll}
            className="text-[11px] text-[#2997FF] hover:underline ml-1"
          >
            (Select All {totalCount})
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Stock Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsStockOpen(!isStockOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-white"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stock Status</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {isStockOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white text-[#1D1D1F] rounded-2xl shadow-2xl border border-[#E5E7EB] p-1.5 space-y-1">
              <button
                type="button"
                onClick={() => {
                  onBulkStock("in_stock");
                  setIsStockOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F5F5F7] font-semibold text-emerald-700 flex items-center justify-between"
              >
                <span>Mark All In Stock</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onBulkStock("out_of_stock");
                  setIsStockOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F5F5F7] font-semibold text-red-700 flex items-center justify-between"
              >
                <span>Mark Out of Stock</span>
                <span className="w-2 h-2 rounded-full bg-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Pricing & Discounts */}
        <button
          type="button"
          onClick={onBulkPriceModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-white"
        >
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Price &amp; Discount</span>
        </button>

        {/* Taxonomy Assignment */}
        <button
          type="button"
          onClick={onBulkAssignModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-white"
        >
          <FolderTree className="w-3.5 h-3.5 text-blue-400" />
          <span>Assign Brand/Category</span>
        </button>

        {/* Publish / Unpublish */}
        <button
          type="button"
          onClick={() => onBulkPublish(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-emerald-300"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>

        <button
          type="button"
          onClick={() => onBulkPublish(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-amber-300"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Unpublish</span>
        </button>

        {/* Archive */}
        <button
          type="button"
          onClick={onBulkArchive}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors font-medium"
        >
          <Archive className="w-3.5 h-3.5" />
          <span>Archive</span>
        </button>
      </div>

      {/* Dismiss / Clear Selection */}
      <button
        type="button"
        onClick={onClearSelection}
        className="ml-auto text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        title="Clear Selection"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
