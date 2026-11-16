import { Suspense } from "react";
import { Metadata } from "next";
import { ProductListingView } from "@/components/products/ProductListingView";
import { getPublishedProducts } from "@/lib/server-db";

export const metadata: Metadata = {
  title: "Sneakers Collection — Nike, Puma, adidas | iNESTYL OUTLET",
  description:
    "Explore iconic lifestyle sneakers, retro basketball kicks, and street culture silhouettes at verified outlet pricing in Kapadwanj.",
};

export default function SneakersListingPage() {
  const sneakerProducts = getPublishedProducts().filter(
    (p) =>
      p.type === "footwear" &&
      (p.shoeType === "Sneakers" ||
        p.subcategory === "Sneakers" ||
        p.category === "Lifestyle" ||
        p.collections?.includes("sneakers-collection"))
  );

  return (
    <Suspense fallback={<div className="container-luxury py-16 text-center text-xs text-[#86868B]">Loading sneakers...</div>}>
      <ProductListingView
        title="Sneakers Collection"
        subtitle="Heritage court silhouettes, modern air cushioning, and bold street aesthetics."
        badge="Sneakerhead Edit"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shoes", href: "/shoes" },
          { label: "Sneakers" },
        ]}
        department="footwear"
        lockedShoeType="Sneakers"
        initialProducts={sneakerProducts}
      />
    </Suspense>
  );
}

