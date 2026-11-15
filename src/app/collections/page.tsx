import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS_DATA, PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Curated Collections — iNESTYL OUTLET",
  description:
    "Explore our 11 signature editorial collections, featuring original footwear, running shoes, denim classics, and seasonal drops at verified outlet prices.",
};

export default function CollectionsPage() {
  // Requirement 2: "Hide empty collections and do not invent trending or seasonal claims."
  const activeCollections = COLLECTIONS_DATA.filter((col) => {
    return PRODUCTS_DATA.some((p) => p.collections?.includes(col.slug));
  }).map((col) => {
    const count = PRODUCTS_DATA.filter((p) => p.collections?.includes(col.slug)).length;
    return { ...col, itemCount: count };
  });

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
        {activeCollections.map((col, index) => {
          const isFeaturedSpan = index === 0;

          return (
            <article
              key={col.slug}
              className={`group bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-subtle hover:border-[#0071E3]/40 ${
                isFeaturedSpan ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Campaign Image */}
              <div
                className={`relative w-full overflow-hidden bg-[#F5F5F7] ${
                  isFeaturedSpan
                    ? "aspect-[16/9] sm:aspect-[21/9]"
                    : "aspect-[16/10] sm:aspect-[4/3]"
                }`}
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes={
                    isFeaturedSpan
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Badge Overlay */}
                {col.badge && (
                  <span className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md text-[#1D1D1F] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full z-10 shadow-xs border border-[#E5E7EB]/80">
                    {col.badge}
                  </span>
                )}

                {/* Item count tag */}
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full z-10">
                  {col.itemCount} {col.itemCount === 1 ? "Product" : "Products"}
                </span>
              </div>

              {/* Card Information */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {col.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB]/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0071E3] group-hover:underline">
                    Explore Collection
                  </span>

                  <Link
                    href={`/collections/${col.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={`Explore ${col.title}`}
                  >
                    <span className="sr-only">Explore {col.title}</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

