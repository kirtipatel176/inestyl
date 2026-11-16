"use client";

import { History, X, Clock, User, ArrowRight } from "lucide-react";
import { Product } from "@/types";

interface ProductChangeHistoryModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductChangeHistoryModal({
  product,
  onClose,
}: ProductChangeHistoryModalProps) {
  const history = product.changeHistory || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                Product Change History
              </h3>
              <p className="text-xs text-[#86868B] truncate max-w-sm">
                {product.title} (SKU: {product.sku})
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

        {/* Change History Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          {history.length === 0 ? (
            <div className="py-12 text-center text-[#86868B] space-y-2">
              <History className="w-8 h-8 mx-auto stroke-[1.5] text-neutral-300" />
              <p>No change history recorded yet for this product.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-[#E5E7EB] ml-4 pl-5 space-y-6">
              {history.map((entry, idx) => (
                <div key={entry.id || idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0071E3]" />

                  <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-[#E5E7EB] space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#86868B]">
                      <span className="flex items-center gap-1 font-semibold text-[#1D1D1F]">
                        <User className="w-3 h-3 text-[#0071E3]" />
                        {entry.author}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(entry.timestamp).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="font-medium text-[#1D1D1F] text-xs">
                      {entry.summary}
                    </p>

                    {(entry.from !== undefined || entry.to !== undefined) && (
                      <div className="pt-1 flex items-center gap-2 text-[11px] font-mono">
                        {entry.from !== undefined && (
                          <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 line-through">
                            {JSON.stringify(entry.from)}
                          </span>
                        )}
                        <ArrowRight className="w-3 h-3 text-[#86868B]" />
                        {entry.to !== undefined && (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                            {JSON.stringify(entry.to)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E5E7EB] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1D1D1F] text-white font-semibold text-xs hover:bg-black"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
}
