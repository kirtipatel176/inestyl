import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { PRODUCTS_DATA } from "@/constants/mock-data";

export const metadata: Metadata = {
  title: "New Arrivals — Fresh Drops | iNESTYL OUTLET",
  description:
    "Freshly unboxed footwear, sneakers, and apparel now available at our Kapadwanj flagship outlet at verified outlet pricing.",
};

export default function NewArrivalsPage() {
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNew || p.collections?.includes("new-arrivals"));

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading new arrivals...</div>}>
      <ProductListingView
        title="New Arrivals"
        subtitle="Freshly unboxed footwear and seasonal apparel now available in our Kapadwanj store."
        badge="Fresh Drops"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "New Arrivals" },
        ]}
        initialProducts={newArrivals}
        department="all"
      />
    </Suspense>
  );
}
