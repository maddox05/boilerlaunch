"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface SubmitFormProps {
  user: User;
}

const categories = [
  "CS",
  "Engineering",
  "Design",
  "Data Science",
  "Hackathons",
  "Research",
  "Study Tools",
  "Web Apps",
  "Mobile Apps",
  "Games",
  "Hardware",
  "Startups",
];

export default function SubmitForm({ user }: SubmitFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    imageUrl: "",
    projectUrl: "",
    tags: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (!formData.projectUrl.trim()) {
      newErrors.projectUrl = "Project URL is required";
    } else if (!formData.projectUrl.startsWith("https://")) {
      newErrors.projectUrl = "Project URL must start with https://";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const slug = formData.title.toLowerCase().replaceAll(" ", "-");

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug,
          userId: user.id,
        }),
      });

      if (response.ok) {
        router.push(`/product/${slug}`);
      } else {
        const error = await response.text();
        setErrors({ submit: error || "Failed to submit product" });
      }
    } catch {
      setErrors({ submit: "Failed to submit product" });
    } finally {
      setLoading(false);
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-[var(--text-primary)] mb-3"
        >
          Product Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="neo-input w-full px-4 py-3 rounded-lg text-base"
          placeholder="Your Amazing Product Name"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-[var(--error)]">{errors.title}</p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-[var(--text-primary)] mb-3"
        >
          Short Description *
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.shortDescription}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              shortDescription: e.target.value,
            }))
          }
          className="neo-input w-full px-4 py-3 rounded-lg text-base resize-none"
          placeholder="Brief description of what your product does and why it's awesome..."
        />
        {errors.shortDescription && (
          <p className="mt-2 text-sm text-[var(--error)]">
            {errors.shortDescription}
          </p>
        )}
      </div>

      {/* Project URL */}
      <div>
        <label
          htmlFor="projectUrl"
          className="block text-sm font-semibold text-[var(--text-primary)] mb-3"
        >
          Project URL *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <input
            type="url"
            id="projectUrl"
            value={formData.projectUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, projectUrl: e.target.value }))
            }
            className="neo-input w-full pl-12 pr-4 py-3 rounded-lg text-base"
            placeholder="https://your-product.com"
          />
        </div>
        {errors.projectUrl && (
          <p className="mt-2 text-sm text-[var(--error)]">
            {errors.projectUrl}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-semibold text-[var(--text-primary)] mb-3"
        >
          Image URL *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
            className="neo-input w-full pl-12 pr-4 py-3 rounded-lg text-base"
            placeholder="https://example.com/your-product-image.png"
          />
        </div>
        {errors.imageUrl && (
          <p className="mt-2 text-sm text-[var(--error)]">{errors.imageUrl}</p>
        )}
        {formData.imageUrl && (
          <div className="mt-4 p-4 bg-[var(--surface-accent)] rounded-lg">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
              Preview:
            </p>
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="h-40 w-auto rounded-lg border border-[var(--border-medium)] shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Tags/Categories */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
          Categories (select up to 3)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleTagToggle(category)}
              disabled={
                !formData.tags.includes(category) && formData.tags.length >= 3
              }
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                formData.tags.includes(category)
                  ? "neo-tag-selected border-[var(--purdue-gold-dark)]"
                  : "neo-tag border-[var(--border-light)] hover:border-[var(--purdue-gold)] disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {formData.tags.length > 0 && (
          <div className="mt-4 p-4 bg-[var(--surface-accent)] rounded-lg">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
              Selected categories:
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--purdue-gold)] text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="ml-2 w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-[var(--border-light)]">
        {errors.submit && (
          <div className="mb-6 p-4 bg-[var(--error-light)] border border-[var(--error)] rounded-lg">
            <p className="text-sm text-[var(--error)]">{errors.submit}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="neo-btn-primary w-full py-4 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Submitting...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Submit Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}
