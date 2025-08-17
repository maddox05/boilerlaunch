import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface NextStepsSectionProps {
  isVisible: boolean;
}

const NextStepsSection: React.FC<NextStepsSectionProps> = ({ isVisible }) => {
  const router = useRouter();

  return (
    <div
      className={`bg-muted/50 rounded-lg p-6 mb-8 transition-all duration-700 delay-400 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Next Steps
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Ready to dive deeper? Explore all of Purdue&apos;s entrepreneurship
        resources or connect with our team to get personalized guidance.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => router.push("/resources")}
          className="bg-venture-gold text-black hover:bg-venture-gold/90"
        >
          Browse All Resources <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NextStepsSection;
