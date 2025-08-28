import React from "react";
import { Rocket } from "lucide-react";

const QuizHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-black border border-venture-gold/40 px-4 py-2 rounded-lg flex items-center gap-3">
        <div className="flex items-center">
          {/* Updated to use Purdue logo image */}
          <img
            src="/pulogo.png"
            alt="Purdue University Logo"
            className="h-8 w-8 mr-2"
          />
          <Rocket className="text-venture-gold h-6 w-6 animate-rocket-launch ml-1" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-venture-gold">
            Boiler Startup Launchpad
          </h2>
          <p className="text-sm text-white">
            Launch Your Entrepreneurial Journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
