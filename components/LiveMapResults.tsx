import React from 'react';
import { ArrowLeft, Eye, Map, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { PersonalityScores, CareerSuggestion } from './LifeMapScreen';

interface LiveMapResultsProps {
  photoUrl: string;
  personalityScores: PersonalityScores;
  careerSuggestions: CareerSuggestion[];
  onViewFacialDetails: () => void;
  onViewTimeline: () => void;
  onBack: () => void;
}

export function LiveMapResults({
  photoUrl,
  personalityScores,
  careerSuggestions,
  onViewFacialDetails,
  onViewTimeline,
  onBack
}: LiveMapResultsProps) {
  // Transform personality scores for pentagon radar chart
  const radarData = [
    {
      trait: 'Openness',
      score: personalityScores.openness,
      fullMark: 100
    },
    {
      trait: 'Conscientiousness',
      score: personalityScores.conscientiousness,
      fullMark: 100
    },
    {
      trait: 'Extraversion',
      score: personalityScores.extraversion,
      fullMark: 100
    },
    {
      trait: 'Agreeableness',
      score: personalityScores.agreeableness,
      fullMark: 100
    },
    {
      trait: 'Neuroticism',
      score: 100 - personalityScores.neuroticism, // Invert for display (lower neuroticism = better)
      fullMark: 100
    }
  ];

  const getPersonalityInsight = () => {
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = personalityScores;
    
    if (openness >= 80) {
      return "Your cosmic blueprint reveals an exceptional love for creativity and new experiences ✨ You're naturally drawn to innovation and artistic expression.";
    } else if (conscientiousness >= 80) {
      return "The stars align to show remarkable discipline and organization 🎯 Your systematic approach leads to great achievements.";
    } else if (extraversion >= 80) {
      return "Your energy radiates outward like a bright star 🌟 You naturally inspire and connect with others around you.";
    } else if (agreeableness >= 80) {
      return "Your cosmic nature shows deep empathy and harmony 💫 You have a gift for bringing peace and understanding to relationships.";
    } else {
      return "Your unique cosmic blend creates a balanced and thoughtful personality 🌙 You approach life with wisdom and consideration.";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-400 to-emerald-500';
    if (score >= 70) return 'from-cyan-400 to-blue-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-purple-400 to-pink-500';
  };

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
        
        <h1 className="text-white text-xl font-medium">Your Cosmic Personality</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pb-32">
        <div className="px-4 space-y-6">
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4 shadow-xl">
              <img src={photoUrl} alt="Your cosmic self" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-white text-2xl font-medium mb-2">Cosmic Blueprint Complete</h2>
            <p className="text-white/70 text-sm">Your personality revealed through the stars</p>
          </div>

          {/* Pentagon Radar Chart */}
          <div className="glassmorphism rounded-xl p-6 mb-6">
            <h3 className="text-white font-medium text-lg mb-4 text-center flex items-center justify-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Big Five Personality Dimensions
            </h3>
            
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis 
                    dataKey="trait" 
                    tick={{ fill: 'white', fontSize: 12 }}
                    className="text-xs"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                    tickCount={5}
                  />
                  <Radar 
                    name="Personality" 
                    dataKey="score" 
                    stroke="#9370DB" 
                    fill="url(#radarGradient)" 
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Numeric Scores */}
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(personalityScores).map(([trait, score]) => (
                <div key={trait} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white capitalize">{trait === 'neuroticism' ? 'Emotional Stability' : trait}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getScoreColor(trait === 'neuroticism' ? 100 - score : score)} transition-all duration-1000`}
                        style={{ width: `${trait === 'neuroticism' ? 100 - score : score}%` }}
                      />
                    </div>
                    <span className="text-white font-medium text-sm w-8">
                      {trait === 'neuroticism' ? 100 - score : score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <svg className="w-0 h-0">
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9370DB" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00CED1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Personality Insights */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium text-lg mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
              Your Cosmic Personality
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {getPersonalityInsight()}
            </p>
          </div>

          {/* Career Recommendations */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium text-lg mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
              Your Stellar Career Path
            </h3>
            
            <div className="space-y-3">
              {careerSuggestions.map((career, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{career.title}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">{career.match}%</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent p-4">
        <div className="space-y-3">
          <button
            onClick={onViewFacialDetails}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-5 h-5" />
            <span>View Facial Details</span>
          </button>
          
          <button
            onClick={onViewTimeline}
            className="w-full h-12 bg-white/10 border border-white/20 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-white/20"
          >
            <Map className="w-5 h-5" />
            <span>Explore Your Life Journey</span>
          </button>
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