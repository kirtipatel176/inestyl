"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS_DATA } from "@/constants/mock-data";

interface BrandsDropdownProps {
  onClose: () => void;
}

export function BrandsDropdown({ onClose }: BrandsDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#FFFFFF] rounded-lg shadow-dropdown border border-[#E5E7EB] z-50 overflow-hidden p-6"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3]">
          Featured Brands Directory
        </span>
        <Link
          href="/brands"
          onClick={onClose}
          className="text-xs font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          <span>All Brands (7)</span>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {BRANDS_DATA.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            onClick={onClose}
            className="group flex flex-col items-center justify-center p-3.5 rounded-lg border border-[#E5E7EB] bg-[#F5F5F7] hover:bg-[#FFFFFF] hover:border-[#0071E3] hover:shadow-subtle transition-all text-center"
          >
            <div className="h-7 w-20 relative flex items-center justify-center mb-2">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={26}
                className="max-h-6 w-auto object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all"
              />
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              {brand.name}
            </span>
            <span className="text-[10px] text-[#86868B] font-normal mt-0.5">
              {brand.itemCount} Styles
            </span>
          </Link>
        ))}

        {/* View All Brands Card */}
        <Link
          href="/brands"
          onClick={onClose}
          className="group flex flex-col items-center justify-center p-3.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#0071E3] hover:bg-[#F5F5F7] transition-all text-center justify-center"
        >
          <span className="text-xs font-semibold text-[#0071E3] group-hover:underline">Explore All Brands</span>
          <span className="text-[10px] text-[#86868B] mt-0.5">100% Authentic</span>
        </Link>
      </div>
    </motion.div>
  );
}
