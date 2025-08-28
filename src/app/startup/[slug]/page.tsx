import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStartupBySlug, purdueStartups } from "@/data/purdueStartups";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return purdueStartups.map((s) => ({ slug: s.slug }));
}

export default function StartupPage({ params }: PageProps) {
  const startup = getStartupBySlug(params.slug);
  if (!startup) return notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="border-b border-[var(--border-light)] bg-[var(--surface)] pt-28 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            {startup.name}
          </h1>
          <p className="text-[var(--text-secondary)]">
            Founded {startup.founded} • Founders: {startup.founders}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-venture-gold mb-2">
              The Story
            </h2>
            <p className="text-[var(--text-primary)]">{startup.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-venture-gold mb-2">
              Achievements
            </h2>
            <p className="text-[var(--text-primary)]">{startup.achievements}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-venture-gold mb-2">
              Purdue Connection
            </h2>
            <p className="text-[var(--text-primary)]">
              {startup.purdueConnection}
            </p>
          </div>

          <div>
            <Link
              href={startup.link}
              target="_blank"
              className="inline-flex items-center rounded-md border border-venture-gold/40 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-venture-gold hover:text-black"
            >
              Visit startup website
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
