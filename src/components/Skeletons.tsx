export function DashboardSkeleton() {
  return (
    <div className="animate-fade-in">
      {/* Metrics grid skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="h-[110px] rounded-2xl bg-charcoal-800 shimmer-bg" />
          <div className="h-[110px] rounded-2xl border border-charcoal-100 shimmer-bg" />
        </div>
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <div className="mb-6 h-4 w-48 rounded shimmer-bg" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 w-40 rounded shimmer-bg" />
                <div className="h-3 flex-1 rounded-full shimmer-bg" />
                <div className="h-4 w-20 rounded shimmer-bg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry skeleton */}
      <div className="columns-1 gap-6 lg:columns-2 xl:columns-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-charcoal-100"
          >
            <div className="flex items-center justify-between bg-charcoal-800 px-5 py-3.5">
              <div className="h-4 w-28 rounded shimmer-bg" />
              <div className="h-5 w-16 rounded-full shimmer-bg" />
            </div>
            <div className="p-5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="mb-3 flex items-center justify-between">
                  <div className="h-4 w-32 rounded shimmer-bg" />
                  <div className="h-4 w-16 rounded shimmer-bg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
