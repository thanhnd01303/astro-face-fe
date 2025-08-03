import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, User, Sparkles } from 'lucide-react';

interface LiveMapPhotoUploadProps {
  onBack: () => void;
  onPhotoUploaded: (photoUrl: string) => void;
  initialPhoto?: string | null;
}

export function LiveMapPhotoUpload({ onBack, onPhotoUploaded, initialPhoto }: LiveMapPhotoUploadProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(initialPhoto || null);
  const [dragOver, setDragOver] = useState(false);
  const [photoAnimating, setPhotoAnimating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const photoUrl = URL.createObjectURL(file);
      setPhotoAnimating(true);
      
      setTimeout(() => {
        setUploadedPhoto(photoUrl);
        setPhotoAnimating(false);
      }, 500);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = () => {
    if (uploadedPhoto) {
      onPhotoUploaded(uploadedPhoto);
    }
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
        
        <h1 className="text-white text-xl font-medium">Upload Portrait</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8 h-full flex flex-col">
        {/* Instructions */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-white text-2xl font-medium mb-3 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
            Scanning Your Cosmic Blueprint
          </h2>
          <p className="text-white/70 text-sm">Upload a clear portrait for the most accurate personality analysis</p>
        </div>

        {/* Photo Upload Area */}
        <div className="flex-1 flex items-center justify-center max-w-sm mx-auto w-full">
          <div
            className={`
              relative w-80 h-80 rounded-full transition-all duration-500 cursor-pointer overflow-hidden
              ${dragOver 
                ? 'scale-105 shadow-2xl' 
                : uploadedPhoto 
                  ? 'shadow-xl' 
                  : 'shadow-lg hover:scale-105'
              }
              ${photoAnimating ? 'animate-pulse' : ''}
            `}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Glowing border rings */}
            <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-purple-400 to-cyan-400 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-white/20 opacity-60"></div>
            <div className="absolute inset-4 rounded-full border border-white/10 opacity-40"></div>
            
            {uploadedPhoto ? (
              <>
                {/* Uploaded Photo */}
                <img
                  src={uploadedPhoto}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
                
                {/* Face detection overlay */}
                <div className="absolute inset-8 border-2 border-green-400 rounded-lg animate-pulse opacity-80">
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-green-400"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-green-400"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-green-400"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-green-400"></div>
                </div>
                
                {/* Face detected indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  ✓ Face Detected
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute top-8 right-12 text-yellow-300 text-xl animate-pulse">✨</div>
                <div className="absolute bottom-12 left-8 text-cyan-300 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
                <div className="absolute top-16 left-16 text-purple-300 text-sm animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
              </>
            ) : (
              <>
                {/* Upload placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm"></div>
                
                <div className="flex flex-col items-center justify-center h-full text-white/70 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 animate-pulse">
                    <User className="w-10 h-10 opacity-60" />
                  </div>
                  
                  <p className="text-lg font-medium mb-2">Tap to Upload</p>
                  <p className="text-sm opacity-60 mb-6">or drag and drop</p>
                  
                  <div className="flex items-center space-x-6 text-xs opacity-50">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Camera</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Gallery</span>
                    </div>
                  </div>
                </div>
                
                {/* Cosmic particles around placeholder */}
                <div className="absolute top-12 right-16 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
                <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-cyan-400 rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
                <div className="absolute top-24 left-20 w-1 h-1 bg-purple-400 rounded-full twinkle opacity-50" style={{ animationDelay: '1.5s' }} />
              </>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-8">
          <button
            onClick={handleAnalyze}
            disabled={!uploadedPhoto}
            className={`
              w-full h-14 rounded-2xl font-medium text-lg transition-all duration-300 relative overflow-hidden
              ${uploadedPhoto
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105 hover:shadow-xl shadow-2xl'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            {uploadedPhoto ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Scan My Cosmic Blueprint
                </span>
              </>
            ) : (
              <span>Upload a Portrait to Continue</span>
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-4 text-center">
          <p className="text-white/50 text-xs">
            💡 Best results with good lighting and clear facial features
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute top-32 right-12 w-1.5 h-1.5 bg-cyan-400 rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-purple-400 rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-56 right-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
}