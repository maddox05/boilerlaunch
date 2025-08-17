import React from "react";
// simple progress bar without external UI dep

interface QuizProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2 text-sm text-white">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 bg-black/50 border border-venture-gold/30 rounded">
        <div
          className="h-full bg-venture-gold rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgress;
