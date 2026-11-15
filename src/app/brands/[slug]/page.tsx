import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Tag, MapPin } from "lucide-react";
import { BRANDS_DATA, PRODUCTS_DATA } from "@/constants/mock-data";
import { BrandListingClient } from "@/components/products/BrandListingClient";
import { STORE_DETAILS } from "@/constants";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANDS_DATA.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand Not Found — iNESTYL OUTLET" };

  return {
    title: `${brand.name} at iNESTYL OUTLET — Verified Authentic Original Inventory`,
    description: `Discover 100% original ${brand.name} footwear and apparel at outlet prices in Kapadwanj, Gujarat. Browse current stock and enquire directly on WhatsApp.`,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = BRANDS_DATA.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  // Filter products for this specific brand
  const brandProducts = PRODUCTS_DATA.filter(
    (p) => p.brandSlug === brand.slug || p.brand.toLowerCase() === brand.name.toLowerCase()
  );

  const otherBrands = BRANDS_DATA.filter((b) => b.slug !== brand.slug);

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/brands" className="hover:text-[#1D1D1F] transition-colors">
          Brands
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">{brand.name}</span>
      </nav>

      {/* 2. Brand Hero Header Showcase */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 lg:p-14 space-y-6 shadow-subtle relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3]">
                VERIFIED OUTLET BRAND
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
              <span className="text-xs text-[#86868B] capitalize">{brand.category}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              {brand.name}
            </h1>

            <p className="text-base sm:text-lg text-[#6E6E73] font-normal leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Authorized Logo Box */}
          <div className="w-36 h-24 sm:w-44 sm:h-28 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center p-6 flex-shrink-0 self-start md:self-auto">
            <Image
              src={brand.logo}
              alt={`${brand.name} authorized logo`}
              width={120}
              height={44}
              className="max-h-12 w-auto object-contain filter contrast-150"
            />
          </div>
        </div>

        {/* Authentic Distributor Guarantee Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#6E6E73]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
            <span>100% Genuine Authorized Distributor Sourcing</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Tag className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
            <span>Side-by-side Transparent Outlet Pricing</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
            <span>Physical Try-On at Kapadwanj Flagship</span>
          </div>
        </div>
      </div>

      {/* 3. Product Catalogue for This Brand with Adaptive Filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#1D1D1F]">
              Available {brand.name} Styles ({brandProducts.length})
            </h2>
            <p className="text-xs text-[#86868B] mt-0.5">
              Live in-store inventory at {STORE_DETAILS.name}.
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-semibold text-[#0071E3] hover:underline"
          >
            View All Brands
          </Link>
        </div>

        <Suspense fallback={<div className="py-8 text-center text-xs text-[#86868B]">Loading brand styles...</div>}>
          <BrandListingClient
            brand={brand}
            initialProducts={brandProducts}
          />
        </Suspense>
      </div>

      {/* 4. Other Brands Navigation Strip */}
      <div className="pt-8 border-t border-[#E5E7EB] space-y-4">
        <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
          Explore More Outlet Brands
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {otherBrands.map((b) => (
            <Link
              key={b.id}
              href={`/brands/${b.slug}`}
              className="h-20 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#0071E3] p-3 flex flex-col items-center justify-center transition-all group"
            >
              <span className="text-xs font-medium text-[#1D1D1F] group-hover:text-[#0071E3]">
                {b.name}
              </span>
              <span className="text-[10px] text-[#86868B] mt-0.5">{b.itemCount} Styles</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
