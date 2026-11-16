import { TableSkeleton } from "./TableSkeleton";

/**
 * High-fidelity Admin Dashboard skeleton matching AdminDashboardClient layout.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" role="status" aria-label="Loading dashboard data">
      {/* Top Notification / Status Banner Skeleton */}
      <div className="h-10 bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-between px-4">
        <div className="h-3 w-48 bg-[#E5E7EB] rounded" />
        <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F7]" />
            </div>
            <div className="h-7 w-24 bg-[#E5E7EB] rounded" />
            <div className="h-2.5 w-32 bg-[#E5E7EB] rounded" />
          </div>
        ))}
      </div>

      {/* Action Bar / Controls Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="h-9 w-48 sm:w-64 bg-[#F5F5F7] rounded-lg" />
          <div className="h-9 w-24 bg-[#F5F5F7] rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-[#F5F5F7] rounded-lg" />
          <div className="h-9 w-32 bg-[#0071E3]/20 rounded-lg" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <TableSkeleton rows={6} columns={6} />
      </div>
    </div>
  );
}
