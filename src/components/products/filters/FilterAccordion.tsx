"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  selectedSummary?: string;
  badgeCount?: number;
  children: React.ReactNode;
}

export function FilterAccordion({
  title,
  isOpen,
  onToggle,
  selectedSummary,
  badgeCount = 0,
  children,
}: FilterAccordionProps) {
  return (
    <div className="border-b border-[#E5E7EB] py-3.5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#1D1D1F]">{title}</span>
          {badgeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#0071E3] text-white text-[10px] font-bold flex items-center justify-center">
              {badgeCount}
            </span>
          )}
          {selectedSummary && (
            <span className="text-xs text-[#86868B] max-w-[160px] truncate hidden sm:inline-block">
              ({selectedSummary})
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0071E3]" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
