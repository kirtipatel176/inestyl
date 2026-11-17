import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  createStorefrontClient,
  getCollectionBySlug,
  getPublishedProducts,
} from "@inestyle/database";
import { CollectionListingClient } from "@/components/products/CollectionListingClient";
import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();
  const collection = await getCollectionBySlug(client, slug);
  if (!collection) return { title: "Collection Not Found — iNESTYL OUTLET" };

  return {
    title: `${collection.title} — Verified Outlet Pricing | iNESTYL OUTLET`,
    description: `${collection.description} Discover genuine styles in Kapadwanj.`,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();

  const [collection, productsResult] = await Promise.all([
    getCollectionBySlug(client, slug),
    getPublishedProducts(client, { collectionSlug: slug, limit: 100 }),
  ]);

  if (!collection) {
    notFound();
  }

  const collectionProducts = productsResult.data;

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

      {/* 2. Interactive Product Grid View (Skeleton shown while waiting for backend response) */}
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <CollectionListingClient
          collection={collection}
          initialProducts={collectionProducts}
        />
      </Suspense>
    </div>
  );
}
