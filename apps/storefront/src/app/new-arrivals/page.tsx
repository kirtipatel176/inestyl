import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "New Arrivals — Fresh Drops | iNESTYL OUTLET",
  description:
    "Freshly unboxed footwear, sneakers, and apparel now available at our Kapadwanj flagship outlet at verified outlet pricing.",
};

export default async function NewArrivalsPage() {
  const client = createStorefrontClient();
  const { data: newArrivals } = await getPublishedProducts(client, { isNew: true, limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="New Arrivals"
          badge="Fresh Drops"
          subtitle="Freshly unboxed footwear and seasonal apparel now available in our Kapadwanj store."
          count={8}
        />
      }
    >
      <ProductListingView
        title="New Arrivals"
        subtitle="Freshly unboxed footwear and seasonal apparel now available in our Kapadwanj store."
        badge="Fresh Drops"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "New Arrivals" },
        ]}
        initialProducts={newArrivals}
      />
    </Suspense>
  );
}
