import React, { useState } from 'react';
import { ArrowLeft, Share, Video, ChevronDown, ChevronUp, Sparkles, Briefcase, Heart } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { UploadedPhotos, CompatibilityScore } from './CompatibilityScreen';

interface CompatibilityResultsProps {
  photos: UploadedPhotos;
  score: CompatibilityScore;
  onGenerateAnimation: () => void;
  onBack: () => void;
}

export function CompatibilityResults({ photos, score, onGenerateAnimation, onBack }: CompatibilityResultsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('scores');

  // Transform traits data for radar chart
  const radarData = Object.entries(score.traits).map(([key, value]) => ({
    trait: key.charAt(0).toUpperCase() + key.slice(1),
    work: key === 'communication' || key === 'creativity' || key === 'ambition' ? value : Math.max(0, value - 10),
    relationship: key === 'empathy' || key === 'trust' || key === 'stability' ? value : Math.max(0, value - 8)
  }));

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'from-green-500/20 to-green-600/20';
    if (score >= 70) return 'from-yellow-500/20 to-yellow-600/20';
    if (score >= 60) return 'from-orange-500/20 to-orange-600/20';
    return 'from-red-500/20 to-red-600/20';
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2D1B69] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-30">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <h1 className="text-white text-xl font-medium">Compatibility Results</h1>
        
        <button
          onClick={() => {/* TODO: Implement share */}}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <Share className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pb-20">
        <div className="px-4 space-y-6">
          {/* Photo Header */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2">
                {photos.photo1 && (
                  <img src={photos.photo1} alt="Person 1" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-white text-sm">{photos.person1Name}</p>
            </div>
            
            <div className="flex items-center">
              <div className="text-4xl animate-pulse">💫</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2">
                {photos.photo2 && (
                  <img src={photos.photo2} alt="Person 2" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-white text-sm">{photos.person2Name}</p>
            </div>
          </div>

          {/* Overall Compatibility Score */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className={`text-6xl font-medium bg-gradient-to-r ${getScoreBg(score.overall)} bg-clip-text text-transparent`}>
                {score.overall}%
              </div>
              <div className="text-white text-lg">Overall Harmony</div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <button
              onClick={() => toggleSection('scores')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-medium text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-[#9370DB]" />
                Compatibility Scores
              </h3>
              {expandedSection === 'scores' ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
            </button>
            
            {expandedSection === 'scores' && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-white">Work Collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                        style={{ width: `${score.work}%` }}
                      />
                    </div>
                    <span className={`font-medium ${getScoreColor(score.work)}`}>{score.work}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-pink-400 mr-3" />
                    <span className="text-white">Relationship Harmony</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-1000"
                        style={{ width: `${score.relationship}%` }}
                      />
                    </div>
                    <span className={`font-medium ${getScoreColor(score.relationship)}`}>{score.relationship}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Radar Chart */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium text-lg mb-4 text-center">Compatibility Traits</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: 'white', fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                    tickCount={5}
                  />
                  <Radar 
                    name="Work" 
                    dataKey="work" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Relationship" 
                    dataKey="relationship" 
                    stroke="#EC4899" 
                    fill="#EC4899" 
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ color: 'white' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <button
              onClick={() => toggleSection('features')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-medium text-lg">Facial Feature Analysis</h3>
              {expandedSection === 'features' ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
            </button>
            
            {expandedSection === 'features' && (
              <div className="mt-4 space-y-3 text-sm">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[#9370DB] font-medium mb-1">👁️ Eye Analysis</p>
                  <p className="text-white/90">Both individuals show wide-set eyes suggesting open-mindedness and excellent communication potential. This enhances work collaboration significantly.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[#9370DB] font-medium mb-1">🏔️ Forehead Structure</p>
                  <p className="text-white/90">Broad foreheads indicate strong decision-making skills and intellectual compatibility. Perfect for strategic partnerships and creative projects.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-[#9370DB] font-medium mb-1">👄 Mouth Shape</p>
                  <p className="text-white/90">Complementary mouth shapes suggest balanced communication styles - one more expressive, one more thoughtful. Ideal for harmonious relationships.</p>
                </div>
              </div>
            )}
          </div>

          {/* Fun Facts */}
          <div className="glassmorphism rounded-xl p-4 mb-6">
            <button
              onClick={() => toggleSection('facts')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-medium text-lg">Fun Compatibility Facts</h3>
              {expandedSection === 'facts' ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
            </button>
            
            {expandedSection === 'facts' && (
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🚀</span>
                  <p className="text-white/90">Your nose shapes indicate a shared love for adventure and new experiences!</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎯</span>
                  <p className="text-white/90">Similar eyebrow arches suggest you both approach goals with determination and focus.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌟</span>
                  <p className="text-white/90">Your facial symmetry levels indicate great potential for long-term harmony and understanding.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent p-4">
        <div className="space-y-3">
          <button
            onClick={onGenerateAnimation}
            className="w-full h-14 bg-gradient-to-r from-[#4B0082] to-[#00CED1] text-white rounded-2xl font-medium text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Video className="w-5 h-5" />
            <span>Generate Animation Video</span>
          </button>
          
          <div className="text-center">
            <p className="text-white/50 text-xs">#FaceHarmonyChallenge • Share your results!</p>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-32 right-12 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-56 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
}