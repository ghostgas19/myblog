export default function AdminLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-36 bg-muted rounded-sm animate-pulse" />
          <div className="h-3 w-52 bg-muted rounded-sm animate-pulse" />
        </div>
        <div className="h-9 w-32 bg-muted rounded-sm animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-card border border-border rounded-sm animate-pulse" />
        ))}
      </div>
      <div className="bg-card border border-border rounded-sm overflow-hidden animate-pulse">
        <div className="h-3 bg-film-strip" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-border/50 flex gap-4 items-center">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded-sm" />
              <div className="h-3 w-16 bg-muted rounded-sm" />
            </div>
            <div className="h-4 w-20 bg-muted rounded-sm" />
            <div className="h-4 w-24 bg-muted rounded-sm" />
            <div className="flex gap-1.5 ml-auto">
              <div className="h-7 w-7 bg-muted rounded-sm" />
              <div className="h-7 w-7 bg-muted rounded-sm" />
              <div className="h-7 w-7 bg-muted rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
