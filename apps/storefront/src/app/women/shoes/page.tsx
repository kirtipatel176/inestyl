import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Women's Shoes — Sneakers, Running & Casual | iNESTYL OUTLET",
  description:
    "Explore authentic women's running trainers, court classics, and casual sneakers from HOKA, Nike, adidas, and Puma in Kapadwanj.",
};

export default async function WomensShoesPage() {
  const client = createStorefrontClient();
  const { data: womensFootwear } = await getPublishedProducts(client, {
    department: "footwear",
    gender: "Women",
    limit: 100,
  });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Women's Shoes"
          badge="Women's Footwear"
          subtitle="Maximalist running shoes, iconic court trainers, and versatile daily sneakers."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Women's Shoes"
        subtitle="Maximalist running shoes, iconic court trainers, and versatile daily sneakers."
        badge="Women's Footwear"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Women", href: "/women" },
          { label: "Shoes" },
        ]}
        department="footwear"
        lockedGender="Women"
        initialProducts={womensFootwear}
      />
    </Suspense>
  );
}
