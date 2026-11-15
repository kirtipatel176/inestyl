"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryPanel {
  title: string;
  tagline: string;
  href: string;
  image: string;
  imageAlt: string;
}

const CATEGORIES: CategoryPanel[] = [
  {
    title: "Men's Collection",
    tagline: "Tailored denim, running innovations & court icons",
    href: "/men",
    image: "/images/categories/category-footwear.jpg",
    imageAlt: "Men's Footwear & Apparel Collection at INESTYL OUTLET",
  },
  {
    title: "Women's Collection",
    tagline: "Maximalist cushion runners, straight denim & casual tees",
    href: "/women",
    image: "/images/products/hoka-clifton-9.jpg",
    imageAlt: "Women's Footwear & Apparel Collection at INESTYL OUTLET",
  },
  {
    title: "Footwear",
    tagline: "Nike Air Max, adidas Boost, Puma RS & HOKA runners",
    href: "/footwear",
    image: "/images/products/nike-air-max-270.jpg",
    imageAlt: "Authentic Multi-Brand Footwear Collection",
  },
  {
    title: "Clothing",
    tagline: "Levi's original 501, DIESEL Italian denim & cotton polos",
    href: "/clothing",
    image: "/images/categories/category-apparel.jpg",
    imageAlt: "Original Multi-Brand Apparel & Denim Collection",
  },
];

export function ExploreCategories() {
  return (
    <section className="container-luxury space-y-8">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            CATEGORY DISCOVERY
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
            Explore Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
            Find your style. Make it yours.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>View All Departments</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Four Large Image-Led Category Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={cat.href}
              className="group relative h-[420px] rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] p-6 flex flex-col justify-between block hover:border-[#0071E3]/50 transition-colors shadow-subtle"
            >
              {/* Top Meta Indicator */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-full">
                  Original
                </span>
                <span className="text-xs font-medium text-[#0071E3] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Centered Image Showcase */}
              <div className="relative w-full h-56 my-auto">
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Bottom Details */}
              <div className="z-10 pt-4 border-t border-[#E5E7EB]/80">
                <h3 className="font-heading text-xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

