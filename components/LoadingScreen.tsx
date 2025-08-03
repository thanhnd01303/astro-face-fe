import React from 'react';

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinning Loader */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-transparent mystical-gradient spin"></div>
          <div className="absolute inset-2 w-12 h-12 rounded-full bg-[#1A1A2E]"></div>
        </div>

        {/* Loading Text */}
        <p className="text-[#D3D3D3] text-sm font-medium">Analyzing your features...</p>

        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#4B0082] rounded-full twinkle" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#00CED1] rounded-full twinkle" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-2 h-2 bg-[#4B0082] rounded-full twinkle" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
}