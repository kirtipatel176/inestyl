import { Suspense, cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { HomepageSectionConfig } from "@inestyle/shared-types";
import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { ExploreCategoriesSection } from "@/components/home/ExploreCategoriesSection";
import { FeaturedCollectionSection } from "@/components/home/FeaturedCollectionSection";
import { DiscoverBrandsSection } from "@/components/home/DiscoverBrandsSection";
import { ShopByCollectionSection } from "@/components/home/ShopByCollectionSection";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasionSection";
import { VisitOurStore } from "@/components/home/VisitOurStore";
import { TrustPillarsAnimated } from "@/components/home/TrustPillarsAnimated";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";
import {
  HeroSectionSkeleton,
  CategoriesSectionSkeleton,
  FeaturedCollectionSkeleton,
  BrandsSectionSkeleton,
  CollectionsSectionSkeleton,
  StoreVisitSectionSkeleton,
} from "@/components/home/skeletons";
import {
  createStorefrontClient,
  getPublishedProducts,
  getHeroBanners,
  getHomepageSections,
  getActiveBrands,
  getActiveCollections,
  getCategories,
} from "@inestyle/database";

export const revalidate = 60; // ISR cache revalidation: 60 seconds

/**
 * Request-scoped cached getter for homepage section configuration.
 * Prevents redundant database queries when multiple section components resolve.
 */
const getCachedHomepageSections = cache(
  async (client: SupabaseClient): Promise<HomepageSectionConfig[]> => {
    return getHomepageSections(client).catch(() => []);
  }
);

/**
 * Checks if a homepage section is enabled in CMS database configuration.
 * Defaults to true if no custom configuration exists.
 */
function isSectionEnabled(sections: HomepageSectionConfig[], key: string): boolean {
  if (sections.length === 0) return true;
  const match = sections.find((s) => s.id === key);
  return match ? match.enabled : true;
}

/**
 * 1. Full-Width Hero Campaign Server Section.
 * Ultra-fast SSR resolution with 150ms CMS timeout fallback to guarantee sub-200ms TTFB.
 */
async function HeroCampaignSection() {
  const client = createStorefrontClient();

  const timeoutPromise = new Promise<{ banners: any[]; sections: any[] }>((resolve) =>
    setTimeout(() => resolve({ banners: [], sections: [] }), 150)
  );

  const fetchPromise = Promise.all([
    getHeroBanners(client).catch(() => []),
    getCachedHomepageSections(client),
  ]).then(([banners, sections]) => ({ banners, sections }));

  const { banners, sections } = await Promise.race([fetchPromise, timeoutPromise]);

  if (sections.length > 0 && !isSectionEnabled(sections, "heroBanner")) {
    return null;
  }

  const heroBanner = banners.find((b) => b.position === "hero") || banners[0] || null;

  return (
    <SectionErrorBoundary sectionName="Hero Campaign">
      <HeroFullWidth heroBanner={heroBanner} />
    </SectionErrorBoundary>
  );
}

/**
 * 2. Curated Categories Server Section.
 * Streams independently while awaiting categories backend response.
 */
async function CuratedCategoriesSection() {
  const client = createStorefrontClient();
  const [categories, sections] = await Promise.all([
    getCategories(client).catch(() => []),
    getCachedHomepageSections(client),
  ]);

  if (!isSectionEnabled(sections, "curatedCategories")) {
    return null;
  }

  return (
    <SectionErrorBoundary sectionName="Category Exploration">
      <ExploreCategoriesSection categories={categories} />
    </SectionErrorBoundary>
  );
}

/**
 * 3. Featured Collection Server Section.
 * Streams independently with product card skeletons while awaiting catalog backend response.
 */
async function FeaturedProductsSection() {
  const client = createStorefrontClient();
  const [productsResult, sections] = await Promise.all([
    getPublishedProducts(client, { isFeatured: true, limit: 6 }).catch(() => ({
      data: [],
      totalCount: 0,
      page: 1,
      limit: 6,
      totalPages: 0,
    })),
    getCachedHomepageSections(client),
  ]);

  if (!isSectionEnabled(sections, "featuredProducts")) {
    return null;
  }

  return (
    <SectionErrorBoundary sectionName="Featured Collection">
      <FeaturedCollectionSection initialProducts={productsResult.data} />
    </SectionErrorBoundary>
  );
}

/**
 * 4. Discover Brands Server Section.
 * Streams independently while awaiting brand list backend response.
 */
async function BrandMarqueeSection() {
  const client = createStorefrontClient();
  const [brands, sections] = await Promise.all([
    getActiveBrands(client).catch(() => []),
    getCachedHomepageSections(client),
  ]);

  if (!isSectionEnabled(sections, "brandMarquee")) {
    return null;
  }

  return (
    <SectionErrorBoundary sectionName="Featured Brands">
      <DiscoverBrandsSection brands={brands} />
    </SectionErrorBoundary>
  );
}

/**
 * 5. Thematic Collections Spotlight Server Section.
 * Streams independently while awaiting collection list backend response.
 */
async function ThematicCollectionsSection() {
  const client = createStorefrontClient();
  const [collections, sections] = await Promise.all([
    getActiveCollections(client).catch(() => []),
    getCachedHomepageSections(client),
  ]);

  if (!isSectionEnabled(sections, "collectionsSpotlight")) {
    return null;
  }

  return (
    <SectionErrorBoundary sectionName="Thematic Collections">
      <ShopByCollectionSection collections={collections} />
    </SectionErrorBoundary>
  );
}

/**
 * 7. Physical Flagship Store & Trust Pillars Server Section.
 * Streams independently while checking CMS section toggle.
 */
async function StoreVisitSection() {
  const client = createStorefrontClient();
  const sections = await getCachedHomepageSections(client);

  if (!isSectionEnabled(sections, "storeVisitSection")) {
    return null;
  }

  return (
    <SectionErrorBoundary sectionName="Store Details & Trust Pillars">
      <VisitOurStore />
      <TrustPillarsAnimated />
    </SectionErrorBoundary>
  );
}

/**
 * Storefront Home Page.
 * Each section streams independently using React Suspense boundaries,
 * displaying section-specific high-fidelity skeletons while waiting for backend output.
 */
export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Full-Width Hero Section */}
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroCampaignSection />
      </Suspense>

      {/* 2. Explore Categories */}
      <Suspense fallback={<CategoriesSectionSkeleton />}>
        <CuratedCategoriesSection />
      </Suspense>

      {/* 3. Featured Collection */}
      <Suspense fallback={<FeaturedCollectionSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>

      {/* 4. Discover Brands */}
      <Suspense fallback={<BrandsSectionSkeleton />}>
        <BrandMarqueeSection />
      </Suspense>

      {/* 5. Shop by Collection */}
      <Suspense fallback={<CollectionsSectionSkeleton />}>
        <ThematicCollectionsSection />
      </Suspense>

      {/* 6. Shop by Occasion (Static curated occasions, renders instantly) */}
      <SectionErrorBoundary sectionName="Shop by Occasion">
        <ShopByOccasionSection />
      </SectionErrorBoundary>

      {/* 7. Physical Flagship Store & Trust Pillars */}
      <Suspense fallback={<StoreVisitSectionSkeleton />}>
        <StoreVisitSection />
      </Suspense>
    </div>
  );
}
