import React, { useEffect, useState } from 'react';
import { Eye, AlertTriangle, ArrowLeft, Star, Shield } from 'lucide-react';
import { MoodEnergyScore } from './MoodEnergyScore';
import { DailyInsightResponse } from '../src/services/geminiService';

interface ResultsScreenProps {
  photoUrl: string;
  dailyInsightData: DailyInsightResponse | null;
  onBack: () => void;
}

export function ResultsScreen({ photoUrl, dailyInsightData, onBack }: ResultsScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Use API data or fallback to mock data
  const data = dailyInsightData || {
    mainImpression: {
      shineIndex: 78,
      energyColor: "Golden Amber",
      dayKeyword: "Radiance"
    },
    companionMessage: {
      title: "Your Inner Light Shines Bright",
      emotionalAnalysis: "Your facial features reveal a harmonious blend of determination and sensitivity. The gentle curve of your eyes suggests empathy and intuition, while your jawline shows strong decision-making abilities.",
      healthNotices: []
    },
    todaySuggestion: {
      title: "Today's Cosmic Guidance for You",
      focusOn: {
        icon: "star",
        recommendations: [
          "Trust your intuitive insights in important decisions",
          "Express your creative ideas with confidence",
          "Take initiative in social situations"
        ]
      },
      shouldAvoid: {
        icon: "shield",
        recommendations: [
          "Making impulsive financial decisions",
          "Overanalyzing emotional situations"
        ]
      }
    },
    selfDiscovery: {
      title: "Your Cosmic Nature",
      content: "Your facial structure reveals a soul that bridges the analytical and intuitive realms. You possess natural leadership qualities combined with deep empathy."
    }
  };

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
        <div className={`relative text-center ${showContent ? 'zoom-in' : 'opacity-0'}`}>
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent mystical-border glow">
            <img
              src={photoUrl}
              alt="Uploaded face"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Shine Index Display */}
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{data.mainImpression.shineIndex}%</div>
            <div className="text-sm text-white/70">{data.mainImpression.dayKeyword}</div>
            <div className="text-xs text-white/50">{data.mainImpression.energyColor}</div>
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
            <h3 className="text-white font-medium text-lg mb-3 text-center">{data.companionMessage.title}</h3>
            <p className="text-white/90 text-sm leading-relaxed text-center">
              {data.companionMessage.emotionalAnalysis}
            </p>
            
            {/* Health Notices */}
            {data.companionMessage.healthNotices && data.companionMessage.healthNotices.length > 0 && (
              <div className="mt-4 space-y-2">
                {data.companionMessage.healthNotices.map((notice, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-2">
                    <span className="text-lg">{notice.icon}</span>
                    <div>
                      <div className="text-white/80 text-xs font-medium">{notice.type}</div>
                      <div className="text-white/70 text-xs">{notice.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Focus On Card */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-[#9370DB] to-[#B0E0E6] rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium text-lg">{data.todaySuggestion.title}</h3>
            </div>
            <div className="space-y-2">
              {data.todaySuggestion.focusOn.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-300 mt-1">⭐</span>
                  <p className="text-white/90 text-sm leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consider Avoiding Card */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-br from-[#8A2BE2] to-[#20B2AA] rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium text-lg">Consider Avoiding</h3>
            </div>
            <div className="space-y-2">
              {data.todaySuggestion.shouldAvoid.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-orange-300 mt-1">⚠️</span>
                  <p className="text-white/90 text-sm leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Self Discovery Card */}
        <div className={`w-full ${showContent ? 'slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-br from-[#6A5ACD] to-[#48D1CC] rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium text-lg">{data.selfDiscovery.title}</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {data.selfDiscovery.content}
            </p>
          </div>
        </div>

        {/* New Reading Button */}
        <div className={`pt-4 ${showContent ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
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