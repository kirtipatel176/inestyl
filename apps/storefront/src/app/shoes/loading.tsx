import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";

export default function ShoesLoading() {
  return (
    <ProductListingSkeleton
      title="Shoes & Footwear"
      badge="100% Original Verified"
      subtitle="Engineered running silhouettes, iconic retro basketball sneakers, and cushioned lifestyle footwear."
      count={8}
    />
  );
}
