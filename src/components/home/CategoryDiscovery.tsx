"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryTile {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  tag: string;
}

const PRIMARY_CATEGORIES: CategoryTile[] = [
  {
    title: "Men's Footwear",
    subtitle: "Engineered running, court heritage & street silhouettes",
    href: "/footwear?gender=Men",
    image: "/images/categories/category-footwear.jpg",
    tag: "Originals",
  },
  {
    title: "Women's Footwear",
    subtitle: "Maximalist cushion, lifestyle runners & daily comfort",
    href: "/footwear?gender=Women",
    image: "/images/products/hoka-clifton-9.jpg",
    tag: "Curated",
  },
];

const COMPANION_CATEGORIES: CategoryTile[] = [
  {
    title: "Sports & Lifestyle",
    subtitle: "High-mileage road shoes and retro court icons",
    href: "/footwear?cat=Running",
    image: "/images/products/nike-air-max-270.jpg",
    tag: "Performance",
  },
  {
    title: "Clothing",
    subtitle: "Original denim, heavy truckers & archive outerwear",
    href: "/clothing",
    image: "/images/categories/category-apparel.jpg",
    tag: "Apparel",
  },
  {
    title: "Everyday Essentials",
    subtitle: "Combed cotton pique polos, fleece & relaxed tees",
    href: "/clothing?cat=Everyday",
    image: "/images/products/us-polo-classic-tee.jpg",
    tag: "Wardrobe",
  },
];

export function CategoryDiscovery() {
  return (
    <section className="container-luxury space-y-6">
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
            CURATED DISCOVERY
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Two Large Editorial Showcase Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PRIMARY_CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={cat.href}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] p-8 flex flex-col justify-between block hover:border-[#0071E3]/40 transition-colors shadow-subtle"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] bg-[#F5F5F7] px-3 py-1 rounded-full">
                  {cat.tag}
                </span>
                <span className="text-xs font-medium text-[#0071E3] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Centered Editorial Image */}
              <div className="relative w-full h-56 sm:h-64 my-auto">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Bottom Details */}
              <div className="z-10 pt-4 border-t border-[#E5E7EB]/80">
                <h3 className="font-heading text-2xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Three Sleek Editorial Discovery Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMPANION_CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={cat.href}
              className="group relative h-[320px] rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] p-6 flex flex-col justify-between block hover:border-[#0071E3]/40 transition-colors shadow-subtle"
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full">
                  {cat.tag}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#0071E3] group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative w-full h-36 my-auto">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="z-10 pt-3 border-t border-[#E5E7EB]/70">
                <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6E6E73] mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

