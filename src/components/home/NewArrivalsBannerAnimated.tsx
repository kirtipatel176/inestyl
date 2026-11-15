"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function NewArrivalsBannerAnimated() {
  return (
    <section className="container-luxury">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-[#1D1D1F] text-white overflow-hidden shadow-card border border-[#2D2D2F] group"
      >
        {/* Subtle Ambient Blue Glow in background */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0071E3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center relative z-10">
          {/* Sneaker Macro Crop on Left */}
          <div className="md:col-span-5 relative h-72 md:h-96 w-full overflow-hidden">
            <Image
              src="/images/hero/new-arrivals-banner.webp"
              alt="New Arrivals Sneaker Drops at iNESTYL OUTLET"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1D1D1F]/40 to-[#1D1D1F] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-transparent to-transparent md:hidden" />
          </div>

          {/* Banner Text on Right */}
          <div className="md:col-span-7 p-8 sm:p-12 lg:p-14 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#2997FF] block">
              New Drops This Week
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              New Arrivals Collection
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
              Fresh sizes just catalogued in Nike Air Max, adidas Boost running shoes, and Levi&apos;s raw denim. Discover authentic pieces before they sell out in-store.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/new-arrivals"
                className="inline-flex items-center min-h-[44px] px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
              >
                Explore New Arrivals
              </Link>

              <Link
                href="/footwear"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-normal hover:border-white transition-colors"
              >
                <span>Browse Footwear</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

