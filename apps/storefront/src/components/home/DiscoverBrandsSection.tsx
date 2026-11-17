"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Brand } from "@inestyle/shared-types";

interface DiscoverBrandsSectionProps {
  brands?: Brand[];
}

export function DiscoverBrandsSection({ brands = [] }: DiscoverBrandsSectionProps) {
  // If no brands passed, hide section cleanly rather than showing fake data
  if (brands.length === 0) {
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
          Discover Brands
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Authorized authentic footwear & apparel from global sportswear houses.
        </p>
      </motion.div>

      {/* Brand Grid: Balanced Clean Minimalist Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id || brand.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/brands/${brand.slug}`}
              className="group flex flex-col items-center justify-center p-6 h-36 sm:h-44 rounded-2xl bg-[#FBFBFB] border border-[#E5E7EB] hover:border-[#1D1D1F]/30 hover:bg-[#FFFFFF] hover:shadow-lg transition-all duration-300"
            >
              {/* Brand Logo */}
              <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={56}
                    className="object-contain max-h-12 w-auto"
                  />
                ) : (
                  <span className="font-bold text-sm tracking-widest">{brand.name}</span>
                )}
              </div>

              {/* Brand Label */}
              <span className="text-xs font-semibold text-[#86868B] group-hover:text-[#1D1D1F] mt-3 tracking-wider uppercase transition-colors">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
