import { ProductGridSkeleton } from "@/components/ui/ProductGridSkeleton";

interface ProductListingSkeletonProps {
  title?: string;
  badge?: string;
  subtitle?: string;
  count?: number;
}

/**
 * High-fidelity Skeleton for Product Listing Pages, matching ProductListingView layout.
 * Used while awaiting backend response for the catalogue section.
 */
export function ProductListingSkeleton({
  title,
  badge,
  subtitle,
  count = 8,
}: ProductListingSkeletonProps) {
  return (
    <div
      className="container-luxury py-8 space-y-8 animate-pulse"
      role="status"
      aria-label="Loading products"
    >
      {/* 1. Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
      </div>

      {/* 2. Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div className="space-y-2 max-w-3xl">
          {badge ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
              {badge}
            </span>
          ) : (
            <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
          )}

          {title ? (
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              {title}
            </h1>
          ) : (
            <div className="h-8 w-72 bg-[#E5E7EB] rounded" />
          )}

          {subtitle ? (
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          ) : (
            <div className="h-4 w-96 max-w-full bg-[#E5E7EB] rounded" />
          )}
        </div>

        {/* Store Location Pill Skeleton */}
        <div className="h-8 w-44 bg-[#E5E7EB] rounded-full shrink-0" />
      </div>

      {/* 3. Filter toolbar skeleton */}
      <div className="flex items-center justify-between gap-4 py-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
          <div className="h-8 w-24 bg-[#E5E7EB] rounded-full" />
        </div>
        <div className="h-8 w-32 bg-[#E5E7EB] rounded-full" />
      </div>

      {/* 4. Products Grid Skeleton for the specific section area */}
      <ProductGridSkeleton count={count} />
    </div>
  );
}
