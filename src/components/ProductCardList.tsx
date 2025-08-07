// take in all products given and display them in a list
// get user

import { Product } from "@/db/schema";
import { getUserUpvotes } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "./ProductCard";

export default async function ProductCardList({
  products,
}: {
  products: Product[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  const userUpvoted = user
    ? await getUserUpvotes(
        user.id,
        products.map((p) => p.id)
      )
    : new Set<string>();
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product as Product & { upvoteCount: number }}
          isLoggedIn={isLoggedIn}
          userUpvoted={userUpvoted.has(product.id)}
        />
      ))}
    </div>
  );
}
