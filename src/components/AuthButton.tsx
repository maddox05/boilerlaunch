"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) {
    return <div className="skeleton w-24 h-10 rounded-lg"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purdue-gold)] to-[var(--purdue-gold-dark)] flex items-center justify-center text-white font-semibold text-sm">
            {user.user_metadata?.full_name?.[0] || user.email?.[0] || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {user.user_metadata?.full_name?.split(" ")[0] || "User"}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {user.email}
            </span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="neo-btn-secondary inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium"
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
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
    >
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Sign in with Google
    </button>
  );
}
