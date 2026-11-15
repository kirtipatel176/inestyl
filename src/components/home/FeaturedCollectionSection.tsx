"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS_DATA, type ProductItem } from "@/constants/mock-data";
import { getOptimizedImagePath } from "@/lib/images";

export function FeaturedCollectionSection() {
  // Standout curated styles representing authentic footwear and fashion
  const featuredProductSlugs = [
    "nike-air-max-270",
    "adidas-ultraboost-light",
    "puma-rs-x",
    "hoka-clifton-9",
    "levis-501-original-fit",
    "diesel-denim-trucker-jacket",
  ];

  const products: ProductItem[] = featuredProductSlugs
    .map((slug) => PRODUCTS_DATA.find((p) => p.slug === slug))
    .filter((p): p is ProductItem => Boolean(p));

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

      {/* Clean Horizontal Product Grid (4-6 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col justify-between bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] overflow-hidden hover:border-[#86868B] transition-all duration-300 hover:shadow-subtle"
          >
            <div>
              {/* Product Photography Container */}
              <Link
                href={`/product/${product.slug}`}
                className="relative block h-72 sm:h-80 w-full bg-[#F5F5F7] p-8 overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getOptimizedImagePath(product.image, "listing")}
                    alt={product.title}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain drop-shadow-sm scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
              </Link>

              {/* Product Details Header */}
              <div className="p-6 pb-2 space-y-2">
                {/* Brand Name */}
                <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] block">
                  {product.brand}
                </span>

                {/* Product Name */}
                <Link href={`/product/${product.slug}`} className="block">
                  <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] line-clamp-1 group-hover:text-[#0071E3] transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* Price (Configured) */}
                {product.outletPrice && (
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-semibold text-[#1D1D1F]">
                      ₹{product.outletPrice.toLocaleString("en-IN")}
                    </span>
                    {product.mrp && product.mrp > product.outletPrice && (
                      <span className="text-xs text-[#86868B] line-through">
                        MRP ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: Colour Options & Subtle View Details Link */}
            <div className="p-6 pt-3 flex items-center justify-between border-t border-[#E5E7EB]/60 mt-4">
              {/* Available Colour Swatches */}
              <div className="flex items-center gap-1.5" title="Available Colours">
                {product.colours && product.colours.length > 0 ? (
                  product.colours.map((colour) => (
                    <span
                      key={colour.name}
                      title={colour.name}
                      className="w-3.5 h-3.5 rounded-full border border-[#E5E7EB] shadow-2xs inline-block"
                      style={{ backgroundColor: colour.hex }}
                    />
                  ))
                ) : (
                  <span className="text-[11px] text-[#86868B]">Single edition</span>
                )}
              </div>

              {/* Subtle View Details Link */}
              <Link
                href={`/product/${product.slug}`}
                className="text-xs sm:text-sm font-medium text-[#0071E3] hover:text-[#0066CC] transition-colors"
              >
                <span>View Details</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
