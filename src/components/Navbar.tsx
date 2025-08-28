import Link from "next/link";
import AuthButton from "./AuthButton";
import MobileMenu from "./MobileMenu";
import DesktopMoreMenu from "./DesktopMoreMenu";

export default async function Navbar() {
  return (
    <nav className="neo-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gradient"
            >
              🚀 BoilerLaunchpad
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <DesktopMoreMenu />
            <Link
              href="/submit"
              className="hidden sm:inline-flex neo-btn-primary items-center px-4 py-2 rounded-lg text-sm font-semibold"
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
            <AuthButton />
            {/* Mobile menu trigger */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
