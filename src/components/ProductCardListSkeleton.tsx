import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductCardListSkeletonProps {
  count?: number;
}

export default function ProductCardListSkeleton({
  count = 3,
}: ProductCardListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
