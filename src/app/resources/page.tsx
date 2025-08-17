"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Updated resource URLs to match the quiz logic
const resourceLinks = {
  certificateEntr: "https://www.purdue.edu/entr/",
  moonshot: "https://purdueinnovates.org/events/moonshot/",
  firestarter: "https://purdueinnovates.org/start/firestarter/",
  librariesGuide: "https://guides.lib.purdue.edu/entrepreneurship",
  marketReadiness: "https://purdueinnovates.org/start/market-readiness/",
  otc: "https://www.prf.org/otc/",
  newVentureChallenge:
    "https://purdueinnovates.org/start/new-venture-challenge/",
  traskFund: "https://purdueinnovates.org/venture/trask-innovation-fund/",
  ventureInnovateFund: "https://purdueinnovates.org/venture/venture-funding/",
  iCorps:
    "https://www.purdue.edu/research/oevprp/funding-and-grant-resources/nsf-i-corps/",
  innovationPartners: "https://partnersforinnovation.org",
  svbig: "https://svbig.org/",
  yc: "https://www.ycombinator.com/",
  techstars: "https://www.techstars.com/",
  carta: "https://carta.com/",
  eir: "https://www.purdue.edu/learningcommunities/profiles/University-wide%20LCs/EIR.html",
};

const ResourcesPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Startup Resources
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Browse our curated collection of Purdue and external resources for
            startups at every stage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">
                🔎
              </span>
              <input
                className="neo-input w-full rounded-lg pl-8 pr-3 py-2"
                placeholder="Search resources..."
              />
            </div>
            <button
              onClick={() => router.push("/quiz/start")}
              className="neo-btn-primary whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
            >
              Take Assessment <span>→</span>
            </button>
          </div>
        </div>

        {/* Purdue Resources Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Purdue University Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Certificate in Entrepreneurship & Innovation */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Certificate in Entrepreneurship & Innovation
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Five-course program open to all majors
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  A comprehensive program that provides foundational
                  entrepreneurship knowledge across five courses, open to
                  students from all academic backgrounds.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    All Majors
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Foundational
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Certificate
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() =>
                    window.open(resourceLinks.certificateEntr, "_blank")
                  }
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Entrepreneur in Residence Learning Community */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Entrepreneur in Residence Learning Community
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Residential community for aspiring entrepreneurs
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  A living-learning community that connects students interested
                  in entrepreneurship with mentors, resources, and like-minded
                  peers.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Community
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Mentorship
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Residential
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.eir, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Firestarter Bootcamp */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold">Firestarter Bootcamp</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  6-week cohort program
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Intensive program focused on finding product-market fit and
                  de-risking your startup through validation and customer
                  discovery.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Product-Market Fit
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Validation
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    6 Weeks
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() =>
                    window.open(resourceLinks.firestarter, "_blank")
                  }
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* New Venture Challenge */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold">New Venture Challenge</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Multi-stage competition
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  A comprehensive competition for market-ready startups with
                  significant prizes and investor connections.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Competition
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Prizes
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Market Ready
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() =>
                    window.open(resourceLinks.newVentureChallenge, "_blank")
                  }
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Moonshot Pitch Competition */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">5</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Moonshot Pitch Competition
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Low-barrier ideation event
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Entry-level competition with a $5,500 prize pool, perfect for
                  testing early concepts and innovative ideas.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Early Stage
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    $5,500 Prize
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Innovation
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.moonshot, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Market Readiness Program */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">6</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Market Readiness Program
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Value proposition and pitching preparation
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Helps students clarify their value proposition and prepare for
                  pitching to investors and stakeholders.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Pitching
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Value Prop
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Preparation
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() =>
                    window.open(resourceLinks.marketReadiness, "_blank")
                  }
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Office of Technology Commercialization */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">7</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Office of Technology Commercialization
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Patenting and licensing support
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Assists in patenting and licensing Purdue inventions and
                  technologies for commercial applications.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Patents
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Licensing
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    IP
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.otc, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Trask Innovation Fund */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">8</span>
                </div>
                <h3 className="text-lg font-semibold">Trask Innovation Fund</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Up to $100,000 for IP-driven ventures
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Provides funding up to $100,000 for IP-driven ventures with
                  strong commercial potential.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    $100K Funding
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    IP-Driven
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Commercial
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.traskFund, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* SVBIG Card */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--purdue-gold-light)",
                    color: "var(--purdue-black)",
                  }}
                >
                  <span className="font-bold">9</span>
                </div>
                <h3 className="text-lg font-semibold">
                  Silicon Valley Boilermaker Innovation Group (SVBIG)
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  SV entrepreneurial thinking + Boilermaker Innovation Group
                  mindset
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Accelerator program connecting Purdue startups with Silicon
                  Valley entrepreneurial thinking and the Boilermaker Innovation
                  Group mindset.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Accelerator
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Boilermaker
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    SV Thinking
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.svbig, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* External Resources Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">External Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Y Combinator Card */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--surface-accent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="font-bold">YC</span>
                </div>
                <h3 className="text-lg font-semibold">Y Combinator</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  World-renowned accelerator
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  The most prestigious startup accelerator, providing funding,
                  mentorship, and access to an extensive alumni network.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Accelerator
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Demo Day
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Global
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.yc, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Techstars Card */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--surface-accent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="font-bold">TS</span>
                </div>
                <h3 className="text-lg font-semibold">Techstars</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Global accelerator network
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Worldwide network helping entrepreneurs succeed with
                  mentorship-driven accelerator programs across multiple cities.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Mentorship
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Network
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Global
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.techstars, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Carta Card */}
            <div className="neo-card p-6">
              <div className="mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "var(--surface-accent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="font-bold">C</span>
                </div>
                <h3 className="text-lg font-semibold">Carta</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Equity management platform
                </p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">
                  Platform for managing cap tables, equity plans, and
                  fundraising documents. Essential for startups raising funding.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Cap Table
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Equity
                  </span>
                  <span className="neo-tag px-2 py-1 rounded-full text-xs">
                    Legal
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="neo-btn-secondary w-full px-4 py-2 rounded-lg font-semibold"
                  onClick={() => window.open(resourceLinks.carta, "_blank")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-secondary)] mb-6">
            Not sure which resource is right for you? Take our diagnostic
            assessment to get personalized recommendations.
          </p>
          <button
            onClick={() => router.push("/quiz/start")}
            className="neo-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
          >
            Get Personalized Recommendations <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
