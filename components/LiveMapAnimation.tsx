import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, Instagram, MessageCircle, Twitter, Play, Pause, RotateCcw, Palette, Star } from 'lucide-react';
import { PersonalityScores, CareerSuggestion } from './LifeMapScreen';

interface LiveMapAnimationProps {
  photoUrl: string;
  personalityScores: PersonalityScores;
  careerSuggestions: CareerSuggestion[];
  onBack: () => void;
}

type AnimationTheme = 'nebula' | 'starry' | 'cosmic';

const themes = {
  nebula: {
    name: 'Nebula Glow',
    icon: '🌌',
    colors: ['#9B59B6', '#E74C3C', '#3498DB'],
    description: 'Mystical purple and blue nebula effects'
  },
  starry: {
    name: 'Starry Night',
    icon: '⭐',
    colors: ['#F39C12', '#E67E22', '#D35400'],
    description: 'Golden starfield with twinkling effects'
  },
  cosmic: {
    name: 'Cosmic Dreams',
    icon: '🌠',
    colors: ['#1ABC9C', '#16A085', '#27AE60'],
    description: 'Aurora-like cosmic energy flows'
  }
};

export function LiveMapAnimation({ photoUrl, personalityScores, careerSuggestions, onBack }: LiveMapAnimationProps) {
  const [selectedTheme, setSelectedTheme] = useState<AnimationTheme>('nebula');
  const [customText, setCustomText] = useState('My Cosmic Journey Revealed!');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGenerated(true);
          return 100;
        }
        return prev + 4;
      });
    }, 150);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
  };

  const currentTheme = themes[selectedTheme];

  // Get the highest personality trait for display
  const getHighestTrait = () => {
    const traits = Object.entries(personalityScores);
    const highest = traits.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    return {
      name: highest[0].charAt(0).toUpperCase() + highest[0].slice(1),
      score: highest[1]
    };
  };

  const highestTrait = getHighestTrait();

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
        
        <h1 className="text-white text-xl font-medium">Create Animation</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Content */}
      <div className="px-4 h-full overflow-y-auto pb-20">
        {!isGenerated && !isGenerating && (
          <div className="space-y-6">
            {/* Preview Area */}
            <div className="relative aspect-square max-w-sm mx-auto bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
              
              {/* Mock Preview Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                  {/* Avatar with orbiting elements */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 mx-auto">
                      <img src={photoUrl} alt="Cosmic self" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Orbiting particles */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
                      <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full transform translate-x-2 -translate-y-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="text-white text-lg font-medium mb-2">{highestTrait.name}: {highestTrait.score}%</div>
                  <div className="text-white/80 text-sm mb-3">{customText}</div>
                  <div className="text-white/60 text-xs">#LiveMapJourney</div>
                </div>
              </div>

              {/* Preview Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white/80 text-sm">Preview Animation</p>
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-400" />
                Choose Cosmic Theme
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTheme(key as AnimationTheme)}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300 text-left
                      ${selectedTheme === key 
                        ? 'border-purple-400 bg-purple-400/20 scale-105' 
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{theme.icon}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{theme.name}</div>
                        <div className="text-white/60 text-sm">{theme.description}</div>
                      </div>
                      <div className="flex space-x-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4">Personalize Your Message</h3>
              
              <input
                type="text"
                placeholder="Enter custom text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/20 text-center backdrop-blur-sm focus:outline-none focus:border-purple-400"
                maxLength={60}
              />
              
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {[
                  'My Cosmic Journey Revealed! ✨',
                  'Discover Your Stellar Path 🌟',
                  'Personality Written in the Stars 🌌',
                  'My Big Five Cosmic Blueprint 🚀',
                  'Dawn, Noon, Dusk - My Journey 🌅',
                  'Facial Features = Destiny 👁️'
                ].map((text) => (
                  <button
                    key={text}
                    onClick={() => setCustomText(text)}
                    className="px-3 py-1.5 bg-white/10 text-white/80 text-xs rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="space-y-4">
              <button
                onClick={handleGenerate}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Generate 20s Cosmic Animation
              </button>
              
              <div className="text-center text-white/60 text-sm space-y-1">
                <p>🎬 Creates a shareable 20-second cosmic video</p>
                <p>📱 Perfect for Instagram Reels & TikTok</p>
                <p>✨ Features orbiting asteroids & glowing timeline</p>
              </div>
            </div>
          </div>
        )}

        {/* Generation Progress */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 relative mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
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
                    stroke="url(#cosmicGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.827}, 282.7`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-medium">{progress}%</span>
                </div>
                
                <svg className="w-0 h-0">
                  <defs>
                    <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9370DB" />
                      <stop offset="50%" stopColor="#00CED1" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <h3 className="text-white text-xl font-medium mb-2">Creating Your Cosmic Animation</h3>
              <p className="text-white/70">
                {progress < 25 && "Setting up cosmic stage and avatars..."}
                {progress >= 25 && progress < 50 && "Adding orbiting asteroids and facial features..."}
                {progress >= 50 && progress < 75 && "Animating timeline with Dawn, Noon, and Dusk..."}
                {progress >= 75 && "Applying theme effects and rendering final video..."}
              </p>
            </div>
          </div>
        )}

        {/* Generated Video */}
        {isGenerated && (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="relative aspect-square max-w-sm mx-auto bg-gradient-to-br from-purple-900/40 to-cyan-900/40 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center animate-pulse">
                  {/* Simulated animation content */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white/50 mx-auto">
                      <img src={photoUrl} alt="Cosmic self" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
                      <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-3"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
                      <div className="absolute top-1/2 right-0 w-2 h-2 bg-cyan-400 rounded-full transform translate-x-3 -translate-y-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="text-white text-xl font-medium mb-2">{highestTrait.name}: {highestTrait.score}%</div>
                  <div className="text-white text-sm mb-3">{customText}</div>
                  <div className="text-white/60 text-xs">#LiveMapJourney</div>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                
                <button
                  onClick={handleRestart}
                  className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4 text-center">Share Your Cosmic Journey</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-3 bg-black rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                  <span>TikTok</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-500 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter/X</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-3 bg-green-500 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5" />
                <span>Download MP4</span>
              </button>
            </div>

            {/* Challenge CTA */}
            <div className="text-center space-y-2">
              <p className="text-white font-medium flex items-center justify-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Challenge your friends!
              </p>
              <p className="text-white/60 text-sm">#LiveMapJourney</p>
              <p className="text-white/50 text-xs">Tag us @FaceAstro for a chance to be featured!</p>
            </div>
          </div>
        )}
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