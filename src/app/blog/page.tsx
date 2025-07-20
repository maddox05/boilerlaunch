"use client";

import Script from "next/script";

declare global {
  interface Window {
    blogbott_initializePage?: () => void;
  }
}

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 space-y-8">
      <Script
        src="https://blogbott.com/aiblog.js"
        strategy="afterInteractive"
        onReady={() => {
          // The onReady event fires every time the component is mounted,
          // which is exactly what's needed for client-side navigation.
          // We check if the function exists on the window object before calling it.
          if (typeof window.blogbott_initializePage === "function") {
            window.blogbott_initializePage();
          }
        }}
      />
      <div id="blogbott.com_app" />
    </div>
  );
}
