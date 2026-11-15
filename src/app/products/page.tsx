import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";

export const metadata: Metadata = {
  title: "Complete Product Catalogue — iNESTYL OUTLET",
  description:
    "Explore our complete multi-brand collection of authentic footwear, performance runners, and designer clothing at verified outlet pricing in Kapadwanj.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading catalogue...</div>}>
      <ProductListingView
        title="Complete Catalogue"
        subtitle="Browse all 100% original footwear and apparel curated from authorized global distributors."
        badge="Full Inventory"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "All Products" },
        ]}
        department="all"
      />
    </Suspense>
  );
}
