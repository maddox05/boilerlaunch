import Link from "next/link";
import { db } from "@/db";
import { products, upvotes } from "@/db/schema";
import { desc, eq, count, gte, and, inArray } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getTodayProducts() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    .where(gte(products.createdAt, today))
    .groupBy(products.id)
    .orderBy(desc(count(upvotes.id)));

  return result;
}

async function getAllProducts() {
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
    .groupBy(products.id)
    .orderBy(desc(count(upvotes.id)));

  return result;
}

async function getUserUpvotes(userId: string, productIds: string[]) {
  if (!userId || productIds.length === 0) return new Set<string>();

  const userUpvotesList = await db
    .select({ productId: upvotes.productId })
    .from(upvotes)
    .where(
      and(eq(upvotes.userId, userId), inArray(upvotes.productId, productIds))
    );

  return new Set(userUpvotesList.map((uv) => uv.productId));
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Senior",
    content:
      "BoilerLaunch helped me discover amazing student projects I never knew existed. Found my co-founder here!",
    avatar:
      "https://i1.rgstatic.net/ii/profile.image/681299144609792-1539445782047_Q512/Asra-Shaik-2.jpg",
  },
  {
    name: "Alex Rodriguez",
    role: "ECE Graduate Student",
    content:
      "Perfect platform to showcase my research projects and get feedback from the Purdue community.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Dr. Lisa Thompson",
    role: "Faculty, Computer Science",
    content:
      "I love seeing what our students are building. This platform showcases the innovation happening at Purdue.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const todayProducts = await getTodayProducts();
  const allProducts = await getAllProducts();

  // Get user upvotes
  const allProductIds = [...todayProducts, ...allProducts].map((p) => p.id);
  const userUpvotedSet = user
    ? await getUserUpvotes(user.id, allProductIds)
    : new Set<string>();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* Compact Header */}
      <section className="border-b border-[var(--border-light)] bg-[var(--surface)] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              Discover the best projects from{" "}
              <span className="text-gradient">Purdue</span>
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
              Community-driven platform for Purdue student & faculty innovations
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Launched Today */}
        {todayProducts.length > 0 && (
          <section className="mb-20" id="today">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  🔥 Launched Today
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Fresh projects from the Purdue community
                </p>
              </div>
              <span className="status-hot inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                {todayProducts.length} new today
              </span>
            </div>
            <div className="space-y-4">
              {todayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLoggedIn={!!user}
                  userUpvoted={userUpvotedSet.has(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section id="products">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                All Products
              </h2>
              <p className="text-[var(--text-secondary)]">
                Sorted by community upvotes
              </p>
            </div>
            {allProducts.length > 0 && (
              <span className="status-trending inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                {allProducts.length} projects
              </span>
            )}
          </div>

          {allProducts.length > 0 ? (
            <div className="space-y-4">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLoggedIn={!!user}
                  userUpvoted={userUpvotedSet.has(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="neo-card text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  No products yet
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Be the first to share your amazing project with the Purdue
                  community!
                </p>
                {user ? (
                  <Link
                    href="/submit"
                    className="neo-btn-primary inline-flex items-center px-6 py-3 rounded-lg font-semibold"
                  >
                    Submit the First Product
                  </Link>
                ) : (
                  <p className="text-[var(--text-muted)]">
                    Sign in to submit the first product!
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="mb-16" id="testimonials">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              What the Purdue Community Says
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
              Hear from students, faculty, and researchers (fake for now)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="neo-testimonial p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-[var(--purdue-gold)]"
                  />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
