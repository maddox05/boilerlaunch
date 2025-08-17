import React, { useState } from "react";
import { Flag, Rocket, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Purdue-associated startup details with expanded information for articles
export const purdueStartups = [
  {
    name: "Cloudflare",
    founded: "2009",
    founders: "Matthew Prince, Lee Holloway, Michelle Zatlyn",
    description:
      "Cloudflare began as a project at Purdue University before becoming a cybersecurity giant providing CDN and DDoS protection services to millions of websites worldwide.",
    achievements:
      "Valued at over $10 billion, protecting over 25 million Internet properties.",
    purdueConnection:
      "Co-founder Lee Holloway is a Purdue Computer Science alumnus who developed early network security concepts while at Purdue.",
    link: "https://www.cloudflare.com",
  },
  {
    name: "Endocyte",
    founded: "1996",
    founders: "Philip Low",
    description:
      "Endocyte was founded to commercialize Professor Low's breakthrough research in targeted drug delivery for cancer treatment using vitamin receptors.",
    achievements:
      "Acquired by Novartis for $2.1 billion in 2018, developing precision medicines for cancer treatment.",
    purdueConnection:
      "Founded by Dr. Philip Low, Presidential Scholar for Drug Discovery and Professor of Chemistry at Purdue.",
    link: "https://www.novartis.com",
  },
  {
    name: "On-Ramp Indiana",
    founded: "2005",
    founders: "David Koehlinger",
    description:
      "On-Ramp develops wireless IoT communication technologies that enable long-range, low-power connections for industrial applications.",
    achievements:
      "Patented RPMA (Random Phase Multiple Access) technology is now used globally for smart grid and industrial IoT applications.",
    purdueConnection:
      "Technology was developed in Purdue's School of Electrical and Computer Engineering and licensed through the Purdue Research Foundation.",
    link: "https://www.purdue.edu/research/partnerships/",
  },
  {
    name: "Cook Biotech",
    founded: "1995",
    founders: "Dr. Stephen Badylak",
    description:
      "Cook Biotech commercialized extracellular matrix (ECM) technology for tissue repair and regenerative medicine applications.",
    achievements:
      "Their SIS technology has been used in over 2.5 million patient procedures globally.",
    purdueConnection:
      "Based on research from Purdue's Weldon School of Biomedical Engineering; maintains strong R&D partnership with Purdue.",
    link: "https://www.cookbiotech.com",
  },
  {
    name: "Spensa Technologies",
    founded: "2009",
    founders: "Johnny Park",
    description:
      "Spensa created precision agriculture technologies including automated pest monitoring systems and field analytics platforms.",
    achievements:
      "Acquired by DTN in 2019, their technology now helps farmers across millions of acres optimize crop protection.",
    purdueConnection:
      "Founded by former Purdue professor Johnny Park based on research from his lab in the College of Agriculture.",
    link: "https://www.dtn.com",
  },
  {
    name: "Mimir",
    founded: "2015",
    founders: "Prahasith Veluvolu, Jacobi Petrucciani, Colton Voege",
    description:
      "Mimir developed a cloud-based platform for computer science education that automates grading and detects plagiarism.",
    achievements:
      "Acquired by HackerRank in 2020, their platform has been used by over 70 universities to teach computer science.",
    purdueConnection:
      "Founded by three Purdue Computer Science students who developed the initial prototype during a hackathon at Purdue.",
    link: "https://www.hackerrank.com",
  },
];

const StartupShowcase: React.FC = () => {
  const [activeStartup, setActiveStartup] = useState<
    (typeof purdueStartups)[0] | null
  >(null);
  const router = useRouter();

  const handleViewStartupDetails = (startup: (typeof purdueStartups)[0]) => {
    // Navigate to the startup details page with the startup name as a parameter
    const startupSlug = encodeURIComponent(
      startup.name.toLowerCase().replace(/\s+/g, "-")
    );
    router.push(`/startup/${startupSlug}`);
    // Close the modal if it's open
    setActiveStartup(null);
  };

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-3 text-center text-venture-gold flex items-center justify-center gap-2">
        <Flag className="h-4 w-4" /> Purdue Launch Successes
      </h3>

      {/* Startup Grid */}
      <div className="flex justify-center gap-4 flex-wrap">
        {purdueStartups.map((startup, index) => (
          <div
            key={index}
            className="bg-black border border-venture-gold/30 rounded-lg p-3 text-center w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-0.75rem)] cursor-pointer hover:bg-venture-gold/10 transition-colors"
            onClick={() => setActiveStartup(startup)}
          >
            <div className="bg-venture-gold/20 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
              <span className="text-xs font-bold text-white">
                {startup.name.charAt(0)}
              </span>
            </div>
            <p className="font-semibold text-sm text-venture-gold">
              {startup.name}
            </p>
            <p className="text-xs text-white">Est. {startup.founded}</p>
          </div>
        ))}
      </div>

      {/* Startup Article Modal */}
      {activeStartup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-venture-gold/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Card className="bg-black border-none text-white">
              <CardHeader className="border-b border-venture-gold/20">
                <div className="flex items-center gap-3">
                  <div className="bg-venture-gold/20 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-bold text-venture-gold">
                      {activeStartup.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-venture-gold">
                      {activeStartup.name}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      Founded {activeStartup.founded} by{" "}
                      {activeStartup.founders}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-venture-gold mb-1">
                    About
                  </h4>
                  <p className="text-white/95">{activeStartup.description}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-venture-gold mb-1">
                    Achievements
                  </h4>
                  <p className="text-white/95">{activeStartup.achievements}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-venture-gold mb-1">
                    Purdue Connection
                  </h4>
                  <p className="text-white/95">
                    {activeStartup.purdueConnection}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-venture-gold/20 pt-4">
                <Button
                  variant="outline"
                  className="border-venture-gold/40 text-venture-gold hover:bg-venture-gold hover:text-black"
                  onClick={() => setActiveStartup(null)}
                >
                  Close
                </Button>
                <Button
                  className="bg-venture-gold text-black hover:bg-venture-gold/80"
                  onClick={() => handleViewStartupDetails(activeStartup)}
                >
                  Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Featured Success Stories Carousel */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3 text-center text-white flex items-center justify-center gap-2">
          <Rocket className="h-4 w-4 text-venture-gold" /> Featured Success
          Stories
        </h3>

        <div className="w-full max-w-md mx-auto space-y-4">
          {purdueStartups.map((startup, index) => (
            <Card
              key={index}
              className="bg-gradient-to-b from-black to-black/90 border border-venture-gold/20"
            >
              <CardHeader>
                <CardTitle className="text-venture-gold">
                  {startup.name}
                </CardTitle>
                <CardDescription className="text-white/90">
                  Est. {startup.founded}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <p className="line-clamp-3">{startup.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-venture-gold/40 text-venture-gold hover:bg-venture-gold hover:text-black"
                  onClick={() => handleViewStartupDetails(startup)}
                >
                  Read Full Story
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupShowcase;
