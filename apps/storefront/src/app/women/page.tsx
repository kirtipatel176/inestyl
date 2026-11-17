import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Women's Collection — Footwear & Apparel | iNESTYL OUTLET",
  description:
    "Explore authentic women's running trainers, court classics, and apparel from leading international brands in Kapadwanj.",
};

export default async function WomenPage() {
  const client = createStorefrontClient();
  const { data: womenProducts } = await getPublishedProducts(client, { gender: "Women", limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Women's Collection"
          badge="Women's Department"
          subtitle="Maximalist running shoes, iconic court trainers, and lifestyle apparel curated for women."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Women's Collection"
        subtitle="Maximalist running shoes, iconic court trainers, and lifestyle apparel curated for women."
        badge="Women's Department"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Women" },
        ]}
        lockedGender="Women"
        initialProducts={womenProducts}
      />
    </Suspense>
  );
}
