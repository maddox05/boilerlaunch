export type Startup = {
  slug: string;
  name: string;
  founded: string;
  founders: string;
  description: string;
  achievements: string;
  purdueConnection: string;
  link: string;
};

export const purdueStartups: Startup[] = [
  {
    slug: "cloudflare",
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
    slug: "endocyte",
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
    slug: "on-ramp-indiana",
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
    slug: "cook-biotech",
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
    slug: "spensa-technologies",
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
    slug: "mimir",
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

export function getStartupBySlug(slug: string): Startup | undefined {
  return purdueStartups.find((s) => s.slug === slug);
}
