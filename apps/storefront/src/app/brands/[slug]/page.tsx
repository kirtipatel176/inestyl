import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Tag, MapPin } from "lucide-react";
import {
  createStorefrontClient,
  getBrandBySlug,
  getActiveBrands,
  getPublishedProducts,
} from "@inestyle/database";
import { BrandListingClient } from "@/components/products/BrandListingClient";
import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";
import { STORE_DETAILS } from "@/constants";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();
  const brand = await getBrandBySlug(client, slug);
  if (!brand) return { title: "Brand Not Found — iNESTYL OUTLET" };

  return {
    title: `${brand.name} at iNESTYL OUTLET — Verified Authentic Original Inventory`,
    description: `Discover 100% original ${brand.name} footwear and apparel at outlet prices in Kapadwanj, Gujarat. Browse current stock and enquire directly on WhatsApp.`,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();

  const [brand, allBrands, productsResult] = await Promise.all([
    getBrandBySlug(client, slug),
    getActiveBrands(client),
    getPublishedProducts(client, { brand: slug, limit: 100 }),
  ]);

  if (!brand) {
    notFound();
  }

  const brandProducts = productsResult.data;
  const otherBrands = allBrands.filter((b) => b.slug !== brand.slug);

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

      {/* 2. Hero Header Banner */}
      <div
        className="relative rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[#E5E7EB]"
        style={{
          backgroundColor: brand.tileBg || "#111111",
          color: brand.textColor || "#FFFFFF",
        }}
      >
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Authentic
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-white/90 tracking-wide uppercase">
              <Tag className="w-3.5 h-3.5" /> Outlet Pricing
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {brand.name}
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
            {brand.description ||
              `Explore genuine ${brand.name} footwear and apparel. All stock is certified authentic with manufacturer serials and unboxed directly at our Kapadwanj store.`}
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {STORE_DETAILS.locationDisplay}
            </span>
            <span>•</span>
            <span>Available for in-store pickup & WhatsApp enquiry</span>
          </div>
        </div>

        {/* Brand Big Logo */}
        <div className="relative w-32 h-20 sm:w-48 sm:h-28 md:w-56 md:h-32 flex items-center justify-center shrink-0 bg-white/10 backdrop-blur-xs rounded-2xl p-6 self-start md:self-auto border border-white/20">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              className="object-contain p-4 drop-shadow-md"
            />
          ) : (
            <span className="font-heading text-2xl font-bold text-white tracking-widest">
              {brand.name}
            </span>
          )}
        </div>
      </div>

      {/* 3. Filterable Product Grid Section (Skeleton shown while waiting for backend response) */}
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <BrandListingClient brand={brand} initialProducts={brandProducts} />
      </Suspense>

      {/* 4. Cross-Navigation: Explore Other Brands */}
      {otherBrands.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1D1D1F]">
                Other Leading Brands at iNESTYL
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1">
                Explore multi-brand sportswear and denim collections.
              </p>
            </div>
            <Link
              href="/brands"
              className="text-xs sm:text-sm font-semibold text-[#0071E3] hover:underline"
            >
              All Brands →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {otherBrands.slice(0, 6).map((other) => (
              <Link
                key={other.id || other.slug}
                href={`/brands/${other.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#E5E7EB] hover:border-[#1D1D1F]/20 hover:shadow-xs transition-all bg-[#FFFFFF] group"
              >
                <div className="relative w-14 h-10 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                  {other.logo ? (
                    <Image
                      src={other.logo}
                      alt={other.name}
                      width={56}
                      height={40}
                      className="object-contain max-h-8 w-auto"
                    />
                  ) : (
                    <span className="text-xs font-bold">{other.name}</span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-[#86868B] group-hover:text-[#1D1D1F] mt-2 tracking-wide uppercase transition-colors">
                  {other.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
