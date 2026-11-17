import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Complete Product Catalogue — iNESTYL OUTLET",
  description:
    "Explore our complete multi-brand collection of authentic footwear, performance runners, and designer clothing at verified outlet pricing in Kapadwanj.",
};

export default async function ProductsPage() {
  const client = createStorefrontClient();
  const { data: publishedProducts } = await getPublishedProducts(client, { limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Complete Catalogue"
          badge="Full Inventory"
          subtitle="Browse all 100% original footwear and apparel curated from authorized global distributors."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Complete Catalogue"
        subtitle="Browse all 100% original footwear and apparel curated from authorized global distributors."
        badge="Full Inventory"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "All Products" },
        ]}
        department="all"
        initialProducts={publishedProducts}
      />
    </Suspense>
  );
}
