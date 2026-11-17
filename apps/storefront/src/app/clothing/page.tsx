import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";
import { createStorefrontClient, getPublishedProducts } from "@inestyle/database";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Original Clothing & Apparel — Denim, Polos & Jackets | iNESTYL OUTLET",
  description:
    "Shop authentic Levi's denim, U.S. Polo Assn. tees, and DIESEL apparel at outlet pricing in Kapadwanj, Gujarat.",
};

export default async function ClothingPage() {
  const client = createStorefrontClient();
  const { data: clothingProducts } = await getPublishedProducts(client, { department: "clothing", limit: 100 });

  return (
    <Suspense
      fallback={
        <ProductListingSkeleton
          title="Clothing & Apparel"
          badge="100% Original Verified"
          subtitle="Iconic straight-fit denim, combed cotton pique polos, and technical streetwear layers."
          count={8}
        />
      }
    >
      <ProductListingView
        title="Clothing &amp; Apparel"
        subtitle="Iconic straight-fit denim, combed cotton pique polos, and technical streetwear layers."
        badge="100% Original Verified"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Clothing" },
        ]}
        department="clothing"
        initialProducts={clothingProducts}
      />
    </Suspense>
  );
}
