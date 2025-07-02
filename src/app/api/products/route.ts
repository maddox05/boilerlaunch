import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { products } from "@/db/schema";

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
    const { title, shortDescription, imageUrl, projectUrl, tags, slug } = body;

    // Validate required fields
    if (!title || !shortDescription || !imageUrl || !projectUrl || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate project URL
    if (!projectUrl.startsWith("https://")) {
      return NextResponse.json(
        { error: "Project URL must start with https://" },
        { status: 400 }
      );
    }

    // Insert the product
    const result = await db
      .insert(products)
      .values({
        title,
        shortDescription,
        imageUrl,
        projectUrl,
        tags: tags || [],
        slug,
        userId: user.id,
      })
      .returning();

    return NextResponse.json({ product: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle unique constraint violation (slug already exists)
    if (error instanceof Error && error.message.includes("unique")) {
      return NextResponse.json(
        { error: "A product with this title already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
