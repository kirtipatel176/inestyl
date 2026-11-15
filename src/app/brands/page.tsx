"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDS_DATA, PRODUCTS_DATA } from "@/constants/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

export default function BrandsPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "footwear" | "apparel">("all");
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>("nike");

  const filteredBrands = BRANDS_DATA.filter((b) => {
    if (selectedFilter === "all") return true;
    return b.category === selectedFilter || b.category === "both";
  });

  const selectedBrand = BRANDS_DATA.find((b) => b.slug === selectedBrandSlug) || BRANDS_DATA[0];

  const brandProducts = PRODUCTS_DATA.filter((p) => p.brandSlug === selectedBrandSlug);

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Brands</span>
      </nav>

      {/* 2. Header & Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Our Brands
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] mt-1">
            Explore 100% original collections from world-renowned sportswear and fashion houses.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] p-1.5 rounded-full border border-[#E5E7EB] self-start sm:self-auto">
          {(["all", "footwear", "apparel"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                selectedFilter === tab
                  ? "bg-[#0071E3] text-white shadow-xs"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              {tab === "all" ? "All Brands" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Master Brand Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {filteredBrands.map((brand) => {
          const isSelected = selectedBrandSlug === brand.slug;
          return (
            <button
              key={brand.id}
              onClick={() => setSelectedBrandSlug(brand.slug)}
              style={{
                backgroundColor: isSelected ? "#1D1D1F" : "#FFFFFF",
              }}
              className={`h-32 rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 border text-center relative group ${
                isSelected
                  ? "border-[#1D1D1F] shadow-subtle scale-102"
                  : "border-[#E5E7EB] hover:border-[#0071E3] hover:-translate-y-0.5 hover:shadow-subtle"
              }`}
            >
              <div className="relative h-8 w-24 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={90}
                  height={30}
                  className={`max-h-7 w-auto object-contain transition-all ${
                    isSelected ? "filter invert contrast-200" : "grayscale group-hover:grayscale-0"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium mt-3 ${
                  isSelected ? "text-[#2997FF]" : "text-[#86868B]"
                }`}
              >
                {brand.itemCount} Styles
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Brand Spotlight Banner */}
      <div className="p-8 sm:p-10 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3] block mb-1">
            Brand Spotlight
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">
            {selectedBrand.name} Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#86868B] max-w-xl mt-1 leading-relaxed">
            {selectedBrand.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/brands/${selectedBrand.slug}`}
            className="inline-flex items-center min-h-[44px] px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle"
          >
            Visit {selectedBrand.name} Brand Page
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center min-h-[44px] px-5 py-2.5 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#1D1D1F] transition-all"
          >
            All Outlet Brands
          </Link>
        </div>
      </div>

      {/* 5. Brand-Specific Products Grid */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] mb-6">
          Featured {selectedBrand.name} Styles in Store
        </h3>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] text-[#86868B] text-sm">
            More {selectedBrand.name} products arriving this week. Connect with our Kapadwanj store team on WhatsApp for exclusive drops.
          </div>
        )}
      </div>
    </div>
  );
}
