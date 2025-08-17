"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export default function AssessmentOptions() {
  const router = useRouter();

  const selectWorkflow = (type: "assessment" | "guidance") => {
    if (type === "assessment") {
      router.push("/quiz/start");
    } else {
      router.push("/quiz/guidance");
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Find Your Path
        </h2>
        <p className="text-[var(--text-secondary)]">
          Take a quick assessment or get guided discovery
        </p>
      </div>

      {/* Assessment Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {/* Direct Assessment Path */}
        <Card
          className="neo-card hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() => selectWorkflow("assessment")}
        >
          <CardHeader className="text-center pb-4">
            <Target className="h-8 w-8 text-[var(--purdue-gold)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <CardTitle className="text-lg text-[var(--text-primary)]">
              Direct Assessment
            </CardTitle>
            <CardDescription className="text-[var(--text-secondary)] text-sm">
              I know what I need for my startup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I have a business idea or plan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I know my funding needs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I understand my target market
                </span>
              </div>
            </div>

            <Button
              className="neo-btn-primary w-full mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                selectWorkflow("assessment");
              }}
            >
              Take 5-Minute Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Guided Discovery Path */}
        <Card
          className="neo-card hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() => selectWorkflow("guidance")}
        >
          <CardHeader className="text-center pb-4">
            <HelpCircle className="h-8 w-8 text-[var(--purdue-gold)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <CardTitle className="text-lg text-[var(--text-primary)]">
              Guided Discovery
            </CardTitle>
            <CardDescription className="text-[var(--text-secondary)] text-sm">
              Help me understand what I need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I have an idea but need direction
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I&apos;m unsure about my next steps
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[var(--purdue-gold)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] text-sm">
                  I want to explore possibilities
                </span>
              </div>
            </div>

            <Button
              className="neo-btn-primary w-full mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                selectWorkflow("guidance");
              }}
            >
              Start Guided Discovery <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push("/resources")}
          className="neo-btn-secondary inline-flex items-center justify-center px-6 py-3 rounded-lg"
        >
          Browse All Resources
        </Button>
      </div>
    </div>
  );
}
