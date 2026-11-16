"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BrandShowcaseItem {
  name: string;
  slug: string;
  logo: string;
}

const BRANDS: BrandShowcaseItem[] = [
  {
    name: "Nike",
    slug: "nike",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/nike.svg",
  },
  {
    name: "Adidas",
    slug: "adidas",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/adidas.svg",
  },
  {
    name: "Puma",
    slug: "puma",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/puma.svg",
  },
  {
    name: "HOKA",
    slug: "hoka",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/hoka.svg",
  },
  {
    name: "Levi's",
    slug: "levis",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/levis.svg",
  },
  {
    name: "Diesel",
    slug: "diesel",
    logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/diesel.svg",
  },
];

export function DiscoverBrandsSection() {
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
          Discover Brands
        </h2>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal">
          Authentic footwear and apparel brands available at our Kapadwanj store.
        </p>
      </motion.div>

      {/* Spacious Restrained Brand Showcase Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {BRANDS.map((brand, index) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/brands/${brand.slug}`}
              className="group h-32 sm:h-36 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#1D1D1F] hover:shadow-subtle block"
              title={`View ${brand.name} Collection`}
            >
              <div className="relative w-full h-10 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} official logo`}
                  width={96}
                  height={32}
                  className="max-h-8 max-w-[100px] w-auto h-auto object-contain opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-medium text-[#86868B] group-hover:text-[#0071E3] transition-colors mt-2">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
