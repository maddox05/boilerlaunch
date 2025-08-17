"use client";
import React from "react";
import StartupShowcase from "@/components/quiz/StartupShowcase";

const SuccessStoriesPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="border-b border-[var(--border-light)] bg-[var(--surface)] pt-28 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            Boilermaker <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover how Purdue entrepreneurs have transformed industries and
            built enduring companies.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              From Boilermaker to Breakthrough
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Join the ranks of successful Purdue entrepreneurs who have
              transformed industries and created lasting impact.
            </p>
          </div>
          <StartupShowcase />
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
