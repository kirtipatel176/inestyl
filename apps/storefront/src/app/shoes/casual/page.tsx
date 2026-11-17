import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Casual Footwear & Lifestyle Trainers | iNESTYL OUTLET",
  description:
    "Explore comfortable, all-day casual footwear and heritage trainers from leading international brands at Kapadwanj flagship store.",
};

export default async function CasualShoesPage() {
  const client = createStorefrontClient();
  const { data: allFootwear } = await getPublishedProducts(client, { department: "footwear", limit: 100 });
  const casualProducts = allFootwear.filter(
    (p) => p.shoeType === "Casual" || p.shoeType === "Lifestyle" || p.subcategory === "Casual"
  );

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Casual Shoes & Lifestyle"
          badge="Daily Comfort"
          subtitle="Versatile slip-ons, canvas classics, and cushioned everyday trainers built for daily comfort."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Casual Shoes &amp; Lifestyle"
        subtitle="Versatile slip-ons, canvas classics, and cushioned everyday trainers built for daily comfort."
        badge="Daily Comfort"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Casual" },
        ]}
        department="footwear"
        lockedShoeType="Casual"
        initialProducts={casualProducts.length > 0 ? casualProducts : allFootwear}
      />
    </Suspense>
  );
}
