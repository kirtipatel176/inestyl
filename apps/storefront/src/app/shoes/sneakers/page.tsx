import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Original Sneakers — Retro, Court & Streetwear | iNESTYL OUTLET",
  description:
    "Shop authentic sneakers from Nike, adidas, and Puma at outlet prices in Kapadwanj. Retro court classics, chunky runners, and everyday kicks.",
};

export default async function SneakersPage() {
  const client = createStorefrontClient();
  const { data: allFootwear } = await getPublishedProducts(client, { department: "footwear", limit: 100 });
  const sneakerProducts = allFootwear.filter(
    (p) => p.shoeType === "Sneakers" || p.subcategory === "Sneakers" || p.title.toLowerCase().includes("sneaker")
  );

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Sneakers & Streetwear"
          badge="Iconic Silhouettes"
          subtitle="Heritage basketball silhouettes, low-profile court shoes, and modern lifestyle runners."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Sneakers & Streetwear"
        subtitle="Heritage basketball silhouettes, low-profile court shoes, and modern lifestyle runners."
        badge="Iconic Silhouettes"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Sneakers" },
        ]}
        department="footwear"
        lockedShoeType="Sneakers"
        initialProducts={sneakerProducts.length > 0 ? sneakerProducts : allFootwear}
      />
    </Suspense>
  );
}
