import React, { useState } from 'react';
import { ArrowLeft, Map, Sparkles } from 'lucide-react';
import { PersonalityScores } from './LifeMapScreen';

interface LiveMapFacialDetailsProps {
  photoUrl: string;
  personalityScores: PersonalityScores;
  onBack: () => void;
  onViewTimeline: () => void;
}

interface FacialFeature {
  id: string;
  name: string;
  title: string;
  icon: string;
  strengths: string[];
  growth: string[];
  startingAngle: number;
}

export function LiveMapFacialDetails({ photoUrl, personalityScores, onBack, onViewTimeline }: LiveMapFacialDetailsProps) {
  // Default to 'eyes' feature
  const [activeFeature, setActiveFeature] = useState<string>('eyes');

  const facialFeatures: FacialFeature[] = [
    {
      id: 'eyes',
      name: 'Eyes',
      title: 'Eyes: Windows to Your Soul',
      icon: '👁️',
      startingAngle: 0,
      strengths: [
        'Wide-set eyes indicate strong intuition and empathy',
        'Bright, clear eyes suggest high emotional intelligence',
        'Deep-set eyes reveal thoughtful and analytical nature'
      ],
      growth: [
        'Practice maintaining eye contact in conversations',
        'Trust your intuitive insights more often',
        'Balance analysis with emotional expression'
      ]
    },
    {
      id: 'nose',
      name: 'Nose',
      title: 'Nose: Mountain of Wisdom',
      icon: '👃',
      startingAngle: 72,
      strengths: [
        'Straight nose bridge suggests balanced decision-making',
        'Well-proportioned nose indicates practical wisdom',
        'Strong nose structure shows leadership potential'
      ],
      growth: [
        'Trust your practical instincts in complex situations',
        'Embrace leadership opportunities that come your way',
        'Balance idealism with realistic planning'
      ]
    },
    {
      id: 'mouth',
      name: 'Mouth',
      title: 'Mouth: River of Expression',
      icon: '👄',
      startingAngle: 144,
      strengths: [
        'Full lips suggest warmth and expressiveness',
        'Well-defined mouth shows clear communication skills',
        'Gentle smile indicates natural charm and likability'
      ],
      growth: [
        'Express your thoughts more openly in group settings',
        'Use your natural charm to build stronger relationships',
        'Practice active listening to complement your speaking skills'
      ]
    },
    {
      id: 'forehead',
      name: 'Forehead',
      title: 'Forehead: Palace of Intellect',
      icon: '🧠',
      startingAngle: 216,
      strengths: [
        'Broad forehead indicates strong analytical abilities',
        'High forehead suggests innovative thinking',
        'Clear forehead shows mental clarity and focus'
      ],
      growth: [
        'Apply your analytical skills to creative projects',
        'Share your innovative ideas with confidence',
        'Balance intellectual pursuits with emotional connections'
      ]
    },
    {
      id: 'eyebrows',
      name: 'Eyebrows',
      title: 'Eyebrows: Frames of Character',
      icon: '✨',
      startingAngle: 288,
      strengths: [
        'Well-shaped eyebrows suggest attention to detail',
        'Natural arch indicates strong personal boundaries',
        'Expressive eyebrows show emotional authenticity'
      ],
      growth: [
        'Use your attention to detail in planning and organization',
        'Maintain healthy boundaries while staying open to others',
        'Let your authentic emotions guide your decisions'
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const activeFeatureData = facialFeatures.find(f => f.id === activeFeature);

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
        
        <h1 className="text-white text-xl font-medium">Facial Features</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-safe-bottom">
        <div className="px-4">
          {/* Top Section - Orbital System */}
          <div className="text-center mb-4 mt-2">
            <h2 className="text-white text-lg font-medium mb-2">Your Cosmic Features</h2>
            <p className="text-white/70 text-sm">Tap the orbiting features to discover their meanings</p>
          </div>

          {/* Central Avatar with Orbiting Features - Moved to top */}
          <div className="relative mb-8 flex justify-center" style={{ height: '280px' }}>
            {/* Constellation background */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full border border-white/10 opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-48 h-48 rounded-full border border-white/5 opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Central avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 relative z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
                <img
                  src={photoUrl}
                  alt="Your cosmic self"
                  className="w-full h-full object-cover"
                />
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
              </div>

              {/* Orbiting asteroids */}
              <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2">
                {facialFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${feature.startingAngle}deg)`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => handleFeatureClick(feature.id)}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-xs
                          border-2 cursor-pointer transition-all duration-300 relative
                          ${activeFeature === feature.id
                            ? 'border-cyan-400 bg-cyan-400/30 scale-125 shadow-lg shadow-cyan-400/50'
                            : 'border-white/30 bg-white/10 hover:border-purple-400/50 hover:scale-110 backdrop-blur-sm'
                          }
                        `}
                        style={{
                          animation: `asteroidFloat ${4 + index * 0.5}s ease-in-out infinite`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        <span className="relative z-10">{feature.icon}</span>
                        {activeFeature === feature.id && (
                          <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20"></div>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constellation lines */}
              <svg className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-10">
                <defs>
                  <radialGradient id="constellationGradient">
                    <stop offset="0%" stopColor="#9370DB" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#00CED1" stopOpacity="0.2"/>
                  </radialGradient>
                </defs>
                {facialFeatures.map((feature, index) => {
                  const nextIndex = (index + 1) % facialFeatures.length;
                  const angle1 = (feature.startingAngle * Math.PI) / 180;
                  const angle2 = (facialFeatures[nextIndex].startingAngle * Math.PI) / 180;
                  const radius = 120;
                  const centerX = 128;
                  const centerY = 128;
                  
                  const x1 = centerX + radius * Math.cos(angle1);
                  const y1 = centerY + radius * Math.sin(angle1);
                  const x2 = centerX + radius * Math.cos(angle2);
                  const y2 = centerY + radius * Math.sin(angle2);
                  
                  return (
                    <line
                      key={`line-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#constellationGradient)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Bottom Section - Feature Information Display */}
          {activeFeatureData && (
            <div className="glassmorphism rounded-xl p-4 border border-white/20 relative overflow-hidden">
              {/* Background gradient based on active feature */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl"></div>
              
              <div className="relative z-10">
                {/* Feature Header */}
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{activeFeatureData.icon}</div>
                  <h3 className="text-white text-lg font-medium">{activeFeatureData.title}</h3>
                </div>

                {/* Feature Details */}
                <div className="space-y-4">
                  {/* Strengths Section */}
                  <div>
                    <h4 className="text-green-400 font-medium mb-2 flex items-center text-base">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Cosmic Strengths
                    </h4>
                    <div className="space-y-2">
                      {activeFeatureData.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start bg-white/5 rounded-lg p-2">
                          <span className="text-green-400 mr-3 mt-0.5 w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
                          <p className="text-white/90 text-xs leading-relaxed">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Areas Section */}
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2 flex items-center text-base">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Growth Opportunities
                    </h4>
                    <div className="space-y-2">
                      {activeFeatureData.growth.map((growth, index) => (
                        <div key={index} className="flex items-start bg-white/5 rounded-lg p-2">
                          <span className="text-cyan-400 mr-3 mt-0.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                          <p className="text-white/90 text-xs leading-relaxed">{growth}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feature Navigation Hint */}
                <div className="mt-4 text-center">
                  <p className="text-white/50 text-xs">
                    Tap other orbiting features above to explore more insights
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent p-4 pb-safe-bottom">
        <button
          onClick={onViewTimeline}
          className="w-full max-w-sm mx-auto h-12 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <Map className="w-5 h-5" />
          <span>Explore Your Life Journey</span>
        </button>
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