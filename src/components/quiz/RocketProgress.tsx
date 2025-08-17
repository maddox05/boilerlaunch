
import React from 'react';
import { Rocket } from 'lucide-react';

interface RocketProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const RocketProgress: React.FC<RocketProgressProps> = ({ currentQuestionIndex, totalQuestions }) => {
  // Make sure we don't divide by zero
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const starsCount = 50; // Increased number of stars for more visual appeal
  
  // Calculate animation intensity based on progress
  const rocketShake = progress > 0 ? 'animate-rocket-shake' : '';
  const flameIntensity = progress > 50 ? 'h-12' : progress > 25 ? 'h-10' : 'h-8';
  const smokeOpacity = progress > 10 ? 0.3 : 0.1;
  
  return (
    <div className="relative h-full flex-col items-center hidden md:flex">
      {/* Percentage indicator - MOVED TO FRONT */}
      <div className="mb-4 text-lg font-bold text-venture-gold">
        {Math.round(progress)}%
      </div>
      
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: starsCount }).map((_, i) => (
          <span 
            key={i} 
            className="absolute block bg-white rounded-full opacity-70"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `star-twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
      
      {/* Launch pad */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-10 flex items-center justify-center">
        <div className="w-10 h-2 bg-venture-gold rounded-lg"></div>
        <div className="absolute bottom-2 w-6 h-6 bg-gray-700 rounded-md"></div>
      </div>
      
      {/* Rocket launcher track */}
      <div className="h-full w-1 bg-gray-800 rounded-full relative">
        {/* Progress indicator */}
        <div 
          className="w-1 bg-venture-gold rounded-full absolute bottom-0 transition-all duration-500"
          style={{ height: `${progress}%` }}
        />
        
        {/* Smoke effect at the bottom */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 flex justify-center items-center z-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gray-400"
                style={{
                  width: `${Math.random() * 8 + 6}px`,
                  height: `${Math.random() * 8 + 6}px`,
                  opacity: smokeOpacity,
                  bottom: `${Math.random() * 10}px`,
                  left: `${Math.random() * 16}px`,
                  animation: `smoke-rise ${Math.random() * 2 + 2}s ease-out infinite`
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Rocket */}
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${rocketShake}`}
          style={{ bottom: `${progress}%` }}
        >
          <div className="relative">
            {/* Rocket flame */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-4">
              <div className={`w-4 ${flameIntensity} bg-gradient-to-b from-venture-gold via-orange-500 to-red-500 rounded-b-full animate-flame-flicker`}></div>
            </div>
            
            {/* Rocket body */}
            <div className="bg-white rounded-full p-1 shadow-lg z-10 relative">
              <Rocket className="h-6 w-6 text-venture-gold" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Percentage indicator - REMOVED FROM HERE */}
    </div>
  );
};

export default RocketProgress;
