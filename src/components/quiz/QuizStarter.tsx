"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Target,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export default function QuizStarter() {
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
      {/* Assessment Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {/* Direct Assessment Path */}
        <Card
          className="border-venture-gold/30 dark-card hover:border-venture-gold/50 transition-all duration-300 cursor-pointer group"
          onClick={() => selectWorkflow("assessment")}
        >
          <CardHeader className="text-center pb-4">
            <Target className="h-8 w-8 text-venture-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <CardTitle className="text-lg text-white">Direct Assessment</CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              I know what I need for my startup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I have a business idea or plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I know my funding needs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I understand my target market</span>
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-venture-gold text-venture-black hover:bg-white transition-colors"
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
          className="border-venture-gold/30 dark-card hover:border-venture-gold/50 transition-all duration-300 cursor-pointer group"
          onClick={() => selectWorkflow("guidance")}
        >
          <CardHeader className="text-center pb-4">
            <HelpCircle className="h-8 w-8 text-venture-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <CardTitle className="text-lg text-white">Guided Discovery</CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              Help me understand what I need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I have an idea but need direction</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I&apos;m unsure about my next steps</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-venture-gold flex-shrink-0" />
                <span className="text-white text-sm">I want to explore possibilities</span>
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-venture-gold text-venture-black hover:bg-white transition-colors"
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
          className="border-venture-gold text-black hover:bg-venture-gold hover:text-venture-black bg-white"
        >
          Browse All Resources
        </Button>
      </div>
    </div>
  );
}


