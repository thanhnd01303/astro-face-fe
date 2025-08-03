import React from 'react';
import { ArrowLeft, Upload, Sparkles, Map, Star } from 'lucide-react';

interface LiveMapEntryProps {
  onBack: () => void;
  onStartJourney: () => void;
}

export function LiveMapEntry({ onBack, onStartJourney }: LiveMapEntryProps) {
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
        
        <h1 className="text-white text-xl font-medium">LiveMap</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Nebula gradients */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-radial from-indigo-400/10 to-transparent rounded-full blur-xl"></div>
        
        {/* Twinkling stars */}
        <div className="absolute top-12 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-80" />
        <div className="absolute top-24 right-12 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-70" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/3 left-4 w-1 h-1 bg-white rounded-full twinkle opacity-90" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 right-6 w-1 h-1 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1.8s' }} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 relative z-10">
        {/* Central Upload Area with Glowing Orbit */}
        <div className="relative mb-12">
          {/* Outer glowing ring */}
          <div className="w-40 h-40 rounded-full border-2 border-gradient-to-r from-purple-400 to-cyan-400 opacity-30 animate-pulse"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border border-white/20 opacity-40"></div>
          
          {/* Inner upload button */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full transform -translate-x-1/2"></div>
          </div>
          
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
            <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
          </div>
          
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
            <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-medium mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 mr-3 text-cyan-400" />
            Cosmic Journey
          </h2>
          <p className="text-white/80 text-lg mb-3">Unveil Your Personality & Destiny</p>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Upload your face to explore your cosmic blueprint through AI-powered personality analysis and life predictions
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={onStartJourney}
          className="w-72 h-16 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-2xl font-medium text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative z-10 flex items-center justify-center">
            <Map className="w-6 h-6 mr-3" />
            Upload Your Face to Explore Your Cosmic Journey!
          </span>
        </button>

        {/* Feature Highlights */}
        <div className="flex justify-center space-x-8 mt-12 text-white/70 text-sm">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20">
              <span className="text-lg">🧠</span>
            </div>
            <p>Big Five<br />Personality</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20">
              <span className="text-lg">🪐</span>
            </div>
            <p>Facial<br />Features</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20">
              <span className="text-lg">🌅</span>
            </div>
            <p>Life<br />Journey</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20">
              <span className="text-lg">🎬</span>
            </div>
            <p>Share<br />Animation</p>
          </div>
        </div>

        {/* Challenge Hashtag */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/50 text-sm flex items-center justify-center">
            <Star className="w-4 h-4 mr-2" />
            #LiveMapJourney
            <Star className="w-4 h-4 ml-2" />
          </p>
        </div>
      </div>
    </div>
  );
}