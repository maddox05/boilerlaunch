import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";

// Expanded bank of Purdue and entrepreneurial quotes
export const purdueFamousQuotes = [
  {
    quote:
      "If I have seen further, it is by standing on the shoulders of giants.",
    author: "Neil Armstrong, Purdue '55",
    role: "First person to walk on the moon",
  },
  {
    quote: "Always do your best. What you plant now, you will harvest later.",
    author: "Gus Grissom, Purdue '50",
    role: "NASA Astronaut",
  },
  {
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart, Purdue Faculty",
    role: "Aviation Pioneer",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Eugene Cernan, Purdue '56",
    role: "Last person to walk on the moon",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "David Wolf, Purdue '78",
    role: "NASA Astronaut",
  },
  {
    quote:
      "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    author: "Beth Brooke-Marciniak, Purdue '81",
    role: "Global Vice Chair at EY, Forbes Most Powerful Women",
  },
  {
    quote:
      "The entrepreneur always searches for change, responds to it, and exploits it as an opportunity.",
    author: "Scott Dorsey, Purdue '89",
    role: "Co-founder of ExactTarget (acquired by Salesforce)",
  },
  {
    quote:
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Brian Cardinal, Purdue '00",
    role: "Former NBA Player, Entrepreneur",
  },
  {
    quote:
      "Boiler Up! The future belongs to those who believe in the beauty of their dreams.",
    author: "Drew Brees, Purdue '01",
    role: "Super Bowl Champion, Entrepreneur",
  },
  {
    quote: "Whether you think you can or think you can't, you're right.",
    author: "Ryan Newman, Purdue '01",
    role: "NASCAR Driver, Engineering Graduate",
  },
  {
    quote: "If opportunity doesn't knock, build a door.",
    author: "Carolyn Woo, Purdue Faculty",
    role: "Former Dean of Business School",
  },
  {
    quote: "You can't build a reputation on what you are going to do.",
    author: "Mitch Daniels, Purdue President",
    role: "Former Indiana Governor",
  },
  {
    quote:
      "Every time you state what you want or believe, you're the first to hear it. It's a message to both you and others about what you think is possible.",
    author: "John Wooden, Purdue '32",
    role: "Legendary Basketball Coach",
  },
  {
    quote:
      "The only place where success comes before work is in the dictionary.",
    author: "Bob Peterson, Purdue '81",
    role: "Pixar Animation Studios Co-Founder",
  },
  {
    quote: "Ever onward, ever upward, until greater victories are won.",
    author: "Purdue Fight Song",
    role: "Boilermaker Tradition",
  },
  {
    quote:
      "Do not follow where the path may lead. Go instead where there is no path and leave a trail.",
    author: "Leslie Geddes, Purdue Professor",
    role: "Biomedical Engineering Pioneer",
  },
  {
    quote: "Don't be afraid to give up the good to go for the great.",
    author: "Elwood Mead, Purdue 1883",
    role: "Commissioner of U.S. Bureau of Reclamation",
  },
  {
    quote: "One small step for man, one giant leap for mankind.",
    author: "Neil Armstrong, Purdue '55",
    role: "First person to walk on the moon",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Dennis Suskind, Purdue '67",
    role: "Former Partner of Goldman Sachs",
  },
  {
    quote: "Hail Purdue! Well done is better than well said.",
    author: "Purdue Tradition",
    role: "Boilermaker Spirit",
  },
];

interface PurdueQuoteProps {
  currentQuestionIndex: number; // Added to force re-render on question change
}

const PurdueQuote: React.FC<PurdueQuoteProps> = ({ currentQuestionIndex }) => {
  const [quote, setQuote] = useState<(typeof purdueFamousQuotes)[0]>();

  // Use the currentQuestionIndex as a dependency to re-randomize on each question
  useEffect(() => {
    // Select a new random quote whenever the question changes
    const randomIndex = Math.floor(Math.random() * purdueFamousQuotes.length);
    setQuote(purdueFamousQuotes[randomIndex]);
  }, [currentQuestionIndex]);

  // Safety check to prevent errors
  if (!quote) {
    return null;
  }

  return (
    <div className="mt-8 bg-black border border-venture-gold/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Quote className="h-6 w-6 text-venture-gold flex-shrink-0 mt-1" />
        <div>
          <p className="italic text-white">
            &quot;<span className="text-venture-gold">{quote.quote}</span>&quot;
          </p>
          <p className="text-sm font-semibold mt-2 text-white">
            {quote.author}
          </p>
          <p className="text-xs text-white/70">{quote.role}</p>
        </div>
      </div>
    </div>
  );
};

export default PurdueQuote;
