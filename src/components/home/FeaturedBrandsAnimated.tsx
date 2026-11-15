"use client";

import Link from "next/link";
import Image from "next/image";
import { BRANDS_DATA } from "@/constants/mock-data";
import { motion, type Variants } from "framer-motion";

export function FeaturedBrandsAnimated() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="container-luxury">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5E7EB]"
      >
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">
            Featured Brands
          </h2>
        </div>
        <Link
          href="/brands"
          className="text-xs sm:text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          Explore All Brands
        </Link>
      </motion.div>

      {/* 7-Brand Card Grid with Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
      >
        {BRANDS_DATA.map((brand) => (
          <motion.div key={brand.id} variants={itemVariants}>
            <Link
              href={`/brands`}
              style={{ backgroundColor: brand.tileBg || "#1D1D1F" }}
              className="group h-36 rounded-xl flex flex-col items-center justify-between p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-subtle border border-black/10 text-center relative overflow-hidden block"
            >
              {/* Subtle top brand badge */}
              <div className="w-full flex justify-between items-center text-[9px] uppercase tracking-wider text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Original</span>
              </div>

              {/* Logo Area */}
              <div className="relative z-10 w-full flex items-center justify-center my-auto">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={96}
                  height={32}
                  className="max-h-8 w-auto object-contain filter invert contrast-200 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Styles Count */}
              <div className="z-10 w-full pt-1 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/80">
                  {brand.name}
                </span>
                <span
                  style={{ color: brand.textColor || "#2997FF" }}
                  className="text-[10px] font-semibold text-[#2997FF] bg-white/10 px-1.5 py-0.5 rounded-full"
                >
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
