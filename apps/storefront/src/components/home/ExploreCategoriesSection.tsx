"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CategoryItem } from "@inestyle/shared-types";

interface ExploreCategoriesSectionProps {
  categories?: CategoryItem[];
}

interface CategoryPanel {
  title: string;
  href: string;
  image: string;
  alt: string;
}

const DEFAULT_CATEGORIES: CategoryPanel[] = [
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

export function ExploreCategoriesSection({ categories }: ExploreCategoriesSectionProps = {}) {
  // Use database categories if available, otherwise default department panels
  const panels: CategoryPanel[] = DEFAULT_CATEGORIES;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {panels.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={cat.href}
              className="group relative block aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Card Title & Subtle Callout */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {cat.title}
                </h3>
                <span className="text-xs sm:text-sm text-neutral-300 font-medium mt-1 flex items-center gap-1 group-hover:text-white group-hover:translate-x-1 transition-all">
                  Shop Department →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
