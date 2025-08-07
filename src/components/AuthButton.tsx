import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="neo-btn-primary inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
    >
      Login
    </Link>
  );
}
