import { ResultCategory } from "./types";

export const determineRecommendations = (
  answers: Record<string, string>
): ResultCategory => {
  const answerMap = answers;

  // Determine the student's stage/interest based on their answers
  const stage = answerMap["current_stage"] || answerMap["startup_stage"];
  const motivation = answerMap["motivation"] || answerMap["getting_to_know"];
  const concern = answerMap["biggest_concern"] || answerMap["main_challenge"];
  const funding =
    answerMap["funding_status"] || answerMap["looking_for_funding"];
  const background = answerMap["background"] || answerMap["student_type"];

  // Just exploring or unsure where to start
  if (
    stage === "exploring" ||
    motivation === "curious" ||
    motivation === "exploring" ||
    stage === "idea_stage"
  ) {
    return {
      id: "exploring",
      title: "Perfect for Getting Started",
      description:
        "Great resources for students who are just beginning their entrepreneurial journey.",
      resources: [
        {
          name: "Certificate in Entrepreneurship & Innovation",
          description:
            "A five-course program open to all majors that provides foundational entrepreneurship knowledge.",
          link: "https://www.purdue.edu/entr/",
        },
        {
          name: "Entrepreneurship Learning Community",
          description:
            "A first-year residential experience paired with ENTR coursework for immersive learning.",
          link: "https://www.purdue.edu/learningcommunities/profiles/business/entrepreneurship.html",
        },
        {
          name: "Moonshot Pitch Competition",
          description:
            "A low-barrier ideation event with a $5,500 prize pool perfect for testing early concepts.",
          link: "https://purdueinnovates.org/events/moonshot/",
        },
      ],
    };
  }

  // Has an idea but hasn't started building
  if (
    stage === "rough_idea" ||
    stage === "concept_stage" ||
    concern === "finding_idea"
  ) {
    return {
      id: "idea_development",
      title: "Develop and Validate Your Concept",
      description:
        "Resources to help you refine your ideas and validate market demand.",
      resources: [
        {
          name: "Firestarter Bootcamp",
          description:
            "A 6-week cohort program focused on finding product-market fit and de-risking your startup.",
          link: "https://purdueinnovates.org/start/firestarter/",
        },
        {
          name: "Certificate in Entrepreneurship & Innovation",
          description:
            "Build foundational business skills while developing your concept.",
          link: "https://www.purdue.edu/entr/",
        },
        {
          name: "Purdue Libraries Entrepreneurship Guide",
          description:
            "Curated resources for business planning, market research, and intellectual property.",
          link: "https://guides.lib.purdue.edu/entrepreneurship",
        },
      ],
    };
  }

  // Building prototype or MVP
  if (
    stage === "prototype" ||
    stage === "building" ||
    concern === "building_product"
  ) {
    return {
      id: "building",
      title: "Turn Your Ideas into Reality",
      description:
        "Advanced programs for students ready to build and test their products.",
      resources: [
        {
          name: "Market Readiness Program",
          description:
            "Helps students clarify their value proposition and prepare for pitching to investors.",
          link: "https://purdueinnovates.org/start/market-readiness/",
        },
        {
          name: "New Venture Challenge",
          description:
            "A multi-stage competition for market-ready startups with significant prizes.",
          link: "https://purdueinnovates.org/start/new-venture-challenge/",
        },
        {
          name: "Office of Technology Commercialization",
          description:
            "Assists in patenting and licensing Purdue inventions and technologies.",
          link: "https://www.prf.org/otc/",
        },
      ],
    };
  }

  // Ready to launch and scale
  if (
    stage === "ready_start" ||
    stage === "scaling" ||
    concern === "finding_customers"
  ) {
    return {
      id: "scaling",
      title: "Scale Your Venture",
      description:
        "Resources for market-ready startups looking to grow and attract customers.",
      resources: [
        {
          name: "New Venture Challenge",
          description:
            "A multi-stage competition for market-ready startups with significant prizes.",
          link: "https://purdueinnovates.org/start/new-venture-challenge/",
        },
        {
          name: "Firestarter Bootcamp",
          description:
            "Advanced cohort for refining your go-to-market strategy.",
          link: "https://purdueinnovates.org/start/firestarter/",
        },
        {
          name: "Market Readiness Program",
          description:
            "Helps students clarify their value proposition and prepare for pitching to investors.",
          link: "https://purdueinnovates.org/start/market-readiness/",
        },
      ],
    };
  }

  // Looking for funding
  if (
    funding === "seeking" ||
    concern === "getting_funding" ||
    funding === "yes"
  ) {
    return {
      id: "funding",
      title: "Access Funding Opportunities",
      description:
        "Connect with investors and funding programs to fuel your startup growth.",
      resources: [
        {
          name: "Trask Innovation Fund",
          description:
            "Provides up to $100,000 for IP-driven ventures with commercial potential.",
          link: "https://purdueinnovates.org/venture/trask-innovation-fund/",
        },
        {
          name: "Purdue Innovates Venture Fund",
          description:
            "Supports Purdue-connected startups with Series A potential.",
          link: "https://purdueinnovates.org/venture/venture-funding/",
        },
        {
          name: "New Venture Challenge",
          description:
            "Competition with substantial prize money and investor connections.",
          link: "https://purdueinnovates.org/start/new-venture-challenge/",
        },
      ],
    };
  }

  // Graduate student or researcher
  if (
    background === "graduate" ||
    background === "researcher" ||
    background === "phd"
  ) {
    return {
      id: "research",
      title: "Commercialize Your Research",
      description:
        "Specialized resources for graduate students and researchers with commercializable technology.",
      resources: [
        {
          name: "Office of Technology Commercialization",
          description:
            "Expert guidance on patenting, licensing, and commercializing university research.",
          link: "https://www.prf.org/otc/",
        },
        {
          name: "NSF I-Corps Program",
          description:
            "Customer discovery training to validate the commercial potential of your research.",
          link: "https://www.purdue.edu/research/oevprp/funding-and-grant-resources/nsf-i-corps/",
        },
        {
          name: "Trask Innovation Fund",
          description:
            "Funding specifically for IP-driven ventures emerging from university research.",
          link: "https://purdueinnovates.org/venture/trask-innovation-fund/",
        },
      ],
    };
  }

  // Social or civic impact focus
  if (
    motivation === "social_impact" ||
    concern === "social_impact" ||
    motivation === "civic"
  ) {
    return {
      id: "social_impact",
      title: "Drive Social and Civic Impact",
      description:
        "Resources for entrepreneurs focused on creating positive social change.",
      resources: [
        {
          name: "Moonshot Pitch Competition",
          description:
            "Platform for innovative ideas that can create meaningful social impact.",
          link: "https://purdueinnovates.org/events/moonshot/",
        },
        {
          name: "Innovation Partners Institute",
          description:
            "Drives civic and social innovation through collaborative partnerships.",
          link: "https://partnersforinnovation.org",
        },
        {
          name: "Certificate in Entrepreneurship & Innovation",
          description:
            "Learn how to build sustainable ventures that create social value.",
          link: "https://www.purdue.edu/entr/",
        },
      ],
    };
  }

  // Default fallback
  return {
    id: "general",
    title: "Comprehensive Entrepreneurship Support",
    description:
      "A well-rounded selection of resources to support your entrepreneurial journey.",
    resources: [
      {
        name: "Certificate in Entrepreneurship & Innovation",
        description:
          "Foundational program open to all majors for building entrepreneurial skills.",
        link: "https://www.purdue.edu/entr/",
      },
      {
        name: "Firestarter Bootcamp",
        description:
          "Intensive program to validate your business concept and find product-market fit.",
        link: "https://purdueinnovates.org/start/firestarter/",
      },
      {
        name: "Moonshot Pitch Competition",
        description:
          "Entry-level competition perfect for testing and refining your ideas.",
        link: "https://purdueinnovates.org/events/moonshot/",
      },
    ],
  };
};
