"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Building,
  GraduationCap,
  Rocket,
  Star,
} from "lucide-react";
import PurdueQuote from "@/components/quiz/PurdueQuote";

interface QuizAnswer {
  questionId: string;
  answerId: string;
  answerText: string;
}

interface RecommendedResource {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isPrimary: boolean; // New field to indicate if this is a primary recommendation
  resources: Array<{
    name: string;
    url: string;
  }>;
}

const GuidanceResultsPage = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get answers from localStorage
    const savedAnswers = localStorage.getItem("guidanceAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    } else {
      // If no answers, redirect back to start
      router.push("/quiz/guidance");
      return;
    }

    // Animation delay
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, [router]);

  const getRecommendedResources = (): RecommendedResource[] => {
    const answerMap = answers.reduce((acc, answer) => {
      acc[answer.questionId] = answer.answerId;
      return acc;
    }, {} as Record<string, string>);

    const resources: RecommendedResource[] = [];
    let primaryRecommendation: RecommendedResource | null = null;

    // Determine the single best primary recommendation based on stage and motivation
    const stage = answerMap["current_stage"];
    const motivation = answerMap["getting_to_know"];
    const concern = answerMap["biggest_concern"];

    // Priority order: stage first, then motivation, then concern
    if (
      stage === "ready_start" ||
      concern === "getting_funding" ||
      concern === "finding_customers"
    ) {
      primaryRecommendation = {
        category: "Growth & Scaling",
        title: "Scale Your Venture",
        description:
          "Resources for market-ready startups looking to grow and attract investment.",
        icon: <Rocket className="h-6 w-6" />,
        isPrimary: true,
        resources: [
          {
            name: "New Venture Challenge",
            url: "https://purdueinnovates.org/start/new-venture-challenge/",
          },
          {
            name: "Firestarter Bootcamp",
            url: "https://purdueinnovates.org/start/firestarter/",
          },
          {
            name: "Market Readiness Program",
            url: "https://purdueinnovates.org/start/market-readiness/",
          },
        ],
      };
    } else if (
      stage === "clear_concept" ||
      stage === "prototype" ||
      concern === "building_product"
    ) {
      primaryRecommendation = {
        category: "Building & Prototyping",
        title: "Turn Your Ideas into Reality",
        description:
          "Advanced programs for students ready to build and test their products.",
        icon: <Building className="h-6 w-6" />,
        isPrimary: true,
        resources: [
          {
            name: "Market Readiness Program",
            url: "https://purdueinnovates.org/start/market-readiness/",
          },
          {
            name: "New Venture Challenge",
            url: "https://purdueinnovates.org/start/new-venture-challenge/",
          },
          {
            name: "Office of Technology Commercialization",
            url: "https://www.prf.org/otc/",
          },
        ],
      };
    } else if (
      stage === "rough_idea" ||
      concern === "finding_idea" ||
      motivation === "burning_idea"
    ) {
      primaryRecommendation = {
        category: "Idea Development",
        title: "Develop and Validate Your Concept",
        description:
          "Resources to help you refine your ideas and validate market demand.",
        icon: <Lightbulb className="h-6 w-6" />,
        isPrimary: true,
        resources: [
          {
            name: "Firestarter Bootcamp",
            url: "https://purdueinnovates.org/start/firestarter/",
          },
          {
            name: "Certificate in Entrepreneurship & Innovation",
            url: "https://www.purdue.edu/entr/",
          },
          {
            name: "Purdue Libraries Entrepreneurship Guide",
            url: "https://guides.lib.purdue.edu/entrepreneurship",
          },
        ],
      };
    } else if (
      motivation === "join_team" ||
      concern === "building_team" ||
      motivation === "learn_skills"
    ) {
      primaryRecommendation = {
        category: "Community & Networking",
        title: "Connect with Fellow Entrepreneurs",
        description:
          "Join a vibrant community of student entrepreneurs and find your tribe.",
        icon: <Users className="h-6 w-6" />,
        isPrimary: true,
        resources: [
          {
            name: "Certificate in Entrepreneurship & Innovation",
            url: "https://www.purdue.edu/entr/",
          },
          {
            name: "Entrepreneurship Learning Community",
            url: "https://www.purdue.edu/learningcommunities/profiles/business/entrepreneurship.html",
          },
          {
            name: "Moonshot Pitch Competition",
            url: "https://purdueinnovates.org/events/moonshot/",
          },
        ],
      };
    } else {
      // Default for exploring/curious users
      primaryRecommendation = {
        category: "Getting Started",
        title: "Perfect for Beginners",
        description:
          "Great resources for students who are just beginning their entrepreneurial journey.",
        icon: <GraduationCap className="h-6 w-6" />,
        isPrimary: true,
        resources: [
          {
            name: "Certificate in Entrepreneurship & Innovation",
            url: "https://www.purdue.edu/entr/",
          },
          {
            name: "Entrepreneurship Learning Community",
            url: "https://www.purdue.edu/learningcommunities/profiles/business/entrepreneurship.html",
          },
          {
            name: "Moonshot Pitch Competition",
            url: "https://purdueinnovates.org/events/moonshot/",
          },
        ],
      };
    }

    // Add the primary recommendation first
    resources.push(primaryRecommendation);

    // Add two complementary non-primary recommendations
    const fallbackResources = [
      {
        category: "General Support",
        title: "Comprehensive Entrepreneurship Support",
        description:
          "A well-rounded selection of resources to support your entrepreneurial journey.",
        icon: <Lightbulb className="h-6 w-6" />,
        isPrimary: false,
        resources: [
          {
            name: "Certificate in Entrepreneurship & Innovation",
            url: "https://www.purdue.edu/entr/",
          },
          {
            name: "Firestarter Bootcamp",
            url: "https://purdueinnovates.org/start/firestarter/",
          },
          {
            name: "Moonshot Pitch Competition",
            url: "https://purdueinnovates.org/events/moonshot/",
          },
        ],
      },
      {
        category: "Skill Development",
        title: "Build Essential Business Skills",
        description:
          "Develop the fundamental skills needed for entrepreneurial success.",
        icon: <GraduationCap className="h-6 w-6" />,
        isPrimary: false,
        resources: [
          {
            name: "Certificate in Entrepreneurship & Innovation",
            url: "https://www.purdue.edu/entr/",
          },
          {
            name: "Purdue Libraries Entrepreneurship Guide",
            url: "https://guides.lib.purdue.edu/entrepreneurship",
          },
          {
            name: "NSF I-Corps Program",
            url: "https://www.purdue.edu/research/oevprp/funding-and-grant-resources/nsf-i-corps/",
          },
        ],
      },
      {
        category: "Innovation Resources",
        title: "Access Innovation Infrastructure",
        description:
          "Utilize Purdue's world-class facilities and research capabilities.",
        icon: <Building className="h-6 w-6" />,
        isPrimary: false,
        resources: [
          {
            name: "Office of Technology Commercialization",
            url: "https://www.prf.org/otc/",
          },
          {
            name: "Trask Innovation Fund",
            url: "https://purdueinnovates.org/venture/trask-innovation-fund/",
          },
          {
            name: "Innovation Partners Institute",
            url: "https://partnersforinnovation.org",
          },
        ],
      },
    ];

    // Add complementary resources that don't match the primary category
    fallbackResources.forEach((fallback) => {
      if (
        resources.length < 3 &&
        fallback.category !== primaryRecommendation.category
      ) {
        resources.push(fallback);
      }
    });

    // Always return exactly 3 recommendations
    return resources.slice(0, 3);
  };

  const handleStartOver = () => {
    localStorage.removeItem("guidanceAnswers");
    router.push("/quiz/guidance");
  };

  const handleFullAssessment = () => {
    router.push("/quiz/start");
  };

  const recommendedResources = getRecommendedResources();
  const primaryCount = recommendedResources.filter((r) => r.isPrimary).length;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl font-bold mb-2 text-venture-gold">
            Your Entrepreneurship Journey Begins
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Based on your responses, here are the most relevant Purdue
            entrepreneurship resources for your current stage.
          </p>
          {primaryCount > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Star className="inline h-4 w-4 text-venture-gold mr-1" />
              {primaryCount} recommendation{primaryCount > 1 ? "s" : ""}{" "}
              specifically matched to your answers
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendedResources.map((resource, index) => (
            <Card
              key={index}
              className={`transition-all duration-700 delay-${index * 200} ${
                isVisible ? "opacity-100" : "opacity-0 translate-y-10"
              } ${resource.isPrimary ? "ring-2 ring-venture-gold/50" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-venture-gold">{resource.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-700 dark:text-gray-300">
                        {resource.category}
                      </CardDescription>
                    </div>
                  </div>
                  {resource.isPrimary && (
                    <Badge className="bg-venture-gold/20 text-venture-gold border border-venture-gold/30">
                      <Star className="h-3 w-3 mr-1" />
                      Top Match
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {resource.description}
                </p>
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">
                    Recommended Resources:
                  </h4>
                  <ul className="text-xs text-gray-800 dark:text-gray-200 space-y-2">
                    {resource.resources.map((res, idx) => (
                      <li key={idx} className="border-b pb-1 last:border-b-0">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-venture-gold hover:underline font-medium"
                        >
                          {res.name}
                        </a>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          ({res.url})
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <PurdueQuote currentQuestionIndex={0} />

        <div
          className={`bg-muted/50 rounded-lg p-6 mb-8 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Ready for More Specific Guidance?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This guided discovery gives you a general overview. For detailed,
            personalized recommendations with specific programs and contacts,
            take our comprehensive assessment.
          </p>
          <Button
            onClick={handleFullAssessment}
            className="bg-venture-gold text-black hover:bg-venture-gold/90"
          >
            Take Full Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div
          className={`space-y-4 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartOver}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Retake Guided Discovery
            </Button>
            <Button
              onClick={() => router.push("/resources")}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Browse All Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceResultsPage;
