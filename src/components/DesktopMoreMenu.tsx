"use client";

import Link from "next/link";

export default function DesktopMoreMenu() {
  return (
    <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
      <Link
        href="/success-stories"
        className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)]/80"
      >
        Success Stories
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)]/80"
      >
        About
      </Link>
      <Link
        href="/resources"
        className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)]/80"
      >
        Resources
      </Link>
    </div>
  );
}
