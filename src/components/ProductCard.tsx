import Link from "next/link";
import { Product } from "@/db/schema";
import UpvoteButton from "@/components/UpvoteButton";

interface ProductCardProps {
  product: Product & { upvoteCount: number };
  isLoggedIn?: boolean;
  userUpvoted?: boolean;
}

export default function ProductCard({
  product,
  isLoggedIn = false,
  userUpvoted = false,
}: ProductCardProps) {
  return (
    <div className="neo-card group p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Upvote Button */}
        <div className="flex-shrink-0">
          <UpvoteButton
            productId={product.id}
            initialUpvoteCount={product.upvoteCount}
            initialUserUpvoted={userUpvoted}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Product Content */}
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`} className="block group/link">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover/link:text-[var(--purdue-gold-dark)] transition-colors line-clamp-1">
              {product.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </Link>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--surface-accent)] text-[var(--text-secondary)] border border-[var(--border-light)]"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--surface-accent)] text-[var(--text-secondary)] border border-[var(--border-light)]">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Stats & Date */}
        <div className="flex-shrink-0 text-right">
          <div className="flex flex-col items-end space-y-2">
            {/* Featured Badge */}
            {new Date(product.createdAt).toDateString() ===
              new Date().toDateString() && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-[var(--purdue-gold)] text-white">
                NEW
              </span>
            )}

            {/* Date */}
            <div className="text-xs text-[var(--text-muted)] font-medium">
              {new Date(product.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>

            {/* Visit Button */}
            <a
              href={product.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--surface-accent)] text-[var(--text-primary)] border border-[var(--border-medium)] hover:bg-[var(--purdue-gold-light)] hover:border-[var(--purdue-gold)] transition-all duration-200"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
