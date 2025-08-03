import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

interface PhotoUploadProps {
  onUpload: (file: File) => void;
  onExplore: () => void;
  onBack: () => void;
}

export function PhotoUpload({ onUpload, onExplore, onBack }: PhotoUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-16">
      <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
        {/* Back Button */}
        <div className="flex items-center w-full mb-4">
          <button
            onClick={onBack}
            className="text-[#D3D3D3] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-2xl font-medium">Daily Insight</h1>
          <p className="text-[#D3D3D3] text-sm">Discover your face reading analysis</p>
        </div>

        {/* Photo Upload Frame */}
        <div className="relative">
          <label 
            htmlFor="photo-upload" 
            className="block w-[150px] h-[150px] rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 mystical-border hover:glow"
          >
            <div className="w-full h-full rounded-full bg-[#1A1A2E] border-2 border-transparent flex items-center justify-center">
              <div className="text-center space-y-2">
                <Plus className="w-8 h-8 text-[#D3D3D3] mx-auto" />
                <p className="text-[#D3D3D3] text-xs leading-tight">Tap to upload<br />photo</p>
              </div>
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Explore Button */}
        <button
          onClick={onExplore}
          className="w-[200px] h-[50px] rounded-lg mystical-gradient text-white font-medium text-base transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg"
        >
          Explore
        </button>

        {/* Constellation decoration */}
        <div className="absolute top-32 left-8 w-2 h-2 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-48 right-12 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
}