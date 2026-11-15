"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SHOES_SUBCATEGORIES, getAvailableNavSubcategories, BRANDS_DATA } from "@/constants/mock-data";

interface FootwearMegaMenuProps {
  onClose: () => void;
}

export function FootwearMegaMenu({ onClose }: FootwearMegaMenuProps) {
  // Only display categories that actually contain products
  const availableShoes = getAvailableNavSubcategories(SHOES_SUBCATEGORIES, undefined, "footwear");
  const footwearBrands = BRANDS_DATA.filter((b) => b.category === "footwear" || b.category === "both");

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
          {/* COLUMN 1: SHOES SUBCATEGORIES */}
          <div className="col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3]">
                Shoes By Type
              </span>
              <Link
                href="/shoes"
                onClick={onClose}
                className="text-xs font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
              >
                <span>All Shoes</span>
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {availableShoes.map((item) => (
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

          {/* COLUMN 2: TOP FOOTWEAR BRANDS */}
          <div className="col-span-4 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block pb-2 border-b border-[#E5E7EB]">
              Footwear Brands
            </span>
            <ul className="space-y-3">
              {footwearBrands.map((b) => (
                <li key={b.name}>
                  <Link
                    href={`/brands/${b.slug}?type=footwear`}
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
              href="/shoes/sneakers"
              onClick={onClose}
              className="group block relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <Image
                src="/images/hero/hero-sneaker-apparel.webp"
                alt="Sneakers & Performance Shoes"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1200px) 33vw, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2997FF] mb-1">
                  Sneakerhead Edit
                </span>
                <h4 className="font-heading text-lg font-semibold leading-tight text-white mb-2">
                  Nike, adidas &amp; HOKA Performance
                </h4>
                <span className="inline-flex items-center text-xs font-semibold text-white group-hover:text-[#2997FF] transition-colors">
                  <span>Explore Sneakers</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
