export default function BrandsLoading() {
  return (
    <div className="container-luxury py-8 space-y-10 animate-pulse" role="status" aria-label="Loading brands">
      {/* Header skeleton */}
      <div className="space-y-3 max-w-2xl">
        <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
        <div className="h-9 w-72 bg-[#E5E7EB] rounded" />
        <div className="h-4 w-96 max-w-full bg-[#E5E7EB] rounded" />
      </div>

      {/* Brand Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-48 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] p-6 flex flex-col justify-between">
            <div className="w-24 h-8 bg-[#E5E7EB] rounded" />
            <div className="space-y-2">
              <div className="h-5 w-36 bg-[#E5E7EB] rounded" />
              <div className="h-3 w-48 bg-[#E5E7EB] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
