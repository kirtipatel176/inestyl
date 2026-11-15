import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { ExploreCategoriesSection } from "@/components/home/ExploreCategoriesSection";
import { FeaturedCollectionSection } from "@/components/home/FeaturedCollectionSection";
import { DiscoverBrandsSection } from "@/components/home/DiscoverBrandsSection";
import { ShopByCollectionSection } from "@/components/home/ShopByCollectionSection";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasionSection";
import { VisitOurStore } from "@/components/home/VisitOurStore";
import { TrustPillarsAnimated } from "@/components/home/TrustPillarsAnimated";

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. FULL-WIDTH HERO SECTION (Edge-to-Edge Campaign Photograph) */}
      <HeroFullWidth />

      {/* 2. EXPLORE CATEGORIES (4 Large Image-Led Panels) */}
      <ExploreCategoriesSection />

      {/* 3. FEATURED COLLECTION (Standout Styles, Minimal Clean Grid) */}
      <FeaturedCollectionSection />

      {/* 4. DISCOVER BRANDS (Clean, Restrained Brand Showcase) */}
      <DiscoverBrandsSection />

      {/* 5. SHOP BY COLLECTION (Asymmetric Editorial Layout) */}
      <ShopByCollectionSection />

      {/* 6. SHOP BY OCCASION (6 Visually Engaging Image-Led Occasions) */}
      <ShopByOccasionSection />

      {/* 7. PHYSICAL FLAGSHIP STORE & TRUST PILLARS (Authentic Kapadwanj Retail Reality) */}
      <VisitOurStore />
      <TrustPillarsAnimated />
    </div>
  );
}
