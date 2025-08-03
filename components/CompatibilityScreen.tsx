import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CompatibilityPhotoUpload } from './CompatibilityPhotoUpload';
import { CompatibilityAnalysis } from './CompatibilityAnalysis';
import { CompatibilityResults } from './CompatibilityResults';
import { CompatibilityAnimation } from './CompatibilityAnimation';

type CompatibilityState = 'home' | 'upload' | 'analysis' | 'results' | 'animation';

interface CompatibilityScreenProps {
  onBack: () => void;
}

export interface UploadedPhotos {
  photo1: string | null;
  photo2: string | null;
  person1Name?: string;
  person2Name?: string;
}

export interface CompatibilityScore {
  work: number;
  relationship: number;
  overall: number;
  traits: {
    communication: number;
    trust: number;
    creativity: number;
    empathy: number;
    ambition: number;
    stability: number;
  };
}

export function CompatibilityScreen({ onBack }: CompatibilityScreenProps) {
  const [currentState, setCurrentState] = useState<CompatibilityState>('home');
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhotos>({
    photo1: null,
    photo2: null
  });
  const [compatibilityScore, setCompatibilityScore] = useState<CompatibilityScore | null>(null);

  const handleStartTest = () => {
    setCurrentState('upload');
  };

  const handlePhotosUploaded = (photos: UploadedPhotos) => {
    setUploadedPhotos(photos);
    setCurrentState('analysis');
  };

  const handleAnalysisComplete = (score: CompatibilityScore) => {
    setCompatibilityScore(score);
    setCurrentState('results');
  };

  const handleGenerateAnimation = () => {
    setCurrentState('animation');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setUploadedPhotos({ photo1: null, photo2: null });
    setCompatibilityScore(null);
  };

  const handleBackToResults = () => {
    setCurrentState('results');
  };

  const handleBackToUpload = () => {
    setCurrentState('upload');
  };

  if (currentState === 'upload') {
    return (
      <CompatibilityPhotoUpload
        onBack={handleBackToHome}
        onPhotosUploaded={handlePhotosUploaded}
        initialPhotos={uploadedPhotos}
      />
    );
  }

  if (currentState === 'analysis') {
    return (
      <CompatibilityAnalysis
        photos={uploadedPhotos}
        onAnalysisComplete={handleAnalysisComplete}
        onBack={handleBackToUpload}
      />
    );
  }

  if (currentState === 'results' && compatibilityScore) {
    return (
      <CompatibilityResults
        photos={uploadedPhotos}
        score={compatibilityScore}
        onGenerateAnimation={handleGenerateAnimation}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentState === 'animation' && compatibilityScore) {
    return (
      <CompatibilityAnimation
        photos={uploadedPhotos}
        score={compatibilityScore}
        onBack={handleBackToResults}
      />
    );
  }

  // Home/Landing screen
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#4B0082] to-[#00CED1] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-30">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <h1 className="text-white text-xl font-medium">Compatibility Check</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Floating Hearts and Connection Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-pulse">💕</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute bottom-1/4 right-1/3 text-2xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>🌟</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 relative z-10">
        {/* Logo/Icon Area */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            {/* Two overlapping face silhouettes forming heart shape */}
            <div className="relative">
              <div className="absolute left-0 w-8 h-8 bg-white/30 rounded-full"></div>
              <div className="absolute right-0 w-8 h-8 bg-white/30 rounded-full"></div>
              <div className="w-12 h-6 bg-gradient-to-b from-transparent to-white/20 rounded-b-full mt-4"></div>
            </div>
          </div>
          
          {/* Pulsating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
        </div>

        {/* Title and Tagline */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl font-medium mb-3">Face Harmony</h2>
          <p className="text-white/80 text-base mb-2">Discover Your Perfect Match!</p>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Upload two photos and unlock the secrets of compatibility through AI-powered face reading
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={handleStartTest}
          className="w-72 h-14 bg-white/90 text-[#4B0082] rounded-xl font-medium text-base shadow-2xl transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-3xl relative overflow-hidden group max-w-[calc(100vw-2rem)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4B0082]/10 to-[#00CED1]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative z-10">Start Compatibility Test</span>
        </button>

        {/* Feature Highlights */}
        <div className="flex justify-center space-x-6 mt-8 text-white/70 text-xs">
          <div className="text-center">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">🤝</span>
            </div>
            <p>Work Match</p>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">💖</span>
            </div>
            <p>Love Match</p>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">🎬</span>
            </div>
            <p>Share Video</p>
          </div>
        </div>

        {/* Challenge Hashtag */}
        <div className="absolute bottom-safe-bottom left-0 right-0 text-center">
          <p className="text-white/50 text-sm">#FaceHarmonyChallenge</p>
        </div>
      </div>

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-24 right-12 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 left-4 w-1 h-1 bg-white rounded-full twinkle opacity-70" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-6 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '1.8s' }} />
      </div>
    </div>
  );
}