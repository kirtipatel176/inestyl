"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X, Loader2, AlertCircle } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";
import { trackEvent } from "@/lib/analytics";
import { Product } from "@inestyle/shared-types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Available brands list
  const brandList = ["Nike", "adidas", "Puma", "HOKA", "Levi's", "DIESEL", "U.S. Polo Assn."];

  const fetchResults = useCallback(async (searchTerm: string, brand: string, type: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (brand !== "all") params.set("brand", brand);
      if (type !== "all") params.set("type", type);
      params.set("limit", "50");

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to execute search: HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Unable to search catalogue right now. Please check your connection and retry.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced execution
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query, selectedBrand, selectedType);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedBrand, selectedType, fetchResults]);

  // Track search query
  useEffect(() => {
    if (!query.trim() || query.length < 2) return;
    const timer = setTimeout(() => {
      trackEvent("search_query", undefined, query.trim(), {
        resultsCount: products.length,
        selectedBrand,
        selectedType,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [query, products.length, selectedBrand, selectedType]);

  const popularSearches = [
    "Nike Air Max",
    "adidas Ultraboost",
    "Levi's 501",
    "HOKA",
    "Running",
    "Denim Jacket",
  ];

  return (
    <div className="container-luxury py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Search Catalogue</span>
      </nav>

      {/* 2. Interactive Search Bar Header */}
      <div className="max-w-3xl space-y-4">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Search Products
        </h1>
        <p className="text-xs sm:text-sm text-[#86868B]">
          Find original sneakers, denim, and sportswear by keyword, brand name, category, or SKU.
        </p>

        <div className="relative">
          <Search className="w-5 h-5 text-[#86868B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by shoe model, brand (e.g. Nike, HOKA, Levi's), or category..."
            className="w-full h-12 pl-12 pr-10 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 shadow-xs transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search query"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Searches Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#86868B]">
          <span className="font-medium text-[#1D1D1F]">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Filters & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] pt-4">
        <div className="text-xs text-[#86868B] flex items-center gap-2">
          {isLoading ? (
            <span className="flex items-center gap-1.5 text-[#0071E3]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching live inventory...
            </span>
          ) : (
            <span>
              Showing {products.length} matching products
              {query && (
                <span>
                  {" "}
                  for &quot;<strong className="text-[#1D1D1F]">{query}</strong>&quot;
                </span>
              )}
            </span>
          )}
        </div>

        {/* Brand & Type Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-3 py-1.5 text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
          >
            <option value="all">All Departments</option>
            <option value="footwear">Footwear Only</option>
            <option value="clothing">Clothing Only</option>
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-3 py-1.5 text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
          >
            <option value="all">All Brands</option>
            {brandList.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Results Grid with Loading, Empty & Error States */}
      {error ? (
        <div className="text-center py-16 bg-[#FFF5F5] rounded-2xl border border-[#FEE2E2] p-8 space-y-3 max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-[#DC2626] mx-auto" />
          <p className="text-sm font-semibold text-[#991B1B]">{error}</p>
          <button
            onClick={() => fetchResults(query, selectedBrand, selectedType)}
            className="px-4 py-2 bg-[#DC2626] text-white text-xs font-semibold rounded-full hover:bg-[#B91C1C] transition-colors"
          >
            Retry Search
          </button>
        </div>
      ) : isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 space-y-4 max-w-lg mx-auto">
          <p className="text-base font-medium text-[#1D1D1F]">
            No products found matching &quot;{query}&quot;
          </p>
          <p className="text-xs text-[#86868B]">
            Check for spelling errors or try a more general search term like &quot;Running&quot; or &quot;Nike&quot;.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedBrand("all");
              setSelectedType("all");
            }}
            className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="container-luxury py-8 space-y-8 animate-pulse" role="status" aria-label="Loading search">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
      </div>

      {/* Search Header */}
      <div className="max-w-3xl space-y-4">
        <div className="h-8 w-60 bg-[#E5E7EB] rounded" />
        <div className="h-4 w-96 max-w-full bg-[#E5E7EB] rounded" />
      </div>

      {/* Search Input Skeleton */}
      <div className="h-14 w-full bg-[#F5F5F7] rounded-2xl border border-[#E5E7EB]" />

      {/* Pills Filter Skeleton */}
      <div className="flex gap-2 py-2 overflow-hidden">
        <div className="h-8 w-20 bg-[#E5E7EB] rounded-full" />
        <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
        <div className="h-8 w-20 bg-[#E5E7EB] rounded-full" />
        <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
      </div>

      {/* Product Results Grid Skeleton for the search section area */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
