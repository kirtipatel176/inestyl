import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { getPublishedProducts } from "@/lib/server-db";

export const metadata: Metadata = {
  title: "Men's Collection — Footwear & Apparel | iNESTYL OUTLET",
  description:
    "Curated men's footwear, running shoes, authentic Levi's 501 jeans, DIESEL jackets, and polo t-shirts at verified outlet pricing in Kapadwanj.",
};

export default function MensPage() {
  const menProducts = getPublishedProducts().filter(
    (p) => p.gender === "Men" || p.gender === "Unisex"
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading men&apos;s collection...</div>}>
      <ProductListingView
        title="Men's Collection"
        subtitle="Original athletic footwear, court classics, rigid Italian denim, and essential cotton apparel."
        badge="Gentlemen's Curation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Men" },
        ]}
        lockedGender="Men"
        department="all"
        initialProducts={menProducts}
      />
    </Suspense>
  );
}
