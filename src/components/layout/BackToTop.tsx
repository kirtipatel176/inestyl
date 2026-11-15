"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Reveal when user scrolls down beyond 350px
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    scrollTo(0, { duration: 1.1 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          aria-label="Scroll back to top"
          title="Back to Top"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[#1D1D1F] shadow-subtle hover:border-[#0071E3] hover:text-[#0071E3] hover:shadow-card active:scale-95 transition-all group"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 text-[#0071E3]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider hidden sm:inline">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
