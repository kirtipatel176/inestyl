"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NewArrivalsDropdownProps {
  onClose: () => void;
}

export function NewArrivalsDropdown({ onClose }: NewArrivalsDropdownProps) {
  const links = [
    {
      title: "Latest Footwear",
      subtitle: "New silhouettes in Nike, adidas, and HOKA",
      href: "/new-arrivals?cat=footwear",
    },
    {
      title: "Latest Apparel",
      subtitle: "Authentic Levi's denim and DIESEL jackets",
      href: "/new-arrivals?cat=apparel",
    },
    {
      title: "Recently Added",
      subtitle: "Browse the latest store stock arrivals",
      href: "/new-arrivals",
    },
    {
      title: "Trending Products",
      subtitle: "Most enquired styles this week",
      href: "/footwear?sort=trending",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-[#FFFFFF] rounded-lg shadow-dropdown border border-[#E5E7EB] z-50 overflow-hidden p-6"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3]">
            New Arrivals
          </span>
        </div>
        <Link
          href="/new-arrivals"
          onClick={onClose}
          className="text-xs font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          <span>View All Drops</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {links.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onClose}
            className="group p-4 rounded-lg border border-[#E5E7EB] bg-[#F5F5F7] hover:bg-[#FFFFFF] hover:border-[#0071E3] hover:shadow-subtle transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  {item.title}
                </span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                {item.subtitle}
              </p>
            </div>
            <div className="pt-3 text-xs font-medium text-[#0071E3]">
              <span>Discover</span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
