import React, { useState } from 'react';
import { ArrowLeft, Video, Sunrise, Sun, Sunset, Sparkles } from 'lucide-react';
import { PersonalityScores } from './LifeMapScreen';

interface LiveMapTimelineProps {
  photoUrl: string;
  personalityScores: PersonalityScores;
  onBack: () => void;
  onGenerateAnimation: () => void;
}

interface LifeMilestone {
  id: 'dawn' | 'noon' | 'dusk';
  title: string;
  period: string;
  description: string;
  predictions: string[];
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

export function LiveMapTimeline({ photoUrl, personalityScores, onBack, onGenerateAnimation }: LiveMapTimelineProps) {
  const [activeMilestone, setActiveMilestone] = useState<'dawn' | 'noon' | 'dusk' | null>(null);

  const milestones: LifeMilestone[] = [
    {
      id: 'dawn',
      title: 'Early Life: Your Dawn',
      period: '18-30 years',
      description: 'Your cosmic blueprint reveals a period of discovery and foundation-building. Your high openness will lead you to explore diverse experiences and creative pursuits.',
      predictions: [
        'Strong curiosity will drive your educational and career choices',
        'Natural creativity will open unexpected opportunities',
        'Early leadership experiences will shape your confidence',
        'Travel and new experiences will broaden your perspective'
      ],
      color: '#FF6B6B',
      gradient: 'from-pink-400 to-orange-400',
      icon: <Sunrise className="w-6 h-6" />
    },
    {
      id: 'noon',
      title: 'Mid-Life: Your Noon',
      period: '31-50 years',
      description: 'The peak of your cosmic power arrives. Your conscientiousness and accumulated wisdom will lead to significant achievements and recognition.',
      predictions: [
        'Career reaches its highest potential and recognition',
        'Leadership roles and major responsibilities align perfectly',
        'Creative projects gain widespread appreciation',
        'Personal relationships deepen with emotional maturity',
        'Financial stability and material success are achieved'
      ],
      color: '#FFD93D',
      gradient: 'from-yellow-400 to-amber-400',
      icon: <Sun className="w-6 h-6" />
    },
    {
      id: 'dusk',
      title: 'Later Life: Your Dusk',
      period: '51+ years',
      description: 'Your cosmic journey enters its wisdom phase. High agreeableness will make you a beloved mentor and guide to others seeking their own paths.',
      predictions: [
        'Becomes a respected mentor and wisdom keeper',
        'Spiritual growth and inner peace take priority',
        'Legacy projects and philanthropic endeavors flourish',
        'Deep, meaningful relationships provide lasting joy',
        'Creative expression reaches its most profound form'
      ],
      color: '#9B59B6',
      gradient: 'from-purple-400 to-indigo-400',
      icon: <Sunset className="w-6 h-6" />
    }
  ];

  const handleMilestoneClick = (milestoneId: 'dawn' | 'noon' | 'dusk') => {
    setActiveMilestone(activeMilestone === milestoneId ? null : milestoneId);
  };

  const activeMilestoneData = milestones.find(m => m.id === activeMilestone);

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
        
        <h1 className="text-white text-xl font-medium">Life Journey</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-24">
        <div className="px-4">
          {/* Instructions */}
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl font-medium mb-3 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
              Your Cosmic Journey
            </h2>
            <p className="text-white/70 text-sm">Tap each milestone to explore your life's cosmic path</p>
          </div>

          {/* Cosmic Timeline */}
          <div className="relative mb-8">
            {/* Glowing cosmic path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 via-yellow-400 to-purple-400 transform -translate-x-1/2 opacity-60"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2 opacity-30 animate-pulse"></div>

            {/* Timeline milestones */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {/* Milestone orb */}
                  <button
                    onClick={() => handleMilestoneClick(milestone.id)}
                    className={`
                      absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full
                      transition-all duration-300 cursor-pointer z-10
                      ${activeMilestone === milestone.id
                        ? 'scale-125 shadow-2xl'
                        : 'hover:scale-110 shadow-xl'
                      }
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)`,
                      boxShadow: `0 0 30px ${milestone.color}66`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {milestone.icon}
                    </div>
                    
                    {/* Pulsing rings */}
                    <div 
                      className="absolute inset-0 rounded-full border-2 animate-ping opacity-30"
                      style={{ borderColor: milestone.color }}
                    />
                    <div 
                      className="absolute inset-2 rounded-full border animate-pulse opacity-20"
                      style={{ borderColor: milestone.color }}
                    />
                  </button>

                  {/* Milestone info */}
                  <div className={`ml-24 ${index % 2 === 1 ? 'mr-24 ml-0 text-right' : ''}`}>
                    <h3 className="text-white font-medium text-lg mb-1">{milestone.title}</h3>
                    <p className="text-white/70 text-sm">{milestone.period}</p>
                  </div>

                  {/* Milestone detail card (when active) */}
                  {activeMilestone === milestone.id && (
                    <div className={`
                      mt-4 glassmorphism rounded-xl p-4 border-l-4 relative overflow-hidden
                      ${index % 2 === 1 ? 'mr-24 ml-0' : 'ml-24'}
                    `}
                    style={{ borderLeftColor: milestone.color }}
                    >
                      {/* Background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${milestone.gradient} opacity-10 rounded-xl`}
                      />
                      
                      <div className="relative z-10">
                        <p className="text-white/90 text-sm mb-4 leading-relaxed">
                          {milestone.description}
                        </p>
                        
                        <h4 className="text-white font-medium mb-3 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" style={{ color: milestone.color }} />
                          Cosmic Predictions
                        </h4>
                        
                        <ul className="space-y-2">
                          {milestone.predictions.map((prediction, predIndex) => (
                            <li key={predIndex} className="text-white/80 text-sm flex items-start">
                              <span 
                                className="mr-2 mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: milestone.color }}
                              />
                              {prediction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Background gradient animation */}
          <div 
            className={`fixed inset-0 transition-all duration-1000 pointer-events-none opacity-10 ${
              activeMilestone === 'dawn' ? 'bg-gradient-to-br from-pink-500 to-orange-500' :
              activeMilestone === 'noon' ? 'bg-gradient-to-br from-yellow-400 to-amber-400' :
              activeMilestone === 'dusk' ? 'bg-gradient-to-br from-purple-500 to-indigo-500' :
              'bg-transparent'
            }`}
          />
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent p-4">
        <button
          onClick={onGenerateAnimation}
          className="w-full h-14 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-2xl font-medium text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <Video className="w-5 h-5" />
          <span>Generate Cosmic Animation</span>
        </button>
        
        <div className="text-center mt-3">
          <p className="text-white/50 text-xs">#LiveMapJourney • Share your cosmic timeline!</p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-32 right-12 w-1.5 h-1.5 bg-cyan-400 rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-purple-400 rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-56 right-8 w-2 h-2 bg-yellow-400 rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
}