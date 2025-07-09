import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fixJson, searchWeb } from "@/app/connect/actions";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectUrl } = await request.json();

    if (!projectUrl || typeof projectUrl !== "string") {
      return NextResponse.json(
        { error: "projectUrl is required" },
        { status: 400 }
      );
    }

    const prompt = `look up ${projectUrl} and find linkedin profiles that would want to connect with me because of this project. people who can sponsor me or want to help return it in json format {"url": "string", "description": "string"}`;

    const results = await searchWeb(prompt);
    const fixed = await fixJson(
      results,
      'please fix this json and return it in json format contacts: [{"url": "string", "description": "string"}]'
    );
    if (!fixed) {
      return NextResponse.json({ error: "No results found" }, { status: 404 });
    }
    const parsed = JSON.parse(fixed);
    const res = parsed.contacts;
    return NextResponse.json({ results: JSON.stringify(res) }, { status: 200 });
  } catch (error) {
    console.error("LinkedIn finder error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
