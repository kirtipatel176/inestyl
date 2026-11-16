"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CLOTHING_SUBCATEGORIES, getAvailableNavSubcategories, BRANDS_DATA } from "@/constants/mock-data";

interface ApparelMegaMenuProps {
  onClose: () => void;
}

export function ApparelMegaMenu({ onClose }: ApparelMegaMenuProps) {
  // Only display subcategories that actually contain products
  const availableClothing = getAvailableNavSubcategories(CLOTHING_SUBCATEGORIES, undefined, "clothing");
  const apparelBrands = BRANDS_DATA.filter((b) => b.category === "apparel" || b.category === "both");

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
          {/* COLUMN 1: CLOTHING SUBCATEGORIES */}
          <div className="col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3]">
                Clothing Categories
              </span>
              <Link
                href="/clothing"
                onClick={onClose}
                className="text-xs font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
              >
                <span>All Clothing</span>
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {availableClothing.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#1D1D1F] hover:text-[#0071E3] font-normal transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: TOP APPAREL BRANDS */}
          <div className="col-span-3 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block pb-2 border-b border-[#E5E7EB]">
              Denim &amp; Apparel Brands
            </span>
            <ul className="space-y-3">
              {apparelBrands.map((b) => (
                <li key={b.name}>
                  <Link
                    href={`/brands/${b.slug}?type=clothing`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm text-[#1D1D1F] hover:text-[#0071E3] font-normal transition-colors pr-4"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{b.name}</span>
                    {b.logo && (
                      <div className="h-4 w-7 relative opacity-50 group-hover:opacity-100 transition-opacity">
                        <Image
                          src={b.logo}
                          alt={b.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: EDITORIAL CAMPAIGN CALLOUT */}
          <div className="col-span-4">
            <Link
              href="/clothing"
              onClick={onClose}
              className="group block relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <Image
                src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/clothing/category-apparel-card"
                alt="Original Denim & Apparel"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1200px) 33vw, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2997FF] mb-1">
                  Denim &amp; Streetwear
                </span>
                <h4 className="font-heading text-lg font-semibold leading-tight text-white mb-2">
                  Levi&apos;s 501, DIESEL &amp; Nike Club
                </h4>
                <span className="inline-flex items-center text-xs font-semibold text-white group-hover:text-[#2997FF] transition-colors">
                  <span>Explore Clothing</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
