"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { BRANDS_DATA } from "@/constants/mock-data";

export function BrandSpotlight() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="container-luxury space-y-6">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            AUTHENTIC OUTLET SOURCING
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Featured Brands
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 max-w-xl">
            Original inventory sourced through authorized distributor networks, available at verified outlet pricing.
          </p>
        </div>
        <Link
          href="/brands"
          className="text-xs sm:text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors self-start sm:self-auto"
        >
          View All Brands
        </Link>
      </motion.div>

      {/* Restrained Editorial 7-Brand Grid Linking to Dedicated Brand Pages */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-30px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5"
      >
        {BRANDS_DATA.map((brand) => (
          <motion.div key={brand.id} variants={itemVariants}>
            <Link
              href={`/brands/${brand.slug}`}
              className="group h-[150px] rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-[#0071E3] hover:shadow-subtle hover:-translate-y-0.5 block relative overflow-hidden"
            >
              {/* Top subtle category */}
              <div className="w-full flex items-center justify-between text-[10px] text-[#86868B] capitalize">
                <span>{brand.category === "both" ? "Footwear & Apparel" : brand.category}</span>
              </div>

              {/* Brand Logo */}
              <div className="relative w-full h-9 flex items-center justify-center my-auto">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={84}
                  height={28}
                  className="max-h-7 w-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Bottom Label & Count */}
              <div className="w-full pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <span className="font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] font-semibold text-[#6E6E73] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
                  {brand.itemCount}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

