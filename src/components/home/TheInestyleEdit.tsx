"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function TheInestyleEdit() {
  return (
    <section className="container-luxury py-6">
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Asymmetric Image Showcase (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative h-[360px] sm:h-[480px] w-full bg-[#F5F5F7] overflow-hidden"
          >
            <Image
              src="/images/hero/desktop/hero-lifestyle-composite.webp"
              alt="The INESTYLE Edit — Curated Footwear and Apparel"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center hover:scale-103 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Gradient Inset */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </motion.div>

          {/* Editorial Content Column (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3] block">
                THE INESTYLE EDIT
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.12]">
                Original Brands. Outlet Prices.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6E6E73] font-normal leading-relaxed">
              Explore authentic footwear and apparel from leading global sportswear and fashion houses at our Kapadwanj flagship outlet.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0071E3] text-white text-sm font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
              >
                About Our Store
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

