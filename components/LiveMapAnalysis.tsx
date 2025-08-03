import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Eye, Heart, Zap, Star } from 'lucide-react';
import { PersonalityScores, CareerSuggestion } from './LifeMapScreen';

interface LiveMapAnalysisProps {
  photoUrl: string;
  onAnalysisComplete: (scores: PersonalityScores, careers: CareerSuggestion[]) => void;
  onBack: () => void;
}

const analysisMessages = [
  { message: "Scanning Your Cosmic Blueprint...", icon: Eye, delay: 0 },
  { message: "Analyzing facial geometry...", icon: Brain, delay: 2000 },
  { message: "Mapping personality traits...", icon: Heart, delay: 4000 },
  { message: "Aligning Your Stars...", icon: Star, delay: 6000 },
  { message: "Calculating cosmic influences...", icon: Zap, delay: 8000 }
];

export function LiveMapAnalysis({ photoUrl, onAnalysisComplete, onBack }: LiveMapAnalysisProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Generate mock personality scores and career suggestions
          const mockScores: PersonalityScores = {
            openness: Math.floor(Math.random() * 30) + 70, // 70-100
            conscientiousness: Math.floor(Math.random() * 35) + 65, // 65-100
            extraversion: Math.floor(Math.random() * 40) + 60, // 60-100
            agreeableness: Math.floor(Math.random() * 25) + 75, // 75-100
            neuroticism: Math.floor(Math.random() * 50) + 30 // 30-80 (lower is better)
          };

          const mockCareers: CareerSuggestion[] = [
            {
              title: "Creative Artist",
              description: "Your high openness suggests a natural talent for creative expression and innovative thinking.",
              match: 92
            },
            {
              title: "Innovation Manager", 
              description: "Strong conscientiousness combined with openness makes you ideal for leading creative projects.",
              match: 88
            },
            {
              title: "Explorer/Researcher",
              description: "Your curiosity and systematic approach suit roles in discovery and investigation.",
              match: 85
            }
          ];

          setTimeout(() => {
            onAnalysisComplete(mockScores, mockCareers);
          }, 1000);
          
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    // Message cycling
    analysisMessages.forEach((msg, index) => {
      setTimeout(() => {
        setCurrentMessageIndex(index);
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
    };
  }, [onAnalysisComplete]);

  const currentMessage = analysisMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#4B0082] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-30">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <h1 className="text-white text-xl font-medium">Cosmic Analysis</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 relative z-10">
        {/* Central Galaxy with Orbiting Asteroids */}
        <div className="relative mb-12">
          {/* Galaxy Core */}
          <div className="w-32 h-32 relative">
            {/* User photo in center */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <img
                src={photoUrl}
                alt="Your cosmic self"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Spinning galaxy rings */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-spin" style={{ animationDuration: '10s' }}></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '8s' }}></div>
            
            {/* Orbiting asteroids representing facial features */}
            <div className="absolute inset-0">
              {/* Eyes asteroid */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ animationDuration: '12s' }}>
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg" style={{ transform: 'translateY(-40px)' }}>
                  <div className="w-full h-full flex items-center justify-center text-xs">👁️</div>
                </div>
              </div>
              
              {/* Nose asteroid */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }}>
                <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg" style={{ transform: 'translateX(35px)' }}>
                  <div className="w-full h-full flex items-center justify-center text-xs">👃</div>
                </div>
              </div>
              
              {/* Mouth asteroid */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ animationDuration: '16s' }}>
                <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-orange-400 rounded-full shadow-lg" style={{ transform: 'translateY(35px)' }}>
                  <div className="w-full h-full flex items-center justify-center text-xs">👄</div>
                </div>
              </div>
              
              {/* Forehead asteroid */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 animate-spin" style={{ animationDuration: '11s', animationDirection: 'reverse' }}>
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full shadow-lg" style={{ transform: 'translateX(-30px)' }}>
                  <div className="w-full h-full flex items-center justify-center text-xs">🧠</div>
                </div>
              </div>
              
              {/* Eyebrows asteroid */}
              <div className="absolute top-1/4 right-1/4 animate-spin" style={{ animationDuration: '13s' }}>
                <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg" style={{ transform: 'translate(25px, -25px)' }}>
                  <div className="w-full h-full flex items-center justify-center text-xs">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Comet Trail */}
        <div className="relative mb-8">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#cometGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.827}, 282.7`}
              className="transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px rgba(147,112,219,0.8))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-medium">{progress}%</span>
          </div>
          
          <svg className="w-0 h-0">
            <defs>
              <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9370DB" />
                <stop offset="50%" stopColor="#00CED1" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Current Analysis Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mr-3 animate-pulse border border-white/20">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-lg font-medium">
              {currentMessage.message}
            </h3>
          </div>
          <p className="text-white/70 text-sm">
            {progress < 20 && "Detecting cosmic alignment and facial landmarks..."}
            {progress >= 20 && progress < 40 && "Analyzing Big Five personality dimensions..."}
            {progress >= 40 && progress < 60 && "Mapping facial features to personality traits..."}
            {progress >= 60 && progress < 80 && "Calculating career compatibility and life path..."}
            {progress >= 80 && "Finalizing your cosmic blueprint and destiny map..."}
          </p>
        </div>

        {/* Analysis Phases */}
        <div className="grid grid-cols-5 gap-3 text-center text-xs text-white/60">
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 20 ? 'bg-purple-400 shadow-lg' : 'bg-white/20'}`}></div>
            <p>Face<br />Detection</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 40 ? 'bg-cyan-400 shadow-lg' : 'bg-white/20'}`}></div>
            <p>Personality<br />Mapping</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 60 ? 'bg-yellow-400 shadow-lg' : 'bg-white/20'}`}></div>
            <p>Feature<br />Analysis</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 80 ? 'bg-green-400 shadow-lg' : 'bg-white/20'}`}></div>
            <p>Career<br />Matching</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 95 ? 'bg-pink-400 shadow-lg' : 'bg-white/20'}`}></div>
            <p>Cosmic<br />Blueprint</p>
          </div>
        </div>
      </div>

      {/* Background Cosmic Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-28 right-12 w-1.5 h-1.5 bg-cyan-400 rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-purple-400 rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 right-8 w-2 h-2 bg-yellow-400 rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/3 left-4 w-1 h-1 bg-pink-400 rounded-full twinkle opacity-70" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 right-6 w-1 h-1 bg-green-400 rounded-full twinkle opacity-50" style={{ animationDelay: '1.8s' }} />
      </div>
    </div>
  );
}