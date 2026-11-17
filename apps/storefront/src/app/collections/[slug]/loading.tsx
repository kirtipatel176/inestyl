import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";

export default function CollectionDetailLoading() {
  return (
    <div className="container-luxury py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
      </div>

      {/* Collection Hero Skeleton */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-3">
        <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
        <div className="h-9 w-64 bg-[#E5E7EB] rounded" />
        <div className="h-4 w-96 bg-[#E5E7EB] rounded" />
      </div>

      {/* Products Grid Skeleton */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}
