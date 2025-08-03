import React from 'react';
import { Smile, Zap, Star } from 'lucide-react';

interface ScoreCircleProps {
  score: number;
  label: string;
  icon: React.ElementType;
  color: string;
  delay?: string;
}

function ScoreCircle({ score, label, icon: Icon, color, delay = '0s' }: ScoreCircleProps) {
  const circumference = 2 * Math.PI * 30; // radius = 30
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center space-y-2 slide-up`} style={{ animationDelay: delay }}>
      <div className="relative w-20 h-20">
        {/* Background circle */}
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="30"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r="30"
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ animationDelay: delay }}
          />
        </svg>
        
        {/* Icon and score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-5 h-5 mb-1`} style={{ color }} />
          <span className="text-white text-xs font-medium">{score}%</span>
        </div>
      </div>
      
      <p className="text-[#D3D3D3] text-xs text-center font-medium">{label}</p>
    </div>
  );
}

export function MoodEnergyScore() {
  // Mock scores - in a real app, these would come from face analysis
  const moodScore = 78;
  const energyScore = 65;
  const overallScore = 72;

  return (
    <div className="w-full bg-gradient-to-br from-[#2A1B5A]/30 to-[#1A4A52]/30 rounded-xl p-4 border border-white/10 fade-in">
      <h3 className="text-white font-medium text-base mb-4 text-center">Today's Energy Reading</h3>
      
      <div className="flex justify-around items-center">
        <ScoreCircle
          score={moodScore}
          label="Mood"
          icon={Smile}
          color="#9370DB"
          delay="0.2s"
        />
        
        <ScoreCircle
          score={energyScore}
          label="Energy"
          icon={Zap}
          color="#00CED1"
          delay="0.4s"
        />
        
        <ScoreCircle
          score={overallScore}
          label="Overall"
          icon={Star}
          color="#FFD700"
          delay="0.6s"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-[#D3D3D3] text-xs leading-relaxed">
          Your facial analysis shows {moodScore >= 70 ? 'positive' : moodScore >= 50 ? 'balanced' : 'contemplative'} mood 
          and {energyScore >= 70 ? 'high' : energyScore >= 50 ? 'moderate' : 'low'} energy levels today.
        </p>
      </div>
    </div>
  );
}