import { ProductListingSkeleton } from "@/components/ui/ProductListingSkeleton";

export default function WomenLoading() {
  return (
    <ProductListingSkeleton
      title="Women's Collection"
      badge="Women's Department"
      subtitle="Maximalist running shoes, iconic court trainers, and lifestyle apparel curated for women."
      count={8}
    />
  );
}
