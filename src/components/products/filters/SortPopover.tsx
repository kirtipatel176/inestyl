"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowDownUp, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SortOption } from "@/types/filters";
import { SORT_OPTIONS } from "@/hooks/useProductFilters";

interface SortPopoverProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  variant?: "desktop" | "mobile";
  onCloseMobile?: () => void;
}

export function SortPopover({
  currentSort,
  onSortChange,
  variant = "desktop",
  onCloseMobile,
}: SortPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "Recommended";

  if (variant === "mobile") {
    return (
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
            Sort Products
          </span>
        </div>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = currentSort === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onSortChange(opt.value);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs transition-colors ${
                  isSelected
                    ? "bg-[#0071E3]/10 text-[#0071E3] font-semibold"
                    : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#0071E3]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="h-9 px-3.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#1D1D1F] text-[#1D1D1F] flex items-center gap-1.5 transition-all select-none shadow-xs"
      >
        <ArrowDownUp className="w-3.5 h-3.5 text-[#86868B]" />
        <span>Sort: {currentLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-56 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-dropdown z-40 p-2 overflow-hidden focus:outline-none"
          >
            <div className="space-y-0.5">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = currentSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? "bg-[#0071E3]/10 text-[#0071E3] font-semibold"
                        : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0071E3]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
