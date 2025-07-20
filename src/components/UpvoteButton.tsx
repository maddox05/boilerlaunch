"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upvote, unvote } from "@/lib/actions";

interface UpvoteButtonProps {
  productId: string;
  initialUpvoteCount: number;
  initialUserUpvoted: boolean;
  isLoggedIn: boolean;
}

export default function UpvoteButton({
  productId,
  initialUpvoteCount,
  initialUserUpvoted,
  isLoggedIn,
}: UpvoteButtonProps) {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [userUpvoted, setUserUpvoted] = useState(initialUserUpvoted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      // Create a more elegant modal or toast instead of alert
      const shouldSignIn = confirm(
        "Please sign in to upvote this product. Would you like to go to the homepage to sign in?"
      );
      if (shouldSignIn) {
        router.push("/");
      }
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const { data } = await upvote(productId);

      if (data) {
        if (userUpvoted) {
          setUpvoteCount((prev) => prev - 1);
          setUserUpvoted(false);
        } else {
          setUpvoteCount((prev) => prev + 1);
          setUserUpvoted(true);
        }
        router.refresh();
      } else {
        console.error("Failed to toggle upvote");
      }
    } catch (error) {
      console.error("Error toggling upvote:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={loading}
      className={`neo-upvote flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 min-w-[90px] group ${
        userUpvoted ? "neo-upvote-active" : ""
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="text-2xl mb-1 transition-transform duration-200 group-hover:scale-110">
        {userUpvoted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </div>

      {loading ? (
        <div className="w-4 h-4 mb-1">
          <svg
            className="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="text-lg font-bold mb-1">{upvoteCount}</div>
      )}

      <div className="text-xs font-medium opacity-70">
        {upvoteCount === 1 ? "upvote" : "upvotes"}
      </div>
    </button>
  );
}
