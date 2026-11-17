interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Reusable table skeleton with animated shimmer lines.
 */
export function TableSkeleton({ rows = 6, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full overflow-x-auto" role="status" aria-label="Loading table">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#E5E7EB] bg-[#F5F5F7]">
            {Array.from({ length: columns }).map((_, cIdx) => (
              <th key={cIdx} className="p-4">
                <div className="h-3 w-20 bg-[#E5E7EB] rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <tr key={rIdx} className="hover:bg-neutral-50/50">
              {Array.from({ length: columns }).map((_, cIdx) => (
                <td key={cIdx} className="p-4">
                  <div
                    className={`h-3 bg-[#E5E7EB] rounded animate-pulse ${
                      cIdx === 0 ? "w-36" : cIdx === 1 ? "w-24" : "w-16"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
