import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Men's Shoes — Sneakers, Running & Sports | iNESTYL OUTLET",
  description:
    "Explore authentic men's sneakers, running trainers, and casual footwear from Nike, adidas, Puma, and HOKA in Kapadwanj.",
};

export default async function MensShoesPage() {
  const client = createStorefrontClient();
  const { data: mensFootwear } = await getPublishedProducts(client, {
    department: "footwear",
    gender: "Men",
    limit: 100,
  });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Men's Shoes"
          badge="Men's Footwear"
          subtitle="Original sneakers, performance road runners, and everyday casual kicks."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Men's Shoes"
        subtitle="Original sneakers, performance road runners, and everyday casual kicks."
        badge="Men's Footwear"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Men", href: "/men" },
          { label: "Shoes" },
        ]}
        department="footwear"
        lockedGender="Men"
        initialProducts={mensFootwear}
      />
    </Suspense>
  );
}
