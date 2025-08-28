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
  ArrowLeft,
  Lightbulb,
  Users,
  Building,
  BookOpen,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
}

interface QuizAnswer {
  questionId: string;
  answerId: string;
  answerText: string;
}

const GuidanceWorkflowPage = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "getting_to_know",
      question: "What brings you to entrepreneurship at Purdue?",
      options: [
        { id: "burning_idea", text: "I have a burning idea I want to pursue" },
        {
          id: "curious",
          text: "I'm curious about what entrepreneurship means",
        },
        { id: "exploring", text: "I'm exploring different career paths" },
        { id: "join_team", text: "I want to join an existing startup team" },
        { id: "learn_skills", text: "I want to learn entrepreneurial skills" },
      ],
    },
    {
      id: "interests",
      question: "What problems or industries get you most excited?",
      options: [
        { id: "technology", text: "Technology and software solutions" },
        { id: "healthcare", text: "Healthcare and life sciences" },
        { id: "sustainability", text: "Sustainability and environment" },
        { id: "education", text: "Education and learning" },
        { id: "social_impact", text: "Social impact and community" },
        { id: "undecided", text: "I'm still exploring different areas" },
      ],
    },
    {
      id: "current_stage",
      question: "Which best describes your current situation?",
      options: [
        {
          id: "rough_idea",
          text: "I have a rough idea but need help developing it",
        },
        {
          id: "clear_concept",
          text: "I have a clear concept and want to build something",
        },
        { id: "prototype", text: "I have a prototype or early product" },
        {
          id: "exploring",
          text: "I'm still exploring what entrepreneurship means",
        },
        {
          id: "ready_start",
          text: "I'm ready to start a business but need guidance",
        },
      ],
    },
    {
      id: "biggest_concern",
      question: "What's your biggest concern or excitement about this journey?",
      options: [
        { id: "finding_idea", text: "Finding the right idea or opportunity" },
        {
          id: "building_product",
          text: "Actually building the product or service",
        },
        {
          id: "finding_customers",
          text: "Finding customers and validating demand",
        },
        { id: "getting_funding", text: "Getting funding or investment" },
        { id: "building_team", text: "Building the right team" },
        {
          id: "fear_failure",
          text: "Fear of failure or not knowing where to start",
        },
      ],
    },
  ];

  const steps = [
    {
      title: "Getting to Know You",
      icon: <Lightbulb className="h-8 w-8 text-venture-gold" />,
    },
    {
      title: "Understanding Your Interests",
      icon: <Users className="h-8 w-8 text-venture-gold" />,
    },
    {
      title: "Your Entrepreneurial Journey",
      icon: <Building className="h-8 w-8 text-venture-gold" />,
    },
    {
      title: "Your Personalized Path",
      icon: <BookOpen className="h-8 w-8 text-venture-gold" />,
    },
  ];

  useEffect(() => {
    // Restore previous answer if it exists
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const existingAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
      );
      if (existingAnswer) {
        setSelectedOption(existingAnswer.answerId);
      } else {
        setSelectedOption(null);
      }
    }
  }, [currentQuestionIndex, answers]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOptionData = currentQuestion.options.find(
      (opt) => opt.id === selectedOption
    );

    if (selectedOptionData) {
      // Save answer
      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        answerId: selectedOption,
        answerText: selectedOptionData.text,
      };

      setAnswers((prev) => {
        const filtered = prev.filter(
          (a) => a.questionId !== currentQuestion.id
        );
        return [...filtered, newAnswer];
      });
    }

    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Quiz completed, save answers and navigate to guidance results
      const finalAnswers = [
        ...answers.filter((a) => a.questionId !== currentQuestion.id),
      ];
      if (selectedOptionData) {
        finalAnswers.push({
          questionId: currentQuestion.id,
          answerId: selectedOption,
          answerText: selectedOptionData.text,
        });
      }

      // Store answers in localStorage for the results page
      localStorage.setItem("guidanceAnswers", JSON.stringify(finalAnswers));
      router.push("/quiz/guidance-results");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentStep = steps[currentQuestionIndex];

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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.length) * 100
              )}
              % Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-venture-gold h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <Card
          className={`border-venture-gold/30 dark-card transition-opacity duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <CardHeader className="text-center border-b border-venture-gold/30 pb-6">
            <div className="flex justify-center mb-4">{currentStep.icon}</div>
            <CardTitle className="text-2xl text-venture-gold">
              {currentStep.title}
            </CardTitle>
            <CardDescription className="text-white text-lg">
              Interactive Entrepreneurship Discovery
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedOption === option.id
                        ? "border-venture-gold bg-venture-gold/20"
                        : "border-gray-700 hover:border-venture-gold/50 hover:bg-venture-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                          selectedOption === option.id
                            ? "bg-venture-gold border-venture-gold"
                            : "border-gray-500"
                        }`}
                      >
                        {selectedOption === option.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-white">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 justify-center pt-6 border-t border-venture-gold/30">
              {currentQuestionIndex > 0 && (
                <Button
                  onClick={handleBack}
                  className="border border-venture-gold text-venture-gold hover:bg-venture-gold hover:text-venture-black"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="bg-venture-gold text-venture-black hover:bg-white transition-colors"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Continue"
                  : "See Your Results"}
                {currentQuestionIndex < questions.length - 1 ? (
                  <ArrowRight className="ml-2 h-4 w-4" />
                ) : (
                  <Rocket className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Purdue University | Interactive Guided Discovery
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidanceWorkflowPage;
