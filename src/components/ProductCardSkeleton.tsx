export default function ProductCardSkeleton() {
  return (
    <div className="neo-card p-6 animate-pulse">
      <div className="flex items-center gap-6">
        {/* Upvote Button Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-12 h-16 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Product Image Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Product Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-1 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-14 h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="flex-shrink-0 text-right">
          <div className="flex flex-col items-end space-y-2">
            <div className="w-8 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
