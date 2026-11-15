"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { PRODUCTS_DATA, BRANDS_DATA } from "@/constants/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredResults = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    const cleanQ = query.trim().toLowerCase();
    if (cleanQ) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQ) ||
          p.brand.toLowerCase().includes(cleanQ) ||
          p.category.toLowerCase().includes(cleanQ) ||
          p.sku.toLowerCase().includes(cleanQ) ||
          p.description.toLowerCase().includes(cleanQ)
      );
    }

    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    if (selectedType !== "all") {
      list = list.filter((p) => p.type === selectedType);
    }

    return list;
  }, [query, selectedBrand, selectedType]);

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
        <div className="text-xs text-[#86868B]">
          Showing {filteredResults.length} matching products
          {query && (
            <span>
              {" "}
              for &quot;<strong className="text-[#1D1D1F]">{query}</strong>&quot;
            </span>
          )}
        </div>

        {/* Brand & Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-3 py-1.5 text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
          >
            <option value="all">All Departments</option>
            <option value="footwear">Footwear Only</option>
            <option value="apparel">Apparel Only</option>
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="text-xs bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-3 py-1.5 text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
          >
            <option value="all">All Brands</option>
            {BRANDS_DATA.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredResults.map((product) => (
            <ProductCard key={product.id} product={product} />
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-sm text-[#86868B]">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

