"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PRODUCTS_DATA, BRANDS_DATA } from "@/constants/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { getOptimizedImagePath } from "@/lib/images";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { stop: stopScroll, start: startScroll } = useSmoothScroll();

  // Lock background Lenis smooth scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      stopScroll();
    } else {
      startScroll();
    }
    return () => {
      startScroll();
    };
  }, [isOpen, stopScroll, startScroll]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? PRODUCTS_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-dropdown border border-[#E5E7EB] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-[#E5E7EB]">
              <Search className="w-5 h-5 text-[#0071E3] mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search sneakers, apparel, brands (e.g. Nike, Air Max, 501)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-[#1D1D1F] placeholder:text-[#86868B] text-base outline-none font-body"
              />
              <button
                onClick={onClose}
                className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-full hover:bg-black/5 transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Brands Suggestions */}
            {!query && (
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-3">
                    Popular Outlet Brands
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS_DATA.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => setQuery(brand.name)}
                        className="px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-xs font-medium text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3] hover:bg-[#F5F5F7] transition-all active:scale-98"
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-3">
                    Trending Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Running Sneakers",
                      "Lifestyle Shoes",
                      "Denim Jackets",
                      "501 Jeans",
                      "Polo Shirts",
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setQuery(cat)}
                        className="px-3.5 py-1.5 rounded-full bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F] hover:bg-[#E5E7EB] transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results List */}
            {query && (
              <div
                data-lenis-prevent
                className="max-h-[380px] overflow-y-auto overscroll-contain p-4 divide-y divide-[#E5E7EB] saas-scrollbar"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5F5F7] transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 bg-[#F5F5F7] border border-[#E5E7EB] rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={getOptimizedImagePath(product.image, "thumb")}
                            alt={product.title}
                            fill
                            sizes="56px"
                            loading="lazy"
                            quality={75}
                            className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-[#1D1D1F]">
                              ₹{product.outletPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[11px] text-[#86868B] line-through">
                              MRP ₹{product.mrp.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-1.5 py-0.2 rounded">
                              {product.discount}% OFF
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-10 text-[#86868B] text-sm">
                    No products found matching &quot;{query}&quot;. Try searching for Nike, Puma, Levi&apos;s or Jeans.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
