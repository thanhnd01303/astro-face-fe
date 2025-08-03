import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, Instagram, MessageCircle, Twitter, Play, Pause, RotateCcw, Palette } from 'lucide-react';
import { UploadedPhotos, CompatibilityScore } from './CompatibilityScreen';

interface CompatibilityAnimationProps {
  photos: UploadedPhotos;
  score: CompatibilityScore;
  onBack: () => void;
}

type AnimationTheme = 'romantic' | 'professional' | 'playful';

const themes = {
  romantic: {
    name: 'Romantic',
    icon: '💖',
    colors: ['#FF6B6B', '#FF8E8E', '#FFB3BA'],
    description: 'Hearts and romantic vibes'
  },
  professional: {
    name: 'Professional',
    icon: '🤝',
    colors: ['#4ECDC4', '#45B7B8', '#6C5CE7'],
    description: 'Clean and business-focused'
  },
  playful: {
    name: 'Playful',
    icon: '🎉',
    colors: ['#A8E6CF', '#FDFD96', '#FFB3E6'],
    description: 'Fun and energetic'
  }
};

export function CompatibilityAnimation({ photos, score, onBack }: CompatibilityAnimationProps) {
  const [selectedTheme, setSelectedTheme] = useState<AnimationTheme>('romantic');
  const [customText, setCustomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Set default custom text based on score
    if (score.relationship > score.work) {
      setCustomText('Perfect Match! 💕');
    } else {
      setCustomText('Dream Team! 🚀');
    }
  }, [score]);

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
        return prev + 5;
      });
    }, 200);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    // Reset animation
  };

  const currentTheme = themes[selectedTheme];

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
        
        <h1 className="text-white text-xl font-medium">Create Animation</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Content */}
      <div className="px-4 h-full overflow-y-auto pb-20">
        {!isGenerated && !isGenerating && (
          <div className="space-y-6">
            {/* Preview Area */}
            <div className="relative aspect-square max-w-sm mx-auto bg-black/20 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"></div>
              
              {/* Mock Preview Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                      {photos.photo1 && <img src={photos.photo1} alt="Person 1" className="w-full h-full object-cover" />}
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                      {photos.photo2 && <img src={photos.photo2} alt="Person 2" className="w-full h-full object-cover" />}
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold mb-2">{score.overall}%</div>
                  <div className="text-white/80 text-sm">{customText || 'Compatibility Match!'}</div>
                </div>
              </div>

              {/* Preview Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white/80 text-sm">Preview Animation</p>
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-[#9370DB]" />
                Choose Theme
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTheme(key as AnimationTheme)}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300 text-center
                      ${selectedTheme === key 
                        ? 'border-[#9370DB] bg-[#9370DB]/20 scale-105' 
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{theme.icon}</div>
                    <div className="text-white text-sm font-medium mb-1">{theme.name}</div>
                    <div className="text-white/60 text-xs">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4">Personalize Your Message</h3>
              
              <input
                type="text"
                placeholder="Enter custom text (optional)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/20 text-center backdrop-blur-sm focus:outline-none focus:border-[#9370DB]"
                maxLength={50}
              />
              
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {[
                  'Perfect Match! 💕',
                  'Dream Team! 🚀',
                  'Soulmate Vibes ✨',
                  'Power Couple 💪',
                  'Best Friends Forever! 👫',
                  'Work Buddies! 🤝'
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
                className="w-full h-14 bg-gradient-to-r from-[#4B0082] to-[#00CED1] text-white rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Generate 15s Animation Video
              </button>
              
              <div className="text-center text-white/60 text-sm">
                <p>🎬 Creates a shareable 15-second video</p>
                <p>📱 Perfect for Instagram Reels & TikTok</p>
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
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
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
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4B0082" />
                      <stop offset="100%" stopColor="#00CED1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <h3 className="text-white text-xl font-medium mb-2">Creating Your Animation</h3>
              <p className="text-white/70">
                {progress < 25 && "Setting up scenes..."}
                {progress >= 25 && progress < 50 && "Adding effects and transitions..."}
                {progress >= 50 && progress < 75 && "Applying theme and colors..."}
                {progress >= 75 && progress < 95 && "Rendering final video..."}
                {progress >= 95 && "Almost ready!"}
              </p>
            </div>
          </div>
        )}

        {/* Generated Video */}
        {isGenerated && (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="relative aspect-square max-w-sm mx-auto bg-black rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                <div className="text-center animate-pulse">
                  <div className="flex space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50">
                      {photos.photo1 && <img src={photos.photo1} alt="Person 1" className="w-full h-full object-cover" />}
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50">
                      {photos.photo2 && <img src={photos.photo2} alt="Person 2" className="w-full h-full object-cover" />}
                    </div>
                  </div>
                  <div className="text-white text-3xl font-bold mb-2">{score.overall}%</div>
                  <div className="text-white text-lg">{customText}</div>
                  <div className="text-white/60 text-sm mt-2">#FaceHarmonyChallenge</div>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                
                <button
                  onClick={handleRestart}
                  className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="glassmorphism rounded-xl p-4">
              <h3 className="text-white font-medium text-lg mb-4 text-center">Share Your Results</h3>
              
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
              <p className="text-white font-medium">Challenge your friends!</p>
              <p className="text-white/60 text-sm">#FaceHarmonyChallenge</p>
              <p className="text-white/50 text-xs">Tag us @FaceAstro for a chance to be featured!</p>
            </div>
          </div>
        )}
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