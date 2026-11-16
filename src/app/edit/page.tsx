import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The INESTYLE Edit — Curated Footwear & Fashion Stories | INESTYL OUTLET",
  description:
    "Explore The INESTYLE Edit: our editorial perspective on sneaker culture, authentic craftsmanship, and wardrobe essentials.",
};

export default function TheEditPage() {
  return (
    <div className="container-luxury py-8 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">The INESTYLE Edit</span>
      </nav>

      {/* 2. Hero Editorial Showcase */}
      <div className="space-y-4 max-w-4xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          EDITORIAL ARCHIVE
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1F] tracking-tight leading-[1.1]">
          The INESTYLE Edit
        </h1>
        <p className="text-base sm:text-xl text-[#6E6E73] font-normal leading-relaxed">
          Editorial perspectives on footwear craftsmanship, denim heritage, and retail culture at our Kapadwanj flagship outlet.
        </p>
      </div>

      {/* 3. Hero Feature Photograph (Large Editorial Image) */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-subtle group">
        <Image
          src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/desktop/hero-lifestyle-composite"
          alt="The INESTYLE Edit — Visual Editorial Curation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-12">
          <div className="text-white space-y-2 max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2997FF]">
              Autumn / Winter Editorial
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              The Intersection of Utility &amp; Street Heritage
            </h2>
          </div>
        </div>
      </div>

      {/* 4. Three Editorial Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <article className="space-y-4 group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF]">
            <Image
              src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/footwear/category-footwear-card"
              alt="Footwear Engineering Story"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] block">
            CULTURE &amp; CUSHIONING
          </span>
          <h3 className="font-heading text-xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
            From Hardwood to High Mileage
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            How basketball retro icons and maximalist trail midsoles evolved into everyday style staples.
          </p>
          <Link
            href="/footwear"
            className="text-xs font-semibold text-[#0071E3] hover:underline inline-block"
          >
            Explore Footwear
          </Link>
        </article>

        <article className="space-y-4 group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF]">
            <Image
              src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/categories/clothing/category-apparel-card"
              alt="Denim & Outerwear Curation"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] block">
            ENDURING FABRICS
          </span>
          <h3 className="font-heading text-xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
            The Longevity of Rigid Denim
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Why genuine heavyweight cotton denim only gets better with wear, breaking in naturally to each wearer.
          </p>
          <Link
            href="/clothing"
            className="text-xs font-semibold text-[#0071E3] hover:underline inline-block"
          >
            Explore Clothing
          </Link>
        </article>

        <article className="space-y-4 group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF]">
            <Image
              src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/store/store-interior-1"
              alt="The In-Person Touch"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] block">
            HOSPITALITY
          </span>
          <h3 className="font-heading text-xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
            The Dignity of the Physical Store
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            In an era of anonymous click-to-buy algorithms, touching materials and verifying your fit in person is true luxury.
          </p>
          <Link
            href="/store"
            className="text-xs font-semibold text-[#0071E3] hover:underline inline-block"
          >
            Visit Our Store
          </Link>
        </article>
      </div>
    </div>
  );
}

