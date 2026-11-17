"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BrandsDropdownProps {
  onClose: () => void;
}

const AUTHORIZED_BRANDS = [
  { id: "nike", name: "Nike", slug: "nike", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/nike.svg" },
  { id: "puma", name: "Puma", slug: "puma", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/puma.svg" },
  { id: "adidas", name: "adidas", slug: "adidas", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/adidas.svg" },
  { id: "hoka", name: "HOKA", slug: "hoka", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/hoka.svg" },
  { id: "levis", name: "Levi's", slug: "levis", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/levis.svg" },
  { id: "diesel", name: "DIESEL", slug: "diesel", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/diesel.svg" },
  { id: "us-polo-assn", name: "U.S. Polo Assn.", slug: "us-polo-assn", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/us-polo-assn.svg" },
];

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
          <span>All Brands ({AUTHORIZED_BRANDS.length})</span>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {AUTHORIZED_BRANDS.map((brand) => (
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
            <span className="text-[10px] text-[#86868B] mt-0.5">
              Verified Stock
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
