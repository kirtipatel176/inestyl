"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { getOptimizedImagePath } from "@/lib/images";
import { trackEvent } from "@/lib/analytics";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Product } from "@inestyle/shared-types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
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

  // Real database search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}&limit=6`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setResults(data.products);
          } else {
            setResults([]);
          }
        }
      } catch (err) {
        console.error("SearchModal API error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Track search query with debounce
  useEffect(() => {
    if (!query.trim() || query.length < 2) return;
    const timer = setTimeout(() => {
      trackEvent("search_query", undefined, query.trim(), {
        resultsCount: results.length,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [query, results.length]);

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
              <Search className="w-5 h-5 text-[#86868B] mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sneakers, apparel, brands, or SKU..."
                autoFocus
                className="w-full bg-transparent text-base sm:text-lg text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
              />
              {isSearching ? (
                <Loader2 className="w-5 h-5 text-[#0071E3] animate-spin shrink-0 ml-2" />
              ) : query ? (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors border border-[#E5E7EB] px-2 py-1 rounded-md"
                >
                  ESC
                </button>
              )}
            </div>

            {/* Modal Body / Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#F5F5F7]">
              {/* Specific Section Area: Skeleton while waiting for backend search response */}
              {isSearching && results.length === 0 ? (
                <div className="space-y-3 py-2 animate-pulse" role="status" aria-label="Searching products">
                  <div className="flex items-center justify-between pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                    <div className="h-3 w-36 bg-[#E5E7EB] rounded" />
                    <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
                  </div>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-[#F5F5F7]">
                      <div className="w-14 h-14 bg-[#F5F5F7] rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-16 bg-[#E5E7EB] rounded" />
                        <div className="h-3.5 w-44 bg-[#E5E7EB] rounded" />
                        <div className="h-2.5 w-24 bg-[#E5E7EB] rounded" />
                      </div>
                      <div className="space-y-1.5 text-right">
                        <div className="h-4 w-16 bg-[#E5E7EB] rounded ml-auto" />
                        <div className="h-2.5 w-12 bg-[#E5E7EB] rounded ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                    <span>Matching Products ({results.length})</span>
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="text-[#0071E3] hover:underline normal-case"
                    >
                      View all in search page →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors"
                      >
                        {/* Product Thumbnail */}
                        <div className="relative w-14 h-14 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] overflow-hidden shrink-0">
                          {product.image && (
                            <ImageWithFallback
                              src={getOptimizedImagePath(product.image, "thumb")}
                              alt={product.title}
                              fill
                              className="object-contain p-1.5"
                            />
                          )}
                        </div>

                        {/* Title & Brand */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#86868B] block">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors truncate">
                            {product.title}
                          </h4>
                          <span className="text-xs text-[#86868B]">{product.category}</span>
                        </div>

                        {/* Pricing */}
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-[#1D1D1F] block">
                            ₹{product.outletPrice.toLocaleString("en-IN")}
                          </span>
                          {product.mrp > product.outletPrice && (
                            <span className="text-[11px] text-[#86868B] line-through block">
                              ₹{product.mrp.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : query && !isSearching ? (
                <div className="text-center py-12 space-y-2">
                  <ShoppingBag className="w-8 h-8 text-[#86868B] mx-auto opacity-50" />
                  <p className="text-sm font-medium text-[#1D1D1F]">
                    No products found for &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-[#86868B]">
                    Try searching for &quot;Nike&quot;, &quot;HOKA&quot;, &quot;Running&quot;, or &quot;Denim&quot;.
                  </p>
                </div>
              ) : (
                /* Default State: Quick Links & Suggestions */
                <div className="space-y-4 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
                    Quick Links
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Running Shoes", href: "/shoes/running" },
                      { label: "Sneakers", href: "/shoes/sneakers" },
                      { label: "Men's Collection", href: "/men" },
                      { label: "Women's Collection", href: "/women" },
                      { label: "Original Denim", href: "/clothing" },
                      { label: "New Arrivals", href: "/collections/new-arrivals" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E7EB] text-xs font-medium text-[#1D1D1F] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {query && results.length > 0 && (
              <div className="px-6 py-3 bg-[#FBFBFB] border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#86868B]">
                <span>Press Enter to view complete results</span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="font-semibold text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  Full Search View <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
