"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getBlurDataUrl } from "@/lib/images";

const DESKTOP_HERO_SRC =
  "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/desktop/hero-lifestyle-composite";
const MOBILE_HERO_SRC =
  "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/mobile/hero-mobile";

export function HeroFullWidth() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] flex flex-col justify-end items-center overflow-hidden bg-[#0A0A0A] pb-12 sm:pb-16 md:pb-20"
      aria-label="INESTYLE OUTLET Campaign"
    >
      {/* 1. Full-Width Edge-to-Edge Campaign Photograph with Slow Ambient Zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1.02 }}
        animate={{
          opacity: 1,
          scale: shouldReduceMotion ? 1 : [1, 1.04],
        }}
        transition={{
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
          <Image
            src={DESKTOP_HERO_SRC}
            alt="INESTYLE OUTLET Campaign — Authentic Footwear and Apparel"
            fill
            priority
            quality={80}
            sizes="(max-width: 640px) 0vw, 100vw"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(DESKTOP_HERO_SRC)}
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Campaign Image (Visible only on mobile: < 640px) */}
        <div className="block sm:hidden relative w-full h-full">
          <Image
            src={MOBILE_HERO_SRC}
            alt="INESTYLE OUTLET Mobile Campaign — Authentic Footwear"
            fill
            loading="eager"
            quality={80}
            sizes="(max-width: 640px) 100vw, 0vw"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(MOBILE_HERO_SRC)}
            className="object-cover object-center"
          />
        </div>

        {/* Subtle, restrained gradient overlay for contrast focused on the bottom where text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />
      </motion.div>

      {/* 2. Hero Content Container — Refined luxury editorial style anchored at the bottom */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Subtle Eyebrow / Kicker */}
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/80 mb-2"
        >
          Flagship Outlet
        </motion.span>

        {/* Main Headline — Compact, elegant, luxury proportioned */}
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light text-white tracking-wide leading-tight drop-shadow-sm"
        >
          Original Brands. Outlet Prices.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto mt-2 sm:mt-2.5 leading-relaxed drop-shadow-sm"
        >
          Authentic footwear and apparel from leading global brands at our Kapadwanj flagship outlet.
        </motion.p>

        {/* Action Links — Refined luxury underlined links like Louis Vuitton */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center text-xs sm:text-sm font-medium text-white tracking-wide underline underline-offset-[7px] decoration-white/70 hover:decoration-white hover:text-white transition-all py-1"
          >
            <span>Explore Collection</span>
          </Link>

          <Link
            href="/store"
            className="group relative inline-flex items-center text-xs sm:text-sm font-medium text-white tracking-wide underline underline-offset-[7px] decoration-white/70 hover:decoration-white hover:text-white transition-all py-1"
          >
            <span>Visit Store</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
