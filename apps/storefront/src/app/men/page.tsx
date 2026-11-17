import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Men's Collection — Footwear & Apparel | iNESTYL OUTLET",
  description:
    "Explore authentic men's sneakers, running shoes, Levi's jeans, and Nike hoodies at outlet prices in Kapadwanj.",
};

export default async function MenPage() {
  const client = createStorefrontClient();
  const { data: menProducts } = await getPublishedProducts(client, { gender: "Men", limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Men's Collection"
          badge="Men's Department"
          subtitle="Engineered running trainers, iconic court sneakers, and classic apparel designed for men."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Men's Collection"
        subtitle="Engineered running trainers, iconic court sneakers, and classic apparel designed for men."
        badge="Men's Department"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Men" },
        ]}
        lockedGender="Men"
        initialProducts={menProducts}
      />
    </Suspense>
  );
}
