import React from "react";
import { ArrowLeft, ArrowRight, HelpCircle, Rocket, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { QuizQuestion } from "@/context/QuizContext";

interface QuestionCardProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isAnimating: boolean;
  handleOptionSelect: (optionId: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSkip: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  isAnimating,
  handleOptionSelect,
  handleNext,
  handleBack,
  handleSkip,
}) => {
  return (
    <Card
      className={`transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      } rocket-card dark-card`}
    >
      <CardHeader className="bg-black border-b border-venture-gold/30 flex flex-row items-center gap-3">
        <Star className="h-5 w-5 text-venture-gold animate-star-twinkle" />
        <CardTitle className="text-2xl flex items-center gap-2 text-venture-gold">
          {currentQuestion.question}
          <HelpCircle className="h-5 w-5 text-white/70" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
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
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex w-full justify-between mb-4">
          <div className="flex gap-2">
            <Button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className="bg-venture-gold text-black hover:bg-venture-gold/90 transition-opacity flex items-center gap-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {/* Skip button only on non-essential questions (after the third question) */}
            {currentQuestionIndex > 2 && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-white hover:text-venture-gold hover:bg-black/50"
              >
                Skip
              </Button>
            )}
          </div>
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="bg-venture-gold text-black hover:bg-venture-gold/90 transition-opacity flex items-center gap-1"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Blast Off!"}
            {currentQuestionIndex < totalQuestions - 1 ? (
              <ArrowRight className="ml-2 h-4 w-4" />
            ) : (
              <Rocket className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center w-full gap-1 pt-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentQuestionIndex
                  ? "w-5 bg-venture-gold"
                  : idx < currentQuestionIndex
                  ? "w-3 bg-venture-gold/60"
                  : "w-3 bg-gray-700"
              }`}
            ></div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
