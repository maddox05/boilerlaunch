import Link from "next/link";
import AuthButton from "./AuthButton";
import { createClient } from "@/lib/supabase/server";

interface NavbarProps {
  showSubmitButton?: boolean;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  isSticky?: boolean;
}

export default async function Navbar({
  showSubmitButton = true,
  showBackButton = false,
  backButtonText = "Back to Home",
  backButtonHref = "/",
  isSticky = true,
}: NavbarProps) {
  const supabase = await createClient();
  await supabase.auth.getUser();

  return (
    <nav className={`neo-nav ${isSticky ? "sticky top-0 z-50" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-gradient">
              🚀 BoilerLaunch
            </Link>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium status-new">
                Purdue Product Hunt
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                href={backButtonHref}
                className="neo-btn-secondary inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
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
                    d="M10 19l-7-7m0 0l7-7m0 7h18"
                  />
                </svg>
                {backButtonText}
              </Link>
            )}
            {showSubmitButton && (
              <Link
                href="/submit"
                className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Submit Product
              </Link>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
