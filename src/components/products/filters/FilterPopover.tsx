"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterPopoverProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  badgeCount?: number;
  children: React.ReactNode;
  widthClass?: string;
  align?: "left" | "right";
}

export function FilterPopover({
  label,
  isOpen,
  onToggle,
  onClose,
  badgeCount = 0,
  children,
  widthClass = "w-72",
  align = "left",
}: FilterPopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const hasActiveFilter = badgeCount > 0;

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`h-9 px-3.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all select-none border ${
          hasActiveFilter
            ? "bg-[#0071E3] text-white border-[#0071E3] shadow-xs"
            : isOpen
            ? "bg-[#FFFFFF] text-[#1D1D1F] border-[#1D1D1F] shadow-xs"
            : "bg-[#FFFFFF] text-[#1D1D1F] border-[#E5E7EB] hover:border-[#86868B]"
        }`}
      >
        <span>{label}</span>
        {hasActiveFilter && (
          <span className="w-4 h-4 rounded-full bg-white text-[#0071E3] text-[10px] font-bold flex items-center justify-center ml-0.5">
            {badgeCount}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${hasActiveFilter ? "text-white" : "text-[#86868B]"}`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full mt-2 ${
              align === "right" ? "right-0" : "left-0"
            } ${widthClass} bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-dropdown z-40 p-4 overflow-hidden focus:outline-none`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
