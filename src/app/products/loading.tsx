import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <div className="container-luxury py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
      </div>

      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div className="space-y-2 max-w-3xl">
          <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
          <div className="h-8 w-72 bg-[#E5E7EB] rounded" />
          <div className="h-4 w-96 bg-[#E5E7EB] rounded" />
        </div>
        <div className="h-8 w-44 bg-[#E5E7EB] rounded-full" />
      </div>

      {/* Filter toolbar skeleton */}
      <div className="flex items-center justify-between gap-4 py-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
        </div>
        <div className="h-8 w-32 bg-[#E5E7EB] rounded-full" />
      </div>

      {/* Products Grid */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}
