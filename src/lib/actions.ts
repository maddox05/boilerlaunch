"use server";
import { db } from "@/db";
import { products, upvotes, NewProduct } from "@/db/schema";
import { desc, eq, count, gte, and, inArray } from "drizzle-orm";
import { createClient } from "./supabase/server";

// Type for product submission without userId (will be added from auth)
type ProductSubmission = Omit<NewProduct, "userId">;

export async function getTodayProducts() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({
      id: products.id,
      title: products.title,
      shortDescription: products.shortDescription,
      imageUrl: products.imageUrl,
      projectUrl: products.projectUrl,
      linkedinUrl: products.linkedinUrl,
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

export async function getAllProducts() {
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
      linkedinUrl: products.linkedinUrl,
    })
    .from(products)
    .leftJoin(upvotes, eq(products.id, upvotes.productId))
    .groupBy(products.id)
    .orderBy(desc(count(upvotes.id)));

  return result;
}

export async function getUserUpvotes(userId: string, productIds: string[]) {
  if (!userId || productIds.length === 0) return new Set<string>();

  const userUpvotesList = await db
    .select({ productId: upvotes.productId })
    .from(upvotes)
    .where(
      and(eq(upvotes.userId, userId), inArray(upvotes.productId, productIds))
    );

  return new Set(userUpvotesList.map((uv) => uv.productId));
}

export async function upvote(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("unauthorized");
  }

  // Check if user already upvoted this product
  const existingUpvote = await db
    .select()
    .from(upvotes)
    .where(and(eq(upvotes.productId, productId), eq(upvotes.userId, user.id)))
    .limit(1);

  if (existingUpvote.length > 0) {
    throw new Error("You have already upvoted this product");
  }

  // Create the upvote
  return await db
    .insert(upvotes)
    .values({
      productId,
      userId: user.id,
    })
    .returning();
}

export async function unvote(productId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("unauthorized");
    }
    if (!productId) {
      throw new Error("product id is required");
    }

    // Delete the upvote
    const result = await db
      .delete(upvotes)
      .where(and(eq(upvotes.productId, productId), eq(upvotes.userId, user.id)))
      .returning();

    if (result.length === 0) {
      throw new Error("Upvote not found");
    }

    return true;
  } catch (error) {
    console.error("Error deleting upvote:", error);
    throw new Error("Internal server error");
  }
}

export async function submitProduct(product: ProductSubmission) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("unauthorized");
    }

    const {
      title,
      shortDescription,
      imageUrl,
      projectUrl,
      linkedinUrl,
      tags,
      slug,
    } = product;

    // Validate project URL
    if (!projectUrl.startsWith("https://")) {
      throw new Error("Project URL must start with https://");
    }

    // Validate LinkedIn URL
    if (!linkedinUrl.startsWith("https://")) {
      throw new Error("LinkedIn URL must start with https://");
    }

    // Insert the product
    const result = await db
      .insert(products)
      .values({
        title,
        shortDescription,
        imageUrl,
        projectUrl,
        linkedinUrl,
        tags: tags || [],
        slug,
        userId: user.id,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle unique constraint violation (slug already exists)
    if (error instanceof Error && error.message.includes("unique")) {
      throw new Error("A product with this title already exists");
    }

    throw new Error("Internal server error");
  }
}

export async function getUsersProducts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    throw new Error("User not found");
  }
  const res = await db
    .select()
    .from(products)
    .where(eq(products.userId, user.id));
  return res;
}
