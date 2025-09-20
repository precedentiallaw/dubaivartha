import { cn } from "@/lib/utils"

function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Article Card Skeleton
function ArticleCardSkeleton({ variant = "default" }: { variant?: "default" | "featured" | "compact" }) {
  if (variant === "featured") {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="aspect-video w-full" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton className="h-6 w-full" />
          <LoadingSkeleton className="h-6 w-3/4" />
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-2/3" />
          <div className="flex items-center space-x-4 pt-2">
            <LoadingSkeleton className="h-3 w-16" />
            <LoadingSkeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-3">
        <LoadingSkeleton className="w-16 h-16 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-3 w-16" />
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-3/4" />
          <div className="flex items-center space-x-3">
            <LoadingSkeleton className="h-3 w-12" />
            <LoadingSkeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <LoadingSkeleton className="aspect-video w-full" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-16" />
        <LoadingSkeleton className="h-5 w-full" />
        <LoadingSkeleton className="h-5 w-4/5" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <LoadingSkeleton className="h-3 w-12" />
            <LoadingSkeleton className="h-3 w-10" />
          </div>
          <LoadingSkeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// News Grid Skeleton
function NewsGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured Article Skeleton */}
      <div>
        <LoadingSkeleton className="h-8 w-48 mb-4" />
        <ArticleCardSkeleton variant="featured" />
      </div>
      
      {/* Articles Grid Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <LoadingSkeleton className="h-8 w-32" />
          <LoadingSkeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { LoadingSkeleton, ArticleCardSkeleton, NewsGridSkeleton };