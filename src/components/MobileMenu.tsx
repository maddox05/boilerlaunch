"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden relative">
      <button
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center justify-center p-2 rounded-md border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--surface)] focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="neo-menu absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-[var(--border-light)] bg-[var(--surface)] shadow-lg z-50"
        >
          <div className="py-2">
            <Link
              href="/success-stories"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Success Stories
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <hr className="my-2 border-[var(--border-light)]" />
            <Link
              href="/submit"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Submit Product
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
