"use client";

import { useState } from "react";

interface LinkedinFinderProps {
  project_links: string[];
}

export default function LinkedinFinder({ project_links }: LinkedinFinderProps) {
  const [selectedProject, setSelectedProject] = useState<string>(
    project_links[0] ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { url: string; description?: string }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  console.log(results);

  async function findConnections() {
    if (!selectedProject) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectUrl: selectedProject }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Something went wrong");
        throw new Error(data.error || "Something went wrong");
      }

      let parsed: { url: string; description?: string }[] = [];

      // Attempt to parse JSON, otherwise fall back to newline-separated list
      try {
        parsed = JSON.parse(data.results);
      } catch {
        parsed = String(data.results)
          .split("\n")
          .filter(Boolean)
          .map((line: string) => ({ url: line.trim() }));
      }

      setResults(parsed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="neo-card p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gradient">LinkedIn Finder</h2>

      {/* Project Selector */}
      <div>
        <label
          htmlFor="project-select"
          className="block text-sm font-medium mb-2"
        >
          Choose a project
        </label>
        <select
          id="project-select"
          className="neo-input w-full px-3 py-2 rounded-md"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {project_links.map((link) => (
            <option key={link} value={link}>
              {link}
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="neo-btn-primary inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        disabled={loading || !selectedProject}
        onClick={findConnections}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 mr-2"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
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
              d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
            />
          </svg>
        )}
        {loading ? "Searching..." : "Find Connections"}
      </button>

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block neo-card p-4 hover:shadow-md transition-all"
            >
              <p className="font-medium text-[var(--purdue-gold-dark)] break-all">
                {item.url}
              </p>
              {item.description && (
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                  {item.description}
                </p>
              )}
            </a>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <p className="text-sm text-[var(--text-muted)]">
          No connections found.
        </p>
      )}
    </div>
  );
}
