import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, Share2, Lightbulb } from "lucide-react";
import { ResultCategory } from "./types";

interface RecommendationCardProps {
  recommendations: ResultCategory;
  isVisible: boolean;
  onShare: () => void;
  onResourceClick: (link: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendations,
  isVisible,
  onShare,
  onResourceClick,
}) => {
  return (
    <Card
      className={`mb-8 transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <CardHeader className="purdue-gradient text-black rounded-t-lg">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6" />
          <div>
            <CardTitle className="text-2xl">{recommendations.title}</CardTitle>
            <CardDescription className="text-black/80">
              {recommendations.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Recommended Resources
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >
            <Share2 className="h-4 w-4 mr-1" /> Share Results
          </Button>
        </div>

        <div className="space-y-6">
          {recommendations.resources.map((resource, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-2 text-gray-900 dark:text-gray-100">
                    {resource.name}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {resource.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ({resource.link})
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 bg-venture-gold text-black hover:bg-venture-gold/90"
                  onClick={() => onResourceClick(resource.link)}
                >
                  Visit <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
