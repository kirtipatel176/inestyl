import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";

export default function RootLoading() {
  return (
    <div className="container-luxury py-12 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-3 pb-6 border-b border-[#E5E7EB]">
        <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
        <div className="h-8 w-64 bg-[#E5E7EB] rounded" />
        <div className="h-4 w-96 bg-[#E5E7EB] rounded" />
      </div>

      {/* Grid skeleton */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}
