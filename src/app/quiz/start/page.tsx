"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { QuizProvider } from "@/context/QuizContext";
// import QuizHeader from "@/components/quiz/QuizHeader";

const StartQuizPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const startQuiz = () => {
    router.push("/quiz/questions");
  };

  return (
    <QuizProvider>
      <div className="flex flex-col min-h-screen pt-20 cosmic-bg">
        <div className="container max-w-3xl mx-auto px-4 py-12">
          <div className="flex justify-center mb-8">
            {/* Replaced the P with the Purdue logo/crest image */}
            <img
              src="/pulogo.png"
              alt="Purdue University Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

          <Card
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            } border-venture-gold/30 dark-card`}
          >
            <CardHeader className="text-center border-b border-venture-gold/30 pb-4">
              <CardTitle className="text-3xl text-venture-gold">
                Boiler Startup Launchpad
              </CardTitle>
              <CardDescription className="text-white">
                Find the perfect entrepreneurial resources at Purdue for your
                unique startup journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-center text-gray-300">
                This 5-minute assessment will analyze your startup&apos;s needs
                and match you with the most relevant Purdue University
                entrepreneurship resources, tailored to your specific situation.
              </p>

              <div className="flex items-center justify-center space-x-4 my-6">
                <div className="text-center">
                  <Clock className="h-10 w-10 text-venture-gold mx-auto mb-2" />
                  <p className="text-sm text-white">5 Minutes</p>
                </div>
                <div className="h-10 w-px bg-gray-600"></div>
                <div className="text-center">
                  <Award className="h-10 w-10 text-venture-gold mx-auto mb-2" />
                  <p className="text-sm text-white">8 Questions</p>
                </div>
                <div className="h-10 w-px bg-gray-600"></div>
                <div className="text-center">
                  <Lightbulb className="h-10 w-10 text-venture-gold mx-auto mb-2" />
                  <p className="text-sm text-white">Personalized</p>
                </div>
              </div>

              <div className="bg-venture-gold/10 rounded-lg p-5 space-y-4 border border-venture-gold/20">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                  <GraduationCap className="h-5 w-5 text-venture-gold" />
                  Discover resources such as:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Startup incubators & accelerators specific to your stage
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Pitch competitions & funding opportunities
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Mentor networks and expert connections
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Prototyping resources and maker spaces
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Research commercialization support
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-venture-gold mt-0.5 flex-shrink-0" />
                    <p className="text-white">
                      Academic entrepreneurship programs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button
                onClick={startQuiz}
                className="h-11 rounded-md px-8 bg-venture-gold text-venture-black hover:bg-venture-black hover:text-white transition-all duration-300"
              >
                Begin 5-Minute Assessment{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Purdue University | Empowering Entrepreneurs Since 1869
            </p>
          </div>
        </div>
      </div>
    </QuizProvider>
  );
};

export default StartQuizPage;
