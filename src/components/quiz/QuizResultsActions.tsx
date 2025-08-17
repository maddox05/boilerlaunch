import React from "react";
import { Button } from "../ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";

interface QuizResultsActionsProps {
  isVisible: boolean;
}

const QuizResultsActions: React.FC<QuizResultsActionsProps> = ({
  isVisible,
}) => {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  const handleStartOver = () => {
    resetQuiz();
    router.push("/quiz/start");
  };

  return (
    <div
      className={`space-y-4 transition-all duration-700 delay-500 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={handleStartOver}>
          Take Assessment Again
        </Button>
        <Button onClick={() => router.push("/")} variant="outline">
          <Home className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default QuizResultsActions;
