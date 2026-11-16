"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryPanel {
  title: string;
  href: string;
  image: string;
  alt: string;
}

const CATEGORIES: CategoryPanel[] = [
  {
    title: "Men's Collection",
    href: "/men",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
    alt: "Men's authentic footwear and clothing collection",
  },
  {
    title: "Women's Collection",
    href: "/women",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/campaigns/new-arrivals-banner",
    alt: "Women's curated footwear and fashion collection",
  },
  {
    title: "Footwear",
    href: "/footwear",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/footwear/category-footwear-card",
    alt: "International brand footwear and sneakers",
  },
  {
    title: "Clothing",
    href: "/clothing",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/clothing/category-apparel-card",
    alt: "Authentic denim, jackets, and everyday apparel",
  },
];

export function ExploreCategoriesSection() {
  return (
    <section className="container-luxury space-y-8 sm:space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
          Explore Categories
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Browse our core departments across footwear and apparel.
        </p>
      </motion.div>

      {/* Balanced Editorial Grid: 4 Large Image-Led Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={category.href}
              className="group relative block h-[420px] sm:h-[480px] lg:h-[520px] rounded-xl overflow-hidden bg-[#1D1D1F] shadow-subtle hover:shadow-card transition-shadow duration-500"
            >
              {/* Lifestyle Image with Subtle Slow Zoom on Hover */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Gradient Overlay for Apple-level Typography Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end z-10 space-y-2">
                <h3 className="font-heading text-2xl sm:text-[1.75rem] font-semibold text-white tracking-tight leading-tight">
                  {category.title}
                </h3>

                <div className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                  <span>Explore</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
