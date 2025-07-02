import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { products, upvotes } from "@/db/schema";
import { eq, count, and } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import UpvoteButton from "@/components/UpvoteButton";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      shortDescription: products.shortDescription,
      imageUrl: products.imageUrl,
      projectUrl: products.projectUrl,
      tags: products.tags,
      slug: products.slug,
      createdAt: products.createdAt,
      userId: products.userId,
      upvoteCount: count(upvotes.id),
    })
    .from(products)
    .leftJoin(upvotes, eq(products.id, upvotes.productId))
    .where(eq(products.slug, slug))
    .groupBy(products.id);

  return result[0] || null;
}

async function getUserUpvote(productId: string, userId?: string) {
  if (!userId) return null;

  const result = await db
    .select()
    .from(upvotes)
    .where(and(eq(upvotes.productId, productId), eq(upvotes.userId, userId)))
    .limit(1);

  return result[0] || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userUpvote = await getUserUpvote(product.id, user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--surface-accent)] to-[var(--background)]">
      {/* Navigation */}
      <nav className="neo-nav sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gradient">
              🚀 BoilerLaunch
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m0 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 neo-hero opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--purdue-gold)]/10 border border-[var(--purdue-gold)]/20 mb-6">
                <svg
                  className="w-4 h-4 mr-2 text-[var(--purdue-gold)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-[var(--purdue-gold)]">
                  Featured Project
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--purdue-gold)] to-[var(--text-primary)] mb-6 leading-tight">
              {product.title}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto">
              {product.shortDescription}
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--purdue-gold)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {product.upvoteCount}
                </span>
                <span className="text-[var(--text-secondary)]">upvotes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--purdue-gold)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[var(--text-secondary)]">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Product Image */}
            <div className="neo-card p-6 mb-8 group">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                <div className="bg-white rounded-lg p-4 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </div>

            {/* About Section */}
            <div className="neo-card p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[var(--purdue-gold)] to-[var(--accent)] rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  About This Project
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  {product.shortDescription}
                </p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="neo-card p-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[var(--accent)] to-[var(--purdue-gold)] rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Categories
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="neo-tag inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--surface-accent)] to-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--purdue-gold)]/30 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-2">
            {/* Main Action Card */}
            <div className="neo-card p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--purdue-gold)]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                      Support This Project
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Show your appreciation
                    </p>
                  </div>
                  <UpvoteButton
                    productId={product.id}
                    initialUpvoteCount={product.upvoteCount}
                    initialUserUpvoted={!!userUpvote}
                    isLoggedIn={!!user}
                  />
                </div>

                {/* Enhanced Project Link */}
                <a
                  href={product.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-primary w-full inline-flex items-center justify-center py-4 rounded-xl font-bold text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--purdue-gold)] to-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <svg
                    className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform"
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
                  Visit Project
                </a>
              </div>
            </div>

            {/* Enhanced Stats Card */}
            <div className="neo-card p-8 mb-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                Project Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-accent)]">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--purdue-gold)]/10 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--purdue-gold)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)] font-medium">
                      Upvotes
                    </span>
                  </div>
                  <span className="font-bold text-xl text-[var(--text-primary)]">
                    {product.upvoteCount}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-accent)]">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--accent)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)] font-medium">
                      Launched
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-accent)]">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--success)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)] font-medium">
                      Categories
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {product.tags?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Share Card */}
            <div className="neo-card p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                Share This Project
              </h3>
              <div className="space-y-3">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Check out ${product.title} on BoilerLaunch! 🚀`
                  )}&url=${encodeURIComponent(
                    `https://yourdomain.com/product/${product.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-secondary w-full flex items-center justify-center py-3 rounded-lg font-semibold group hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Share on Twitter
                </Link>
                <button className="neo-btn-secondary w-full flex items-center justify-center py-3 rounded-lg font-semibold group hover:scale-105 transition-transform">
                  <svg
                    className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
