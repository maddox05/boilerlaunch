"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Linkedin } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="border-b border-[var(--border-light)] bg-[var(--surface)] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
              About BoilerLaunchpad
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
              Connecting startups with the right resources at the right time.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="neo-card mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--text-primary)]">
                Our Mission
              </CardTitle>
              <CardDescription className="text-[var(--text-secondary)]">
                Why we created this tool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[var(--text-primary)]">
              <p>
                Boiler Startup Launchpad was created to solve a critical problem
                for early-stage entrepreneurs: finding the right resources
                amidst the overwhelming options available on campus and beyond.
              </p>
              <p>
                We&apos;ve observed that startups often struggle to identify
                which incubators, accelerators, mentorship programs, or funding
                sources are the best fit for their specific stage and needs.
                Making the wrong choice can significantly impact a
                startup&apos;s trajectory and waste precious time.
              </p>
              <p>
                Our mission is to create a frictionless path to the most
                relevant resources, allowing founders to focus on what matters
                most — building their business.
              </p>
            </CardContent>
          </Card>

          <Card className="neo-card mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--text-primary)]">
                How We Help
              </CardTitle>
              <CardDescription className="text-[var(--text-secondary)]">
                Our approach to resource matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[var(--text-primary)]">
              <p>
                Through our diagnostic assessment tool, we analyze your
                startup&apos;s current stage, industry focus, immediate needs,
                and available time commitment to identify the most suitable
                support systems.
              </p>
              <p>
                Our recommendations are based on years of experience in the
                startup ecosystem and a deep understanding of the strengths and
                specialties of various entrepreneurial support organizations.
              </p>
              <p>
                We&apos;re continuously updating our resource database and
                refining our matching algorithm to ensure founders get the most
                relevant and timely recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="neo-card">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--text-primary)]">
                Meet Our Team
              </CardTitle>
              <CardDescription className="text-[var(--text-secondary)]">
                The people behind Boiler Startup Launchpad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-lg border border-[var(--border-light)] bg-[var(--surface-hover)]">
                  <div className="shrink-0">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D5603AQG-FWDNU49Cgg/profile-displayphoto-shrink_400_400/B56ZbEL5XeH0Ao-/0/1747048175593?e=1758153600&v=beta&t=6dS6jUUpzVh3T9sN4gI7jsyZsH-Egf5ysmcEa4aECvk"
                      alt="Maddox Schmidlkofer"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover border-2 border-[var(--purdue-gold)]"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                      Maddox Schmidlkofer
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-2">
                      CS Entrepreneur
                    </p>
                    <p className="text-[var(--text-primary)] mb-3">
                      Maddox is passionate about building tools and communities
                      that help Purdue founders connect, showcase projects, and
                      access the right resources at the right time.
                    </p>
                    <a
                      href="https://www.linkedin.com/in/maddox-schmidlkofer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-venture-gold hover:text-venture-black transition-colors"
                    >
                      <Linkedin className="mr-1 h-4 w-4" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border border-[var(--border-light)] bg-[var(--surface-hover)]">
                  <div className="shrink-0">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D4E03AQF8TEWwpqTh5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731550610348?e=1759363200&v=beta&t=ATW9p5aGpbi5OdH8XQ18E3aYp8NP9fip8qlEBr55TMo"
                      alt="Ben Gottlieb"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover border-2 border-[var(--purdue-gold)]"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                      Ben Gottlieb
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-2">
                      Student at Purdue University
                    </p>
                    <p className="text-[var(--text-primary)] mb-3">
                      Ben helps founders navigate the entrepreneurial ecosystem
                      at Purdue University, connecting them with the resources
                      they need to succeed.
                    </p>
                    <a
                      href="https://www.linkedin.com/in/ben-gottlieb-773508289/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-venture-gold hover:text-venture-black transition-colors"
                    >
                      <Linkedin className="mr-1 h-4 w-4" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
