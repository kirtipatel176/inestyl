import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Casual Shoes — Court Classics & Daily Wear | iNESTYL OUTLET",
  description:
    "Timeless court classics and daily casual shoes from Puma, adidas, and Nike at verified outlet pricing in Kapadwanj.",
};

export default function CasualShoesListingPage() {
  const casualProducts = PRODUCTS_DATA.filter(
    (p) =>
      p.type === "footwear" &&
      (p.shoeType === "Casual" ||
        p.subcategory === "Casual Shoes" ||
        p.category === "Casual" ||
        p.collections?.includes("casual-wear"))
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading casual shoes...</div>}>
      <ProductListingView
        title="Casual Shoes"
        subtitle="Minimalist leather silhouettes, suede heritage icons, and relaxed daily sneakers."
        badge="Daily Classics"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Casual Shoes" },
        ]}
        department="footwear"
        lockedShoeType="Casual"
        initialProducts={casualProducts}
      />
    </Suspense>
  );
}

