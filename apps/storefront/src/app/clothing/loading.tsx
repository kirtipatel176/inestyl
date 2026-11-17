import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";

export default function ClothingLoading() {
  return (
    <ProductListingSkeleton
      title="Clothing & Apparel"
      badge="100% Original Verified"
      subtitle="Iconic straight-fit denim, combed cotton pique polos, and technical streetwear layers."
      count={8}
    />
  );
}
