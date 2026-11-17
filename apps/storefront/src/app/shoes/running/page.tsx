import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Performance Running Shoes — HOKA, adidas, Nike | iNESTYL OUTLET",
  description:
    "Explore maximum-cushion road running trainers, carbon-plated racers, and trail grip footwear from HOKA and adidas at outlet prices.",
};

export default async function RunningShoesPage() {
  const client = createStorefrontClient();
  const { data: allFootwear } = await getPublishedProducts(client, { department: "footwear", limit: 100 });
  const runningProducts = allFootwear.filter(
    (p) => p.shoeType === "Running" || p.subcategory === "Running" || p.title.toLowerCase().includes("run")
  );

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Running Shoes"
          badge="Engineered Performance"
          subtitle="Maximal cushioning, responsive foams, and aggressive trail lugs engineered for daily mileage."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Running Shoes"
        subtitle="Maximal cushioning, responsive foams, and aggressive trail lugs engineered for daily mileage."
        badge="Engineered Performance"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Running" },
        ]}
        department="footwear"
        lockedShoeType="Running"
        initialProducts={runningProducts}
      />
    </Suspense>
  );
}
