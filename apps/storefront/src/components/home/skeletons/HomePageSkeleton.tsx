import { HeroSectionSkeleton } from "./HeroSectionSkeleton";
import { CategoriesSectionSkeleton } from "./CategoriesSectionSkeleton";
import { FeaturedCollectionSkeleton } from "./FeaturedCollectionSkeleton";
import { BrandsSectionSkeleton } from "./BrandsSectionSkeleton";
import { CollectionsSectionSkeleton } from "./CollectionsSectionSkeleton";
import { OccasionsSectionSkeleton } from "./OccasionsSectionSkeleton";
import { StoreVisitSectionSkeleton } from "./StoreVisitSectionSkeleton";

/**
 * Complete Section-Based Skeleton for the Storefront Home Page.
 * Matches the exact section-by-section structure of the live home page:
 * 1. Hero Campaign Banner
 * 2. Curated Categories
 * 3. Featured Collection
 * 4. Discover Brands
 * 5. Shop by Collection
 * 6. Shop by Occasion
 * 7. Flagship Store & Trust Pillars
 */
export function HomePageSkeleton() {
  return (
    <div
      className="space-y-24 sm:space-y-32 pb-24"
      role="status"
      aria-label="Loading home page sections"
    >
      {/* 1. Full-Width Hero Campaign Skeleton */}
      <HeroSectionSkeleton />

      {/* 2. Explore Categories Skeleton */}
      <CategoriesSectionSkeleton />

      {/* 3. Featured Collection Skeleton */}
      <FeaturedCollectionSkeleton />

      {/* 4. Discover Brands Skeleton */}
      <BrandsSectionSkeleton />

      {/* 5. Shop by Collection Skeleton */}
      <CollectionsSectionSkeleton />

      {/* 6. Shop by Occasion Skeleton */}
      <OccasionsSectionSkeleton />

      {/* 7. Flagship Store Visit & Trust Pillars Skeleton */}
      <StoreVisitSectionSkeleton />
    </div>
  );
}
