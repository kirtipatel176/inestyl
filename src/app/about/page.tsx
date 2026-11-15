import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Tag, Store, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container-luxury py-8 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">About Us</span>
      </nav>

      {/* 2. Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          OUR STORY &amp; MISSION
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight leading-[1.15]">
          About iNESTYL OUTLET
        </h1>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal leading-relaxed">
          A multi-brand footwear and apparel outlet, bringing you original styles from leading global brands at better value.
        </p>
      </div>

      {/* 3. Editorial Store Photography Grid (Matching Reference Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle border border-[#E5E7EB] group">
          <Image
            src="/images/store/store-interior-1.webp"
            alt="iNESTYL OUTLET Sneaker Display Wall"
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-104 transition-transform duration-500"
          />
          <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
            Sneaker Gallery
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle border border-[#E5E7EB] group">
          <Image
            src="/images/store/store-interior-2.webp"
            alt="iNESTYL OUTLET Premium Apparel Curation"
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-104 transition-transform duration-500"
          />
          <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
            Apparel Racks
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle border border-[#E5E7EB] group">
          <Image
            src="/images/store/store-interior-3.webp"
            alt="iNESTYL OUTLET Flagship Boutique Kapadwanj"
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-104 transition-transform duration-500"
          />
          <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
            Flagship Boutique
          </div>
        </div>
      </div>

      {/* 4. Brand Philosophy & Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#E5E7EB]">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] block">
            UNCOMPROMISING AUTHENTICITY
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] leading-tight">
            Original Brands. Genuine Outlet Pricing. Personal Hospitality.
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            At iNESTYL OUTLET, we believe that luxury athletic footwear and iconic fashion staples should not come with grey-market doubts or excessive markups. Every pair of sneakers and piece of denim in our Kapadwanj store is sourced directly through certified distributor networks.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#0071E3]" />
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">100% Verified Original</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              We maintain a zero-tolerance policy for replicas or counterfeits. All products come with authentic brand tags and packaging.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-2">
            <Tag className="w-6 h-6 text-[#0071E3]" />
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">Attractive Outlet Value</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Transparent side-by-side pricing displaying official MRP alongside our discounted iNESTYL outlet price.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-2">
            <Store className="w-6 h-6 text-[#0071E3]" />
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">Flagship Destination</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Located in Kapadwanj, Gujarat. Customers can visit our boutique, try on different sizes, and inspect materials in person.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-2">
            <MapPin className="w-6 h-6 text-[#25D366]" />
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">Direct WhatsApp Service</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              No impersonal shopping carts. Connect directly with our store specialists on WhatsApp to verify size and hold items.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Visit Store Callout */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#1D1D1F] border border-[#2D2D2F] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2997FF] block mb-1">
            EXPERIENCE IN PERSON
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
            Visit Our Kapadwanj Flagship Outlet
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
            Station Road, Kapadwanj, Gujarat 387620 • Open Mon - Sun: 10:00 AM - 9:00 PM
          </p>
        </div>
        <Link
          href="/contact"
          className="min-h-[44px] px-8 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle flex-shrink-0 flex items-center justify-center"
        >
          Get Store Directions
        </Link>
      </div>
    </div>
  );
}
