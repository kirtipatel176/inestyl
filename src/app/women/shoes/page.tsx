import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Women's Shoes — Sneakers, Running & Casual | iNESTYL OUTLET",
  description:
    "Explore authentic women's running trainers, court classics, and casual sneakers from HOKA, Nike, adidas, and Puma in Kapadwanj.",
};

export default function WomensShoesPage() {
  const womensFootwear = PRODUCTS_DATA.filter(
    (p) => p.type === "footwear" && (p.gender === "Women" || p.gender === "Unisex")
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading women&apos;s shoes...</div>}>
      <ProductListingView
        title="Women's Shoes"
        subtitle="Maximalist running shoes, iconic court trainers, and versatile daily sneakers."
        badge="Women's Footwear"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Women", href: "/women" },
          { label: "Women's Shoes" },
        ]}
        department="footwear"
        lockedGender="Women"
        initialProducts={womensFootwear}
      />
    </Suspense>
  );
}

