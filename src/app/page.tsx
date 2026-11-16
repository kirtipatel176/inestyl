import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { ExploreCategoriesSection } from "@/components/home/ExploreCategoriesSection";
import { FeaturedCollectionSection } from "@/components/home/FeaturedCollectionSection";
import { DiscoverBrandsSection } from "@/components/home/DiscoverBrandsSection";
import { ShopByCollectionSection } from "@/components/home/ShopByCollectionSection";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasionSection";
import { VisitOurStore } from "@/components/home/VisitOurStore";
import { TrustPillarsAnimated } from "@/components/home/TrustPillarsAnimated";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. FULL-WIDTH HERO SECTION */}
      <SectionErrorBoundary sectionName="Hero Campaign">
        <HeroFullWidth />
      </SectionErrorBoundary>

      {/* 2. EXPLORE CATEGORIES */}
      <SectionErrorBoundary sectionName="Category Exploration">
        <ExploreCategoriesSection />
      </SectionErrorBoundary>

      {/* 3. FEATURED COLLECTION */}
      <SectionErrorBoundary sectionName="Featured Collection">
        <FeaturedCollectionSection />
      </SectionErrorBoundary>

      {/* 4. DISCOVER BRANDS */}
      <SectionErrorBoundary sectionName="Featured Brands">
        <DiscoverBrandsSection />
      </SectionErrorBoundary>

      {/* 5. SHOP BY COLLECTION */}
      <SectionErrorBoundary sectionName="Thematic Collections">
        <ShopByCollectionSection />
      </SectionErrorBoundary>

      {/* 6. SHOP BY OCCASION */}
      <SectionErrorBoundary sectionName="Shop by Occasion">
        <ShopByOccasionSection />
      </SectionErrorBoundary>

      {/* 7. PHYSICAL FLAGSHIP STORE & TRUST PILLARS */}
      <SectionErrorBoundary sectionName="Store Details & Trust Pillars">
        <VisitOurStore />
        <TrustPillarsAnimated />
      </SectionErrorBoundary>
    </div>
  );
}
