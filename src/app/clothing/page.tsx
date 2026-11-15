import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Original Clothing & Denim — Levi's, DIESEL, Nike & U.S. Polo | iNESTYL OUTLET",
  description:
    "Curated original clothing: Levi's 501 jeans, DIESEL trucker jackets, U.S. Polo pique polos, and Nike club fleece hoodies at verified outlet prices.",
};

export default function ClothingPage() {
  const clothingProducts = PRODUCTS_DATA.filter(
    (p) => p.type === "clothing" || p.type === "apparel"
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading clothing catalogue...</div>}>
      <ProductListingView
        title="Clothing Collection"
        subtitle="Genuine Levi's 501 jeans, DIESEL Italian denim trucker jackets, U.S. Polo pique tees, and Nike Club fleece."
        badge="Original Apparel & Denim"
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
