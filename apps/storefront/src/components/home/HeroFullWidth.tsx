import Link from "next/link";
import { BannerItem } from "@inestyle/shared-types";

interface HeroFullWidthProps {
  heroBanner?: BannerItem | null;
}

/**
 * Premium Cinematic Fashion Hero with Transparent Floating Navbar Support.
 *
 * Design Architecture:
 * - Full-bleed 16:9 cinematic campaign film background without watermark or controls.
 * - Dual modern web codecs (WebM VP9 + MP4 H.264 FastStart) with dropped audio track for zero-latency autoplay.
 * - Text placed in the upper region of the hero viewport.
 * - Center visual zone showcases the cinematic floating hoodie, jacket, and sneakers.
 * - Action buttons ("Explore Footwear →" and "Explore Apparel →") positioned at the bottom of the hero section.
 * - Exact approved editorial copy: "THE INESTYLE EDIT" / "Original Style. Exceptional Value."
 */
export function HeroFullWidth({ heroBanner }: HeroFullWidthProps) {
  // Respect CMS overrides if provided; fallback to exact approved editorial copy
  const headline = heroBanner?.title || null;
  const description =
    heroBanner?.subtitle ||
    "Discover contemporary footwear and apparel from the brands you love, carefully curated for everyday style.";

  return (
    <section
      className="relative w-full h-[100vh] min-h-[680px] max-h-[1080px] -mt-[48px] sm:-mt-[50px] overflow-hidden select-none bg-[#EFEFF1] flex flex-col justify-between items-center"
      aria-label="INESTYLE OUTLET Hero Campaign"
    >
      {/* 1. Full-Width Edge-to-Edge Campaign Film */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-campaign-poster.webp"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/videos/hero-campaign.webm" type="video/webm" />
          <source src="/videos/hero-campaign.mp4" type="video/mp4" />
        </video>

        {/* Subtle, restrained top gradient for navbar & header readability without fogging video */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
        {/* Subtle bottom gradient for CTA button grounding */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 
        2. Upper Region Text Group
        Positioned in the upper region of the hero above the floating product subjects.
      */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 pt-[15vh] sm:pt-[17vh] md:pt-[18vh] flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#6E6E73] select-none block mb-2 sm:mb-3">
          THE INESTYLE EDIT
        </span>

        {/* Main Headline (Large, bold, refined typography with tight leading) */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#1D1D1F] tracking-tight leading-[1.06] select-none max-w-3xl">
          {headline ? (
            <span>{headline}</span>
          ) : (
            <>
              <span className="block">Original Style.</span>
              <span className="block">Exceptional Value.</span>
            </>
          )}
        </h1>

        {/* Description (Smaller, lighter, medium contrast, max readable line width) */}
        <p className="text-xs sm:text-sm md:text-base lg:text-[17px] text-[#555558] font-normal leading-relaxed max-w-xl mx-auto mt-3 sm:mt-4 select-none">
          {description}
        </p>
      </div>

      {/* 
        3. Below / Bottom Region CTA Buttons
        Positioned at the bottom of the hero section for clean visual balance.
      */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 pb-10 sm:pb-12 md:pb-14 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <Link
            href="/shoes"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#1D1D1F] text-white text-xs sm:text-sm font-semibold tracking-normal hover:bg-black transition-all shadow-subtle hover:shadow-md active:scale-98 inline-flex items-center justify-center gap-1.5"
          >
            <span>Explore Footwear</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/clothing"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FFFFFF] text-[#1D1D1F] text-xs sm:text-sm font-semibold tracking-normal border border-[#E5E7EB] hover:border-[#1D1D1F] hover:bg-neutral-50 transition-all shadow-xs active:scale-98 inline-flex items-center justify-center gap-1.5"
          >
            <span>Explore Apparel</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
