import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Redirect with a full page refresh by using a 302 redirect
  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    {
      status: 302,
    }
  );
}
