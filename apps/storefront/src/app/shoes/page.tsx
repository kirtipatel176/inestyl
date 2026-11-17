import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Original Shoes & Footwear — Sneakers, Running & Casual | iNESTYL OUTLET",
  description:
    "Explore 100% original sneakers, road running shoes, and casual lifestyle footwear from Nike, adidas, Puma, and HOKA at Kapadwanj flagship store.",
};

export default async function ShoesPage() {
  const client = createStorefrontClient();
  const { data: footwearProducts } = await getPublishedProducts(client, { department: "footwear", limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Shoes & Footwear"
          badge="100% Original Verified"
          subtitle="Engineered running silhouettes, iconic retro basketball sneakers, and cushioned lifestyle footwear."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Shoes & Footwear"
        subtitle="Engineered running silhouettes, iconic retro basketball sneakers, and cushioned lifestyle footwear."
        badge="100% Original Verified"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes" },
        ]}
        department="footwear"
        initialProducts={footwearProducts}
      />
    </Suspense>
  );
}
