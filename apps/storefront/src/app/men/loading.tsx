import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";

export default function MenLoading() {
  return (
    <ProductListingSkeleton
      title="Men's Collection"
      badge="Men's Department"
      subtitle="Engineered running trainers, iconic court sneakers, and classic apparel designed for men."
      count={8}
    />
  );
}
