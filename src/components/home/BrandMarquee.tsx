"use client";

import Link from "next/link";
import Image from "next/image";
import { BRANDS_DATA } from "@/constants/mock-data";

export function BrandMarquee() {
  // Duplicate array 3 times for seamless infinite loop on ultra-wide screens
  const marqueeBrands = [...BRANDS_DATA, ...BRANDS_DATA, ...BRANDS_DATA];

  return (
    <section className="!mt-5 sm:!mt-6 py-4 border-y border-[#E5E7EB] bg-[#FFFFFF]/70 backdrop-blur-sm relative overflow-hidden">
      {/* Editorial Header Pill */}
      <div className="container-luxury mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#86868B]">
          Authorized Outlet Brands
        </span>
        <Link
          href="/brands"
          className="text-[11px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          View All Brands
        </Link>
      </div>

      {/* Marquee Wrapper with soft edge masks */}
      <div className="relative w-full overflow-hidden marquee-mask group">
        <div className="flex items-center gap-8 sm:gap-12 animate-marquee group-hover:[animation-play-state:paused] py-2 w-max">
          {marqueeBrands.map((brand, index) => (
            <Link
              key={`${brand.id}-${index}`}
              href={`/brands`}
              title={`${brand.name} — ${brand.itemCount} styles in stock`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] hover:border-[#0071E3] hover:bg-white hover:shadow-subtle transition-all duration-300 group/brand flex-shrink-0"
            >
              <div className="h-7 w-20 sm:w-24 relative flex items-center justify-center grayscale group-hover/brand:grayscale-0 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={30}
                  className="max-h-6 w-auto object-contain transition-transform duration-300 group-hover/brand:scale-105"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868B] group-hover/brand:text-[#0071E3] transition-colors border-l border-[#E5E7EB] pl-3">
                {brand.itemCount} Styles
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

