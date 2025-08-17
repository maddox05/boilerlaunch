"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function DesktopMoreMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative hidden sm:block" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center px-3 py-2 rounded-md border border-[var(--border-light)] bg-white/70 hover:bg-white/90 text-[var(--purdue-black)]"
      >
        More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-1 h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="neo-menu absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-[var(--border-light)] bg-[var(--surface)] shadow-lg z-50">
          <div className="py-2">
            <Link
              href="/success-stories"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              Success Stories
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              Resources
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
