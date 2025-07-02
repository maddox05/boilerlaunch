import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { upvotes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if user already upvoted this product
    const existingUpvote = await db
      .select()
      .from(upvotes)
      .where(and(eq(upvotes.productId, productId), eq(upvotes.userId, user.id)))
      .limit(1);

    if (existingUpvote.length > 0) {
      return NextResponse.json(
        { error: "You have already upvoted this product" },
        { status: 400 }
      );
    }

    // Create the upvote
    const result = await db
      .insert(upvotes)
      .values({
        productId,
        userId: user.id,
      })
      .returning();

    return NextResponse.json({ upvote: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating upvote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Delete the upvote
    const result = await db
      .delete(upvotes)
      .where(and(eq(upvotes.productId, productId), eq(upvotes.userId, user.id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Upvote not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting upvote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
