import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Heart, Eye, Zap } from 'lucide-react';
import { UploadedPhotos, CompatibilityScore } from './CompatibilityScreen';

interface CompatibilityAnalysisProps {
  photos: UploadedPhotos;
  onAnalysisComplete: (score: CompatibilityScore) => void;
  onBack: () => void;
}

const analysisMessages = [
  { message: "Reading your vibes...", icon: Eye, delay: 0 },
  { message: "Analyzing facial geometry...", icon: Brain, delay: 2000 },
  { message: "Calculating chemistry...", icon: Heart, delay: 4000 },
  { message: "Measuring compatibility...", icon: Zap, delay: 6000 },
  { message: "Finalizing harmony scores...", icon: Heart, delay: 8000 }
];

export function CompatibilityAnalysis({ photos, onAnalysisComplete, onBack }: CompatibilityAnalysisProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Generate mock compatibility score
          const mockScore: CompatibilityScore = {
            work: Math.floor(Math.random() * 30) + 70, // 70-100
            relationship: Math.floor(Math.random() * 40) + 60, // 60-100
            overall: Math.floor(Math.random() * 25) + 75, // 75-100
            traits: {
              communication: Math.floor(Math.random() * 30) + 70,
              trust: Math.floor(Math.random() * 40) + 60,
              creativity: Math.floor(Math.random() * 35) + 65,
              empathy: Math.floor(Math.random() * 25) + 75,
              ambition: Math.floor(Math.random() * 30) + 70,
              stability: Math.floor(Math.random() * 20) + 80
            }
          };

          setTimeout(() => {
            onAnalysisComplete(mockScore);
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

    // Scanner animation
    const scanInterval = setInterval(() => {
      setScanPosition(prev => (prev + 2) % 100);
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(scanInterval);
    };
  }, [onAnalysisComplete]);

  const currentMessage = analysisMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#4B0082] to-[#00CED1] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-30">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <h1 className="text-white text-xl font-medium">Analyzing</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 relative z-10">
        {/* Photo Preview Area */}
        <div className="relative mb-12">
          <div className="flex space-x-8">
            {/* Photo 1 Analysis */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30">
                {photos.photo1 && (
                  <img
                    src={photos.photo1}
                    alt="Person 1"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Scanning overlay */}
              <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse"></div>
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
                style={{
                  clipPath: `inset(${scanPosition}% 0 ${100 - scanPosition - 10}% 0)`,
                  transition: 'clip-path 0.05s linear'
                }}
              />
              {/* Analysis points */}
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 -left-1 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Connection Visualization */}
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
                </div>
                {/* Connection lines */}
                <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></div>
                <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gradient-to-l from-white/60 to-transparent"></div>
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full border border-white/30 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border border-white/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Photo 2 Analysis */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30">
                {photos.photo2 && (
                  <img
                    src={photos.photo2}
                    alt="Person 2"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Scanning overlay */}
              <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse"></div>
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
                style={{
                  clipPath: `inset(${(scanPosition + 30) % 100}% 0 ${100 - ((scanPosition + 30) % 100) - 10}% 0)`,
                  transition: 'clip-path 0.05s linear'
                }}
              />
              {/* Analysis points */}
              <div className="absolute -top-1 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-1/4 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute bottom-1/3 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.3s' }}></div>
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative mb-8">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.827}, 282.7`}
              className="transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-medium">{progress}%</span>
          </div>
        </div>

        {/* Current Analysis Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 animate-pulse">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-lg font-medium">
              {currentMessage.message}
            </h3>
          </div>
          <p className="text-white/70 text-sm">
            {progress < 25 && "Detecting facial landmarks and features..."}
            {progress >= 25 && progress < 50 && "Analyzing personality indicators..."}
            {progress >= 50 && progress < 75 && "Computing compatibility matrices..."}
            {progress >= 75 && progress < 95 && "Generating harmony predictions..."}
            {progress >= 95 && "Almost done! Preparing your results..."}
          </p>
        </div>

        {/* Analysis Indicators */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs text-white/60">
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 30 ? 'bg-green-400' : 'bg-white/20'}`}></div>
            <p>Face Detection</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 60 ? 'bg-blue-400' : 'bg-white/20'}`}></div>
            <p>Feature Analysis</p>
          </div>
          <div className="space-y-1">
            <div className={`w-2 h-2 rounded-full mx-auto transition-colors duration-500 ${progress > 90 ? 'bg-purple-400' : 'bg-white/20'}`}></div>
            <p>Compatibility</p>
          </div>
        </div>
      </div>

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-28 right-12 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/3 left-4 w-1 h-1 bg-white rounded-full twinkle opacity-70" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 right-6 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '1.8s' }} />
      </div>
    </div>
  );
}