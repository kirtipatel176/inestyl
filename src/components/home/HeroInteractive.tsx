"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSlide {
  id: number;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  imageAlt: string;
  tag: string;
  accent: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "MULTI-BRAND OUTLET • KAPADWANJ",
    titleLine1: "Premium Footwear",
    titleLine2: "& Apparel Outlet",
    description: "Original Brands. Handpicked Styles. Better Value. Curated authentic drops from Nike, Puma, adidas, and Levi's.",
    primaryCtaText: "Explore Collection",
    primaryCtaLink: "/footwear",
    secondaryCtaText: "Explore Brands",
    secondaryCtaLink: "/brands",
    image: "/images/hero/hero-lifestyle-composite.jpg",
    imageAlt: "Premium Sneaker & Apparel Curation at iNESTYL OUTLET",
    tag: "100% Original Stock",
    accent: "#0071E3",
  },
  {
    id: 2,
    eyebrow: "AUTHENTIC STREETWEAR & DENIM",
    titleLine1: "Classic Denim &",
    titleLine2: "Luxury Outerwear",
    description: "Iconic Levi's 501, DIESEL Italian denim, and U.S. Polo Assn. classic pique polos at verified outlet prices.",
    primaryCtaText: "Shop Apparel",
    primaryCtaLink: "/apparel",
    secondaryCtaText: "Store Location",
    secondaryCtaLink: "/contact",
    image: "/images/hero/hero-sneaker-apparel.jpg",
    imageAlt: "Authentic Designer Denim & Apparel Collection",
    tag: "Outlet Pricing Up to 36% Off",
    accent: "#0071E3",
  },
  {
    id: 3,
    eyebrow: "HIGH-PERFORMANCE VAULT",
    titleLine1: "Running & Lifestyle",
    titleLine2: "Sneaker Drops",
    description: "From Nike Air Max 270 to adidas Ultraboost Light and HOKA Clifton 9. Experience maximum comfort and street cred.",
    primaryCtaText: "Discover Sneakers",
    primaryCtaLink: "/footwear",
    secondaryCtaText: "New Arrivals",
    secondaryCtaLink: "/new-arrivals",
    image: "/images/hero/hero-offer-banner.jpg",
    imageAlt: "High-Performance Running and Street Sneaker Collection",
    tag: "Live Store Inventory",
    accent: "#0071E3",
  },
];

export function HeroInteractive() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Collections Carousel"
    >
      <div className="container-luxury">
        <div className="relative rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-10 lg:p-14 shadow-subtle overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071E3]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neutral-200/30 rounded-full blur-2xl pointer-events-none" />

          {/* Top Info Bar inside Hero Card */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 mb-2 border-b border-[#E5E7EB] text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="font-semibold text-[#1D1D1F] tracking-normal">
                Live Store Inventory
              </span>
              <span className="text-[#86868B]">•</span>
              <span className="text-[#6E6E73] hidden sm:inline flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#0071E3] inline" /> Kapadwanj, Gujarat
              </span>
            </div>

            {/* Slide Counter */}
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-[#86868B]">
              <span className="text-[#1D1D1F]">0{currentSlide + 1}</span>
              <span>/</span>
              <span>0{HERO_SLIDES.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Column with Framer Motion AnimatePresence */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  {/* Eyebrow Pill */}
                  <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] text-[#0071E3] shadow-xs">
                    {slide.eyebrow}
                  </span>

                  {/* Main Headline */}
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#1D1D1F] leading-[1.08]">
                    {slide.titleLine1} <br />
                    <span className="text-[#1D1D1F]">{slide.titleLine2}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-[#6E6E73] font-normal leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Action CTAs - Apple Button Primaries & Secondaries */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link
                      href={slide.primaryCtaLink}
                      className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 sm:px-7 rounded-full bg-[#0071E3] text-white text-sm font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
                    >
                      <span>{slide.primaryCtaText}</span>
                    </Link>

                    <Link
                      href={slide.secondaryCtaLink}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 sm:px-7 rounded-full bg-transparent text-[#0071E3] border border-[#0071E3] text-sm font-normal tracking-normal hover:bg-[#0071E3]/5 hover:text-[#0066CC] transition-all active:scale-98"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation & Interactive Dots */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "w-7 bg-[#0071E3]"
                            : "w-2 bg-[#E5E7EB] hover:bg-[#86868B]"
                        }`}
                      >
                        {isActive && !isPaused && (
                          <motion.span
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6.5, ease: "linear" }}
                            className="absolute inset-0 bg-[#0066CC]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Left/Right Arrow Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all shadow-xs active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all shadow-xs active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Animated image crossfade + Floating luxury badge) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-lg overflow-hidden shadow-card border border-[#E5E7EB] bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Gradient Overlay at the base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Authenticity Badge */}
                <div className="absolute bottom-4 left-4 z-20 animate-float bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F] border border-[#E5E7EB] shadow-subtle flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>{slide.tag}</span>
                </div>

                {/* Slide indicator pill on top right */}
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium tracking-wide text-white border border-white/20">
                  Featured Curation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

