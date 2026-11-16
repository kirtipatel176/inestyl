"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CollectionPanel {
  title: string;
  supportingLine: string;
  href: string;
  image: string;
  alt: string;
  colSpan: string; // for asymmetric editorial grid
  heightClass: string;
}

const COLLECTIONS: CollectionPanel[] = [
  {
    title: "New Arrivals",
    supportingLine: "The latest authentic drops, freshly added to our store inventory.",
    href: "/collections/new-arrivals",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/campaigns/new-arrivals-banner",
    alt: "New arrivals sneaker and apparel drops",
    colSpan: "lg:col-span-7",
    heightClass: "h-[420px] sm:h-[480px]",
  },
  {
    title: "Running Collection",
    supportingLine: "High-cushion road runners, trail grip shoes and endurance trainers.",
    href: "/collections/running-collection",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/campaigns/hero-offer-banner",
    alt: "Best of footwear collection",
    colSpan: "lg:col-span-5",
    heightClass: "h-[420px] sm:h-[480px]",
  },
  {
    title: "Everyday Essentials",
    supportingLine: "Combed cotton pique polos, archive tees and relaxed fleece.",
    href: "/collections/everyday-essentials",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
    alt: "Everyday wardrobe essentials",
    colSpan: "lg:col-span-5",
    heightClass: "h-[420px] sm:h-[480px]",
  },
  {
    title: "Sports & Performance",
    supportingLine: "Engineered performance gear built for speed, comfort and daily movement.",
    href: "/collections/sports-performance",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/desktop/hero-main",
    alt: "Sports and lifestyle performance collection",
    colSpan: "lg:col-span-7",
    heightClass: "h-[420px] sm:h-[480px]",
  },
];

export function ShopByCollectionSection() {
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
          Shop by Collection
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Curated selections across footwear and clothing.
        </p>
        <div className="pt-2">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] hover:underline"
          >
            <span>View All 11 Curated Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {COLLECTIONS.map((col, index) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={col.colSpan}
          >
            <Link
              href={col.href}
              className={`group relative block ${col.heightClass} rounded-xl overflow-hidden bg-[#1D1D1F] shadow-subtle hover:shadow-card transition-shadow duration-500`}
            >
              {/* Campaign Lifestyle Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Bottom Editorial Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end z-10 space-y-2.5">
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {col.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-200/90 font-normal max-w-md leading-relaxed">
                  {col.supportingLine}
                </p>
                <div className="pt-1 text-sm font-medium text-white/95 group-hover:text-white transition-colors duration-300">
                  <span>Explore Collection</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
