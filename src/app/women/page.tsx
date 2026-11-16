import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { getPublishedProducts } from "@/lib/server-db";

export const metadata: Metadata = {
  title: "Women's Collection — Footwear & Apparel | iNESTYL OUTLET",
  description:
    "Curated women's running sneakers, court icons, Levi's high-rise jeans, and everyday essentials at verified outlet pricing in Kapadwanj.",
};

export default function WomensPage() {
  const womenProducts = getPublishedProducts().filter(
    (p) => p.gender === "Women" || p.gender === "Unisex"
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading women&apos;s collection...</div>}>
      <ProductListingView
        title="Women's Collection"
        subtitle="Performance running shoes, lifestyle court sneakers, sculpted denim, and effortless layers."
        badge="Women's Curation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Women" },
        ]}
        lockedGender="Women"
        department="all"
        initialProducts={womenProducts}
      />
    </Suspense>
  );
}
