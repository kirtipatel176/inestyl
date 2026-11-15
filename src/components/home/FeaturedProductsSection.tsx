"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS_DATA } from "@/constants/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProductsSection() {
  // Select up to 8 unique featured products (strictly non-new to avoid duplicate with New Arrivals)
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.isFeatured && !p.isNew).slice(0, 8);

  return (
    <section className="container-luxury space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            OUTLET HIGHLIGHTS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Featured Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
            Curated icons from Nike, adidas, Levi&apos;s, and U.S. Polo Assn. at verified outlet pricing.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors self-start sm:self-auto"
        >
          View All Products
        </Link>
      </motion.div>

      {/* Product Grid: 8 Unique Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

