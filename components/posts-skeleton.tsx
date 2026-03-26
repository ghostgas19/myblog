export function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
      {/* Featured skeleton */}
      <div className="md:col-span-2 bg-card border border-border rounded-sm overflow-hidden animate-pulse">
        <div className="h-4 bg-film-strip" />
        <div className="h-52 bg-muted" />
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="h-4 w-20 bg-muted rounded-sm" />
            <div className="h-4 w-28 bg-muted rounded-sm" />
          </div>
          <div className="h-6 w-3/4 bg-muted rounded-sm" />
          <div className="h-4 w-full bg-muted rounded-sm" />
          <div className="h-4 w-5/6 bg-muted rounded-sm" />
        </div>
      </div>
      {/* Regular skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-sm overflow-hidden animate-pulse">
          <div className="h-4 bg-film-strip" />
          <div className="h-40 bg-muted" />
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-muted rounded-sm" />
              <div className="h-4 w-24 bg-muted rounded-sm" />
            </div>
            <div className="h-5 w-4/5 bg-muted rounded-sm" />
            <div className="h-4 w-full bg-muted rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  )
}
