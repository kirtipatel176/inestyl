"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface OccasionCategory {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
}

const OCCASIONS: OccasionCategory[] = [
  {
    title: "Everyday Wear",
    description: "Versatile, breathable essentials engineered for daily comfort.",
    href: "/products?category=Casual",
    image: "/images/products/us-polo-classic-tee.jpg",
    alt: "Everyday wear casual outfit",
  },
  {
    title: "Running",
    description: "Maximal cushioning and responsive energy return for road and trail.",
    href: "/footwear",
    image: "/images/products/adidas-ultraboost.jpg",
    alt: "High-performance running shoes",
  },
  {
    title: "Gym & Training",
    description: "Stable support and lateral grip for high-intensity movement.",
    href: "/footwear",
    image: "/images/products/hoka-clifton-9.jpg",
    alt: "Gym and cross training footwear",
  },
  {
    title: "Casual Outings",
    description: "Relaxed silhouettes and elevated streetwear statements.",
    href: "/clothing",
    image: "/images/hero/hero-sneaker-apparel.jpg",
    alt: "Casual streetwear and sneakers",
  },
  {
    title: "Smart Casual",
    description: "Classic denim, crisp Oxford shirts, and heritage pique polos.",
    href: "/clothing",
    image: "/images/products/levis-501-original.jpg",
    alt: "Smart casual denim and shirts",
  },
  {
    title: "Weekend Style",
    description: "Off-duty comfort, warm fleece hoodies, and lifestyle runners.",
    href: "/products",
    image: "/images/products/nike-club-hoodie.jpg",
    alt: "Weekend relaxed style and hoodies",
  },
];

export function ShopByOccasionSection() {
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
          Shop by Occasion
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Footwear and apparel organized by activity and setting.
        </p>
      </motion.div>

      {/* Visually Engaging 6-Tile Occasion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OCCASIONS.map((occasion, index) => (
          <motion.div
            key={occasion.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={occasion.href}
              className="group relative block h-[360px] sm:h-[400px] rounded-xl overflow-hidden bg-[#1D1D1F] shadow-subtle hover:shadow-card transition-shadow duration-500"
            >
              {/* Image with Elegant Slow Zoom on Hover */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={occasion.image}
                  alt={occasion.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Tonal Gradient Overlay for High Contrast Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

              {/* Bottom Information */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end z-10 space-y-1.5">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  {occasion.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed line-clamp-2">
                  {occasion.description}
                </p>
                <div className="pt-2 text-xs sm:text-sm font-medium text-white/95 group-hover:text-white transition-colors duration-300">
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
