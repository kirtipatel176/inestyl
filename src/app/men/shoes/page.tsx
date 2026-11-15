import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Men's Shoes — Sneakers, Running & Sports | iNESTYL OUTLET",
  description:
    "Explore authentic men's sneakers, running trainers, and casual footwear from Nike, adidas, Puma, and HOKA in Kapadwanj.",
};

export default function MensShoesPage() {
  const mensFootwear = PRODUCTS_DATA.filter(
    (p) => p.type === "footwear" && (p.gender === "Men" || p.gender === "Unisex")
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading men&apos;s shoes...</div>}>
      <ProductListingView
        title="Men's Shoes"
        subtitle="Original sneakers, performance road runners, and everyday casual kicks."
        badge="Men's Footwear"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Men", href: "/men" },
          { label: "Men's Shoes" },
        ]}
        department="footwear"
        lockedGender="Men"
        initialProducts={mensFootwear}
      />
    </Suspense>
  );
}

