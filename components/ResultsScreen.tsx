import React, { useEffect, useState } from 'react';
import { Eye, AlertTriangle, ArrowLeft } from 'lucide-react';
import { MoodEnergyScore } from './MoodEnergyScore';

interface ResultsScreenProps {
  photoUrl: string;
  onBack: () => void;
}

export function ResultsScreen({ photoUrl, onBack }: ResultsScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Mock insights - in a real app, these would come from the face reading API
  const faceDescription = "Your facial features reveal a harmonious blend of determination and sensitivity. The gentle curve of your eyes suggests empathy and intuition, while your jawline shows strong decision-making abilities. Today, your expression carries an underlying current of optimism mixed with thoughtful consideration.";
  
  const focusInsight = "Your facial features suggest strong leadership qualities and natural charisma. Today is perfect for taking initiative in important projects and expressing your creative ideas confidently. Trust your instincts in social situations.";
  
  const avoidInsight = "Be cautious about making impulsive decisions regarding finances or relationships. Your analytical nature might be overshadowed by emotional reactions, so take time to reflect before acting on major choices.";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-safe-top overflow-y-auto">
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm pb-safe-bottom">
        {/* Header */}
        <div className="flex items-center w-full">
          <button
            onClick={onBack}
            className="text-[#D3D3D3] hover:text-white transition-colors duration-200 p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-medium text-center flex-1">Your Daily Insight</h1>
          <div className="w-6"></div>
        </div>

        {/* Central Photo */}
        <div className={`relative ${showContent ? 'zoom-in' : 'opacity-0'}`}>
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent mystical-border glow">
            <img
              src={photoUrl}
              alt="Uploaded face"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Orbital decoration */}
          <div className="absolute -inset-6 border border-white/10 rounded-full"></div>
          <div className="absolute -inset-8 border border-white/5 rounded-full"></div>
        </div>

        {/* Mood & Energy Scores */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <MoodEnergyScore />
        </div>

        {/* Face Description Section */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-br from-[#4B0082]/20 to-[#00CED1]/20 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-medium text-lg mb-3 text-center">What does your face tell today?</h3>
            <p className="text-white/90 text-sm leading-relaxed text-center">
              {faceDescription}
            </p>
          </div>
        </div>

        {/* Focus On Card */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-[#9370DB] to-[#B0E0E6] rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium text-lg">Focus On</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {focusInsight}
            </p>
          </div>
        </div>

        {/* Consider Avoiding Card */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-br from-[#8A2BE2] to-[#20B2AA] rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium text-lg">Consider Avoiding</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {avoidInsight}
            </p>
          </div>
        </div>

        {/* New Reading Button */}
        <div className={`pt-4 ${showContent ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <button
            onClick={onBack}
            className="w-[200px] h-[50px] rounded-lg bg-gradient-to-r from-[#4B0082] to-[#00CED1] text-white font-medium text-base transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg"
          >
            New Reading
          </button>
        </div>

        {/* Mystical decoration */}
        <div className="absolute top-20 right-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-40 left-6 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 right-12 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}