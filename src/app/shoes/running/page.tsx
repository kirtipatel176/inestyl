import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "Running Shoes — HOKA, Nike & adidas Road & Trail | iNESTYL OUTLET",
  description:
    "High-performance road runners and maximalist cushioned trail shoes from HOKA, Nike, and adidas at verified outlet prices.",
};

export default function RunningShoesListingPage() {
  const runningProducts = PRODUCTS_DATA.filter(
    (p) =>
      p.type === "footwear" &&
      (p.shoeType === "Running" ||
        p.subcategory === "Running Shoes" ||
        p.category === "Running" ||
        p.collections?.includes("running-collection"))
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading running shoes...</div>}>
      <ProductListingView
        title="Running Shoes"
        subtitle="Ultra-responsive road racing trainers, max-cushion road cruisers, and rugged trail outsoles."
        badge="Performance Road & Trail"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Running Shoes" },
        ]}
        department="footwear"
        lockedShoeType="Running"
        initialProducts={runningProducts}
      />
    </Suspense>
  );
}

