"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Brand, Product } from "@inestyle/shared-types";
import { ProductCard } from "@/components/products/ProductCard";

interface BrandsPageClientProps {
  brands: Brand[];
  products: Product[];
}

export function BrandsPageClient({ brands, products }: BrandsPageClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "footwear" | "apparel">("all");
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>(brands[0]?.slug || "nike");

  const filteredBrands = brands.filter((b) => {
    if (selectedFilter === "all") return true;
    return b.category === selectedFilter || b.category === "both";
  });

  const selectedBrand = brands.find((b) => b.slug === selectedBrandSlug) || brands[0];
  const brandProducts = products.filter((p) => p.brandSlug === selectedBrandSlug);

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

      {/* 3. Brand Tiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {filteredBrands.map((brand) => {
          const isSelected = brand.slug === selectedBrandSlug;
          return (
            <button
              key={brand.id || brand.slug}
              onClick={() => setSelectedBrandSlug(brand.slug)}
              className={`group flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 text-left ${
                isSelected
                  ? "border-[#0071E3] bg-[#F5FAFF] ring-2 ring-[#0071E3]/20 shadow-sm"
                  : "border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#1D1D1F]/20 hover:shadow-xs"
              }`}
            >
              <div className="relative w-16 h-12 flex items-center justify-center">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={64}
                    height={48}
                    className={`object-contain max-h-10 w-auto transition-all ${
                      isSelected ? "scale-105" : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                ) : (
                  <span className="font-bold text-sm tracking-wider">{brand.name}</span>
                )}
              </div>
              <span
                className={`text-xs font-semibold mt-3 tracking-wide uppercase transition-colors ${
                  isSelected ? "text-[#0071E3]" : "text-[#86868B] group-hover:text-[#1D1D1F]"
                }`}
              >
                {brand.name}
              </span>
              <span className="text-[10px] text-[#86868B] mt-0.5">
                {brand.itemCount ? `${brand.itemCount} styles` : "Verified Stock"}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Selected Brand Spotlight & Product Listing */}
      {selectedBrand && (
        <section className="space-y-6 pt-6 border-t border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FBFBFB] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-[#0071E3] tracking-wider uppercase">
                Brand Showcase
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
                {selectedBrand.name} at iNESTYL OUTLET
              </h2>
              {selectedBrand.description && (
                <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                  {selectedBrand.description}
                </p>
              )}
            </div>

            <Link
              href={`/brands/${selectedBrand.slug}`}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-black transition-colors self-start sm:self-auto shrink-0"
            >
              View Full {selectedBrand.name} Page →
            </Link>
          </div>

          {/* Brand Product Grid */}
          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {brandProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#FBFBFB] rounded-2xl border border-dashed border-[#E5E7EB] space-y-2">
              <p className="text-sm font-semibold text-[#1D1D1F]">
                No current styles available for {selectedBrand.name}
              </p>
              <p className="text-xs text-[#86868B]">
                New stock is delivered weekly to our Kapadwanj flagship outlet.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
