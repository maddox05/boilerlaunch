import React from "react";

interface QuizResultsHeaderProps {
  isVisible: boolean;
}

const QuizResultsHeader: React.FC<QuizResultsHeaderProps> = ({ isVisible }) => {
  return (
    <div
      className={`text-center mb-8 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-3xl font-bold mb-2 text-venture-gold">
        Your Personalized Purdue Resources
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Based on your responses, here are the most relevant Purdue
        entrepreneurship resources for your journey.
      </p>
    </div>
  );
};

export default QuizResultsHeader;
