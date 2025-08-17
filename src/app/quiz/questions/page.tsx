"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
// temporarily use alert() instead of toast
import { useQuiz } from "@/context/QuizContext";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizProgress from "@/components/quiz/QuizProgress";
import RocketProgress from "@/components/quiz/RocketProgress";
import PurdueQuote from "@/components/quiz/PurdueQuote";

const QuizQuestionsPage = () => {
  const router = useRouter();
  // const { toast } = useToast();
  const {
    questions,
    currentQuestionIndex: contextQuestionIndex,
    nextQuestion: contextNextQuestion,
    previousQuestion: contextPreviousQuestion,
    answers,
    updateAnswer,
  } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(contextQuestionIndex);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Animation delay
    setIsVisible(true);

    // Restore previous answer if it exists
    if (questions && questions.length > 0) {
      const currentQuestionId = questions[currentQuestionIndex]?.id;
      if (currentQuestionId && answers[currentQuestionId]) {
        setSelectedOption(answers[currentQuestionId]);
      } else {
        setSelectedOption(null);
      }
    }
  }, [currentQuestionIndex, answers, questions]);

  // Safety check for questions
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Loading questions...
          </h2>
          <Button
            onClick={() => router.push("/quiz/start")}
            className="bg-white text-black hover:bg-venture-black hover:text-white"
          >
            Return to Start
          </Button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an option to continue.");
      return;
    }

    // Save answer
    const currentQuestionId = questions[currentQuestionIndex].id;
    updateAnswer(currentQuestionId, selectedOption);

    // Move to next question or results
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        contextNextQuestion();
        setIsAnimating(false);
      }, 300);
    } else {
      // Quiz completed, navigate to results
      router.push("/quiz/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        contextPreviousQuestion();
        setIsAnimating(false);
      }, 300);
    } else {
      router.push("/quiz/start");
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        contextNextQuestion();
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Rocket progress tracker on the side */}
      <div className="fixed top-1/2 transform -translate-y-1/2 left-6 h-80">
        <RocketProgress
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <QuizHeader />

        <div
          className={`mt-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Mobile progress bar (visible only on mobile) */}
          <div className="md:hidden">
            <QuizProgress
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          </div>

          <QuestionCard
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            isAnimating={isAnimating}
            handleOptionSelect={handleOptionSelect}
            handleNext={handleNext}
            handleBack={handlePrevious}
            handleSkip={handleSkip}
          />

          <div className="mt-12">
            <PurdueQuote currentQuestionIndex={currentQuestionIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionsPage;
