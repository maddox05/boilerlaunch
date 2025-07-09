"use server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function searchWeb(prompt: string): Promise<string> {
  const searchPrompt = `${prompt}`;

  const completion = await openai.responses.create({
    model: "gpt-4o",
    tools: [{ type: "web_search_preview", search_context_size: "high" }],
    tool_choice: "required",
    input: searchPrompt,
  });

  return completion.output_text;
}

export async function fixJson(json: string, prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "user",
        content: json,
      },
    ],
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
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
