"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { determineRecommendations } from "@/components/quiz/QuizResultsLogic";
import QuizResultsHeader from "@/components/quiz/QuizResultsHeader";
import RecommendationCard from "@/components/quiz/RecommendationCard";
import NextStepsSection from "@/components/quiz/NextStepsSection";
import QuizResultsActions from "@/components/quiz/QuizResultsActions";

const QuizResultsPage = () => {
  const router = useRouter();
  const { answers } = useQuiz();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we have any answers, if not redirect to start
    if (Object.keys(answers).length === 0) {
      router.push("/quiz/start");
      return;
    }

    // Animation delay
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, [answers, router]);

  const handleShare = () => {
    alert("Results link copied to your clipboard.");
  };

  const handleResourceClick = (link: string) => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    }
  };

  const recommendations = determineRecommendations(answers);

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <QuizResultsHeader isVisible={isVisible} />

        <RecommendationCard
          recommendations={recommendations}
          isVisible={isVisible}
          onShare={handleShare}
          onResourceClick={handleResourceClick}
        />

        <NextStepsSection isVisible={isVisible} />

        <QuizResultsActions isVisible={isVisible} />
      </div>
    </div>
  );
};

export default QuizResultsPage;
