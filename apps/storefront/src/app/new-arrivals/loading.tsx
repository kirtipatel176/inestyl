import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";

export default function NewArrivalsLoading() {
  return (
    <ProductListingSkeleton
      title="New Arrivals"
      badge="Fresh Drops"
      subtitle="Freshly unboxed footwear and seasonal apparel now available in our Kapadwanj store."
      count={8}
    />
  );
}
