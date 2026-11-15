"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MEN_SUBCATEGORIES, getAvailableNavSubcategories, BRANDS_DATA } from "@/constants/mock-data";

interface MenMegaMenuProps {
  onClose: () => void;
}

export function MenMegaMenu({ onClose }: MenMegaMenuProps) {
  // Only display subcategories that actually contain products!
  const availableCategories = getAvailableNavSubcategories(MEN_SUBCATEGORIES, "Men");
  const menBrands = BRANDS_DATA.filter((b) => b.category === "both" || b.category === "apparel" || b.category === "footwear");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 w-full bg-[#FFFFFF] shadow-dropdown border-b border-[#E5E7EB] z-50 overflow-hidden"
    >
      <div className="container-luxury py-10">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* COLUMN 1 & 2: SUBCATEGORIES (Splits into 2 columns if many) */}
          <div className="col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3]">
                Men&apos;s Categories
              </span>
              <Link
                href="/men"
                onClick={onClose}
                className="text-xs font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
              >
                <span>View All Men&apos;s</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {availableCategories.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-1 text-sm text-[#1D1D1F] hover:text-[#0071E3] font-normal transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3: FEATURED BRANDS FOR MEN */}
          <div className="col-span-3 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block pb-2 border-b border-[#E5E7EB]">
              Top Brands for Men
            </span>
            <ul className="space-y-2.5">
              {menBrands.slice(0, 5).map((b) => (
                <li key={b.name}>
                  <Link
                    href={`/brands/${b.slug}?gender=Men`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors py-0.5"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{b.name}</span>
                    <span className="text-[10px] text-[#86868B]">{b.itemCount} items</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: EDITORIAL CAMPAIGN CALLOUT */}
          <div className="col-span-3">
            <Link
              href="/men"
              onClick={onClose}
              className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <Image
                src="/images/hero/hero-lifestyle-composite.webp"
                alt="Men's Collection Campaign"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1200px) 33vw, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2997FF] mb-1">
                  Men&apos;s Collection
                </span>
                <h4 className="font-heading text-lg font-semibold leading-tight text-white mb-2">
                  Footwear &amp; Apparel
                </h4>
                <span className="inline-flex items-center text-xs font-semibold text-white group-hover:text-[#2997FF] transition-colors">
                  <span>Explore Men&apos;s Store</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
