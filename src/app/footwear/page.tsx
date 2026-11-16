import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { getPublishedProducts } from "@/lib/server-db";

export const metadata: Metadata = {
  title: "Original Shoes & Footwear — Sneakers, Running & Casual | iNESTYL OUTLET",
  description:
    "Explore 100% original sneakers, road running shoes, and casual lifestyle footwear from Nike, adidas, Puma, and HOKA at Kapadwanj flagship store.",
};

export default function FootwearPage() {
  const footwearProducts = getPublishedProducts().filter((p) => p.type === "footwear");

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading footwear catalogue...</div>}>
      <ProductListingView
        title="Shoes &amp; Footwear"
        subtitle="Engineered running silhouettes, iconic retro basketball sneakers, and cushioned lifestyle footwear."
        badge="100% Original Verified"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Footwear" },
        ]}
        department="footwear"
        initialProducts={footwearProducts}
      />
    </Suspense>
  );
}
