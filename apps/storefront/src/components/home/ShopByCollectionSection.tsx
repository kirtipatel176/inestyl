"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CollectionItem } from "@inestyle/shared-types";

interface ShopByCollectionSectionProps {
  collections?: CollectionItem[];
}

export function ShopByCollectionSection({ collections = [] }: ShopByCollectionSectionProps) {
  // Use first 4 active collections from database
  const activeCollections = collections.slice(0, 4);

  if (activeCollections.length === 0) {
    return null;
  }

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
          Curated thematic edits for performance, lifestyle, and everyday wear.
        </p>
      </motion.div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {activeCollections.map((col, index) => {
          // Asymmetric colSpan layout: 7-5 then 5-7
          const colSpan = index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";

          return (
            <motion.div
              key={col.id || col.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${colSpan} h-[400px] sm:h-[460px]`}
            >
              <Link
                href={`/collections/${col.slug}`}
                className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#F5F5F7] shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {col.image && (
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Content Box */}
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                  {col.badge && (
                    <span className="inline-block self-start px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                      {col.badge}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    {col.title}
                  </h3>
                  {col.description && (
                    <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 max-w-md line-clamp-2">
                      {col.description}
                    </p>
                  )}
                  <span className="text-xs sm:text-sm text-white font-medium mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
