"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@inestyle/shared-types";
import { getOptimizedImagePath, getProductImageFitting } from "@/lib/images";

interface FeaturedCollectionSectionProps {
  initialProducts?: Product[];
  isLoading?: boolean;
}

export function FeaturedCollectionSection({
  initialProducts = [],
  isLoading = false,
}: FeaturedCollectionSectionProps) {
  const products = initialProducts.slice(0, 6);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="container-luxury space-y-8 sm:space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
          Featured Collection
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Current season footwear and apparel available in store.
        </p>
      </motion.div>

      {/* Specific Section Area: Skeleton while waiting for backend response, or Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="status" aria-label="Loading featured collection">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-[#FBFBFB] rounded-2xl overflow-hidden border border-[#E5E7EB] animate-pulse">
              <div className="aspect-square w-full bg-[#F5F5F7] p-8 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-[#E5E7EB] rounded-xl" />
              </div>
              <div className="p-6 space-y-3 bg-[#FFFFFF]">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
                  <div className="h-4 w-4/5 bg-[#E5E7EB] rounded" />
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-[#F5F5F7]">
                  <div className="h-5 w-20 bg-[#E5E7EB] rounded" />
                  <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block relative bg-[#FBFBFB] rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#1D1D1F]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full bg-[#F5F5F7] overflow-hidden flex items-center justify-center p-8">
                  {product.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={getOptimizedImagePath(product.image, "listing")}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`transition-transform duration-500 group-hover:scale-105 ${
                          getProductImageFitting(product.image, product.type).objectFitClass
                        } ${getProductImageFitting(product.image, product.type).scaleClass}`}
                      />
                    </div>
                  ) : (
                    <div className="text-xs text-[#86868B]">No image available</div>
                  )}

                  {/* Subtle Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Meta */}
                <div className="p-6 space-y-3 bg-[#FFFFFF]">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#86868B] tracking-wider uppercase">
                      {product.brand}
                    </span>
                    <h3 className="text-base font-semibold text-[#1D1D1F] line-clamp-1 group-hover:text-[#0071E3] transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-[#F5F5F7]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#1D1D1F]">
                        ₹{product.outletPrice.toLocaleString("en-IN")}
                      </span>
                      {product.mrp > product.outletPrice && (
                        <span className="text-xs text-[#86868B] line-through">
                          ₹{product.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#0071E3] font-medium group-hover:translate-x-0.5 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* View All CTA */}
      <div className="text-center pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full hover:bg-black transition-colors shadow-sm"
        >
          View All Products
          <span className="text-xs">→</span>
        </Link>
      </div>
    </section>
  );
}
