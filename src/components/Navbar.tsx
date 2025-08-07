import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Navbar() {
  return (
    <nav className="neo-nav sticky top-0 z-50">
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
            <Link
              href="/connect"
              className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
            >
              👥 Connect
            </Link>
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
