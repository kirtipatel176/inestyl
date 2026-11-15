import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLECTIONS_DATA, PRODUCTS_DATA } from "@/constants/mock-data";
import { CollectionListingClient } from "@/components/products/CollectionListingClient";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS_DATA.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_DATA.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found — iNESTYL OUTLET" };

  return {
    title: `${collection.title} — Verified Outlet Pricing | iNESTYL OUTLET`,
    description: `${collection.description} Discover genuine Nike, adidas, Puma, HOKA, and Levi's styles in Kapadwanj.`,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_DATA.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Get products assigned to this collection
  const collectionProducts = PRODUCTS_DATA.filter((p) =>
    p.collections?.includes(collection.slug)
  );

  return (
    <div className="container-luxury py-8 space-y-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-[#1D1D1F] transition-colors">
          Collections
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">{collection.title}</span>
      </nav>

      {/* 2. Interactive Client Collection View wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#0071E3] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-[#86868B]">Loading collection products...</p>
          </div>
        }
      >
        <CollectionListingClient
          collection={collection}
          initialProducts={collectionProducts}
        />
      </Suspense>
    </div>
  );
}
