"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function CategorySectionAnimated() {
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
            Shop by Category
          </h2>
        </div>
        <Link
          href="/footwear"
          className="text-xs sm:text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          View All Categories
        </Link>
      </motion.div>

      {/* Category Dual Cards with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Category 1: Footwear */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/footwear"
            className="group relative h-[400px] sm:h-[440px] rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] shadow-subtle hover:border-[#0071E3]/50 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 block"
          >
            {/* Top Pill */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#E5E7EB] text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F] shadow-xs">
                Footwear
              </span>
              <span className="text-xs font-medium text-[#86868B] bg-black/5 px-2.5 py-1 rounded-full">
                60+ Styles
              </span>
            </div>

            {/* Centered Image with smooth scale on hover */}
            <div className="relative w-full h-56 sm:h-64 my-auto">
              <Image
                src="/images/categories/category-footwear-card.webp"
                alt="Footwear Collection at iNESTYL OUTLET"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="flex items-end justify-between z-10 pt-4 border-t border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  Footwear
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] font-normal mt-1">
                  Sneakers • Running • Training • Casual
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0071E3] group-hover:underline">
                Explore Footwear
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Category 2: Apparel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/apparel"
            className="group relative h-[400px] sm:h-[440px] rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] shadow-subtle hover:border-[#0071E3]/50 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 block"
          >
            {/* Top Pill */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#E5E7EB] text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F] shadow-xs">
                Apparel
              </span>
              <span className="text-xs font-medium text-[#86868B] bg-black/5 px-2.5 py-1 rounded-full">
                40+ Styles
              </span>
            </div>

            {/* Centered Image with smooth scale on hover */}
            <div className="relative w-full h-56 sm:h-64 my-auto rounded-lg overflow-hidden">
              <Image
                src="/images/categories/category-apparel-card.webp"
                alt="Apparel Collection at iNESTYL OUTLET"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="flex items-end justify-between z-10 pt-4 border-t border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  Apparel
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] font-normal mt-1">
                  T-Shirts • Denim • Jackets • Hoodies
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0071E3] group-hover:underline">
                Explore Apparel
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

