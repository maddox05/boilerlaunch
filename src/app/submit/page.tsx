import { createClient } from "@/lib/supabase/server";
import SubmitForm from "@/components/SubmitForm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SubmitPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // TypeScript assertion: at this point we know user is not null
  const authenticatedUser = user;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="neo-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gradient">
              🚀 BoilerLaunch
            </Link>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purdue-gold)] to-[var(--purdue-gold-dark)] flex items-center justify-center text-white font-semibold text-sm">
                  {authenticatedUser.user_metadata?.full_name?.[0] ||
                    authenticatedUser.email?.[0] ||
                    "U"}
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {authenticatedUser.user_metadata?.full_name?.split(" ")[0] ||
                    "User"}
                </span>
              </div>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
                style={{
                  backgroundColor: "#000000 !important",
                  color: "#ffffff !important",
                  border: "none !important",
                  textDecoration: "none !important",
                }}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="#ffffff"
                  viewBox="0 0 24 24"
                  style={{
                    color: "#ffffff !important",
                    stroke: "#ffffff !important",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m0 7h18"
                    stroke="#ffffff"
                  />
                </svg>
                <span style={{ color: "#ffffff !important" }}>
                  Back to Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="neo-hero py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            Submit Your <span className="text-gradient">Product</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Share your amazing project with the Purdue community. All
            submissions are instantly live!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="neo-card p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--purdue-gold)] to-[var(--purdue-gold-dark)] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Product Details
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Tell us about your project
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-[var(--surface-accent)] rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[var(--success)] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Instantly Live
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[var(--info)] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Community Driven
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[var(--warning)] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Get Discovered
                </span>
              </div>
            </div>
          </div>

          <SubmitForm user={authenticatedUser} />
        </div>
      </div>
    </div>
  );
}
