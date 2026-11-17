import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createStorefrontClient, getActiveCollections } from "@inestyle/database";
import { getOptimizedImagePath } from "@/lib/images";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Curated Collections — iNESTYL OUTLET",
  description:
    "Explore our signature editorial collections, featuring original footwear, running shoes, denim classics, and seasonal drops at verified outlet prices.",
};

export default async function CollectionsPage() {
  const client = createStorefrontClient();
  const collections = await getActiveCollections(client);

  return (
    <div className="container-luxury py-8 sm:py-12 space-y-10 sm:space-y-14">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Collections</span>
      </nav>

      {/* 2. Editorial Page Header */}
      <div className="max-w-3xl space-y-3 pb-6 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          CURATED EDITS &amp; THEMES
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight">
          Curated Collections
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          From high-performance road runners and classic basketball retros to rigid Italian denim
          and everyday combed cotton staples, discover our themed edits sourced exclusively through
          verified brand distributors.
        </p>
      </div>

      {/* 3. Editorial Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {collections.map((col, index) => {
          return (
            <Link
              key={col.id || col.slug}
              href={`/collections/${col.slug}`}
              className="group flex flex-col bg-[#FBFBFB] rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#1D1D1F]/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Campaign Visual Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F5F7]">
                {col.image && (
                  <Image
                    src={getOptimizedImagePath(col.image, "detail")}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Badge Overlay */}
                {col.badge && (
                  <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#111111]/85 backdrop-blur-md text-white shadow-xs">
                    {col.badge}
                  </span>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-xl font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {col.title}
                    </h2>
                    {col.itemCount !== undefined && col.itemCount > 0 && (
                      <span className="text-[11px] font-medium text-[#86868B] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
                        {col.itemCount} styles
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#86868B] line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-[#0071E3] group-hover:underline pt-2 border-t border-[#F5F5F7]">
                  View Products in Collection →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
