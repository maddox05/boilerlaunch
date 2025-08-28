"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  ArrowRight,
  Lightbulb,
  Target,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const WorkflowSelectionPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const selectWorkflow = (type: "assessment" | "guidance") => {
    if (type === "assessment") {
      router.push("/quiz/start");
    } else {
      router.push("/quiz/guidance");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 cosmic-bg">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <img
            src="/pulogo.png"
            alt="Purdue University Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-venture-gold mb-4">
              Choose Your Path
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Select the approach that best fits where you are in your
              entrepreneurial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Assessment Path */}
            <Card
              className="border-venture-gold/30 dark-card hover:border-venture-gold/50 transition-all duration-300 cursor-pointer group"
              onClick={() => selectWorkflow("assessment")}
            >
              <CardHeader className="text-center pb-4">
                <Target className="h-12 w-12 text-venture-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-white">
                  Direct Assessment
                </CardTitle>
                <CardDescription className="text-gray-300">
                  I know what I need for my startup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Perfect if you have a clear understanding of your
                  startup&apos;s current stage and specific needs.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I have a business idea or plan
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I know my funding needs
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I understand my target market
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-venture-gold text-venture-black hover:bg-white transition-colors"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    selectWorkflow("assessment");
                  }}
                >
                  Take 5-Minute Assessment{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Guided Discovery Path */}
            <Card
              className="border-venture-gold/30 dark-card hover:border-venture-gold/50 transition-all duration-300 cursor-pointer group"
              onClick={() => selectWorkflow("guidance")}
            >
              <CardHeader className="text-center pb-4">
                <HelpCircle className="h-12 w-12 text-venture-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-white">
                  Guided Discovery
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Help me understand what I need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Ideal if you&apos;re just starting out or need help clarifying
                  your startup&apos;s direction and requirements.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I have an idea but need direction
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I&apos;m unsure about my next steps
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-venture-gold flex-shrink-0" />
                    <span className="text-white text-sm">
                      I want to explore possibilities
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-venture-gold text-venture-black hover:bg-white transition-colors"
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

          <div className="mt-12 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Purdue University | Empowering Entrepreneurs Since 1869
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSelectionPage;
