import Link from "next/link";
import Image from "next/image";
import { getBlurDataUrl } from "@/lib/images";
import { BannerItem } from "@inestyle/shared-types";

interface HeroFullWidthProps {
  heroBanner?: BannerItem | null;
}

// Pre-optimized Cloudinary edge CDN endpoints with auto-format (AVIF/WebP) and adaptive quality
const DEFAULT_DESKTOP_HERO_SRC =
  "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto,c_fill,w_1600,h_900/inestyle-outlet/homepage/desktop/hero-lifestyle-composite";
const DEFAULT_MOBILE_HERO_SRC =
  "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto,c_fill,w_750,h_1000/inestyle-outlet/homepage/mobile/hero-mobile";

/**
 * High-performance Full-Width Hero Section.
 * Designed for sub-200ms Largest Contentful Paint (LCP):
 * - Direct Cloudinary edge delivery bypasses serverless image proxy latency.
 * - Hardware-accelerated CSS animations replace runtime JS animation loops.
 * - Server-rendered text renders with instant visibility (0ms FCP/LCP text availability).
 * - Priority preloading headers trigger browser image prefetching on first HTML chunk.
 */
export function HeroFullWidth({ heroBanner }: HeroFullWidthProps) {
  const desktopSrc = heroBanner?.imageUrl || DEFAULT_DESKTOP_HERO_SRC;
  const mobileSrc = heroBanner?.imageUrl || DEFAULT_MOBILE_HERO_SRC;
  const title = heroBanner?.title || "Original Brands. Outlet Prices.";
  const subtitle =
    heroBanner?.subtitle ||
    "Authorized original footwear and apparel curated from world-leading sportswear houses. Certified authentic inventory at Kapadwanj flagship store.";
  const ctaLink = heroBanner?.linkUrl || "/shoes";
  const ctaLabel = heroBanner?.ctaLabel || "Explore Collection";

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] flex flex-col justify-end items-center overflow-hidden bg-[#0A0A0A] pb-12 sm:pb-16 md:pb-20"
      aria-label="INESTYLE OUTLET Campaign"
    >
      {/* 1. Full-Width Edge-to-Edge Campaign Photograph with CSS Ambient Zoom */}
      <div className="absolute inset-0 w-full h-full hero-ambient-zoom">
        {/* Desktop Campaign Image */}
        <div className="hidden sm:block relative w-full h-full">
          <Image
            src={desktopSrc}
            alt="INESTYLE OUTLET Campaign — Authentic Footwear and Apparel"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 0vw, 100vw"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(desktopSrc)}
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Campaign Image */}
        <div className="block sm:hidden relative w-full h-full">
          <Image
            src={mobileSrc}
            alt="INESTYLE OUTLET Mobile Campaign — Authentic Footwear"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 100vw, 0vw"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(mobileSrc)}
            className="object-cover object-center"
          />
        </div>

        {/* Subtle, restrained gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />
      </div>

      {/* 2. Hero Content Container (Instant CSS Paint, no JS hydration blocking) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Subtle Eyebrow / Kicker */}
        <span className="hero-content-fade text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/80 mb-2">
          Flagship Outlet
        </span>

        {/* Main Headline */}
        <h1 className="hero-content-fade-delay-1 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light text-white tracking-wide leading-tight drop-shadow-sm">
          {title}
        </h1>

        {/* Supporting Text */}
        <p className="hero-content-fade-delay-2 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto mt-2 sm:mt-2.5 leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>

        {/* Two Balanced CTAs */}
        <div className="hero-content-fade-delay-3 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href={ctaLink}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-medium tracking-wide hover:bg-neutral-100 transition-all duration-200 text-center shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/clothing"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-black/40 text-white text-xs sm:text-sm font-medium tracking-wide border border-white/20 hover:bg-black/60 hover:border-white/40 transition-all duration-200 text-center backdrop-blur-sm active:scale-[0.98]"
          >
            Explore Apparel
          </Link>
        </div>
      </div>
    </section>
  );
}
