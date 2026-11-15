"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BLUR_PLACEHOLDERS } from "@/lib/images";

export function HeroFullWidth() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full h-[88vh] min-h-[640px] max-h-[960px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
      aria-label="INESTYLE OUTLET Campaign"
    >
      {/* 1. Full-Width Edge-to-Edge Campaign Photograph with Slow Ambient Zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
        animate={{
          opacity: 1,
          scale: shouldReduceMotion ? 1 : [1, 1.04],
        }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: {
            duration: 16,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      >
        {/* Desktop Campaign Image (Visible from sm breakpoint upwards: >= 640px) */}
        <div className="hidden sm:block relative w-full h-full">
          <picture className="relative w-full h-full block">
            <source
              type="image/avif"
              srcSet="/images/hero/desktop/hero-lifestyle-composite.avif"
            />
            <source
              type="image/webp"
              srcSet="/images/hero/desktop/hero-lifestyle-composite.webp"
            />
            <Image
              src="/images/hero/desktop/hero-lifestyle-composite.webp"
              alt="INESTYLE OUTLET Campaign — Authentic Footwear and Apparel"
              fill
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS["/images/hero/desktop/hero-lifestyle-composite.webp"]}
              className="object-cover object-center"
            />
          </picture>
        </div>

        {/* Mobile Campaign Image (Visible only on mobile: < 640px) */}
        <div className="block sm:hidden relative w-full h-full">
          <picture className="relative w-full h-full block">
            <source
              type="image/avif"
              srcSet="/images/hero/mobile/hero-mobile.avif"
            />
            <source
              type="image/webp"
              srcSet="/images/hero/mobile/hero-mobile.webp"
            />
            <Image
              src="/images/hero/hero-mobile.jpg"
              alt="INESTYLE OUTLET Mobile Campaign — Authentic Footwear"
              fill
              priority
              quality={90}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS["/images/hero/hero-mobile.jpg"]}
              className="object-cover object-center"
            />
          </picture>
        </div>

        {/* Subtle, restrained gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 sm:from-black/80 sm:via-black/35 sm:to-black/30 pointer-events-none" />
      </motion.div>

      {/* 2. Hero Content Container — Pure, Uncluttered, Apple-Inspired */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.04]"
        >
          Original Brands. Outlet Prices.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl md:text-2xl text-neutral-200 font-normal max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed"
        >
          Authentic footwear and apparel from leading global brands at our Kapadwanj flagship outlet.
        </motion.p>

        {/* Primary & Secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/products"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-full bg-[#0071E3] text-white text-sm sm:text-base font-medium tracking-normal hover:bg-[#0066CC] transition-colors shadow-subtle active:scale-98"
          >
            <span>Explore Collection</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/store"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-full bg-white text-[#1D1D1F] text-sm sm:text-base font-medium tracking-normal hover:bg-neutral-100 transition-colors active:scale-98"
          >
            <span>Visit Store</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
