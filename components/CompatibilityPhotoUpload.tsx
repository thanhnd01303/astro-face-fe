import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, User, Users } from 'lucide-react';
import { UploadedPhotos } from './CompatibilityScreen';

interface CompatibilityPhotoUploadProps {
  onBack: () => void;
  onPhotosUploaded: (photos: UploadedPhotos) => void;
  initialPhotos: UploadedPhotos;
}

export function CompatibilityPhotoUpload({ onBack, onPhotosUploaded, initialPhotos }: CompatibilityPhotoUploadProps) {
  const [photos, setPhotos] = useState<UploadedPhotos>(initialPhotos);
  const [dragOver, setDragOver] = useState<'photo1' | 'photo2' | null>(null);
  const [person1Name, setPerson1Name] = useState(initialPhotos.person1Name || '');
  const [person2Name, setPerson2Name] = useState(initialPhotos.person2Name || '');
  
  const photo1InputRef = useRef<HTMLInputElement>(null);
  const photo2InputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File, photoSlot: 'photo1' | 'photo2') => {
    if (file.type.startsWith('image/')) {
      const photoUrl = URL.createObjectURL(file);
      setPhotos(prev => ({ ...prev, [photoSlot]: photoUrl }));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, photoSlot: 'photo1' | 'photo2') => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, photoSlot);
    }
  };

  const handleDragOver = (e: React.DragEvent, photoSlot: 'photo1' | 'photo2') => {
    e.preventDefault();
    setDragOver(photoSlot);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, photoSlot: 'photo1' | 'photo2') => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file, photoSlot);
    }
  };

  const handleAnalyze = () => {
    if (photos.photo1 && photos.photo2) {
      onPhotosUploaded({
        ...photos,
        person1Name: person1Name || 'Person 1',
        person2Name: person2Name || 'Person 2'
      });
    }
  };

  const canAnalyze = photos.photo1 && photos.photo2;

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
        
        <h1 className="text-white text-xl font-medium">Upload Photos</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8 h-full flex flex-col">
        {/* Instructions */}
        <div className="text-center mb-6">
          <h2 className="text-white text-lg font-medium mb-2">Upload Two Photos</h2>
          <p className="text-white/70 text-sm">Choose clear portraits for the best compatibility analysis</p>
        </div>

        {/* Split Photo Upload Area */}
        <div className="flex-1 flex flex-col space-y-4 max-w-sm mx-auto w-full">
          {/* Photo 1 Upload */}
          <div className="flex-1">
            <div className="text-center mb-3">
              <input
                type="text"
                placeholder="Person 1 Name (Optional)"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
                className="bg-white/10 text-white placeholder-white/50 px-4 py-2 rounded-xl border border-white/20 text-center text-sm backdrop-blur-sm focus:outline-none focus:border-white/40"
              />
            </div>
            
            <div
              className={`
                relative h-40 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                ${dragOver === 'photo1' 
                  ? 'border-white bg-white/10 scale-105' 
                  : photos.photo1 
                    ? 'border-white/40 bg-black/20' 
                    : 'border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60'
                }
              `}
              onClick={() => photo1InputRef.current?.click()}
              onDragOver={(e) => handleDragOver(e, 'photo1')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'photo1')}
            >
              {photos.photo1 ? (
                <>
                  <img
                    src={photos.photo1}
                    alt="Person 1"
                    className="w-full h-full object-cover"
                  />
                  {/* Face detection overlay */}
                  <div className="absolute inset-4 border-2 border-white/60 rounded-lg animate-pulse"></div>
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Face Detected
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/70">
                  <User className="w-12 h-12 mb-2 opacity-50" />
                  <p className="text-sm font-medium mb-1">Tap to Upload</p>
                  <p className="text-xs opacity-60">or drag and drop</p>
                  <div className="flex items-center space-x-2 mt-3 text-xs opacity-40">
                    <Camera className="w-4 h-4" />
                    <span>Camera</span>
                    <Upload className="w-4 h-4 ml-2" />
                    <span>Gallery</span>
                  </div>
                </div>
              )}
              
              <input
                ref={photo1InputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileInputChange(e, 'photo1')}
              />
            </div>
          </div>

          {/* Connection Symbol */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6 text-white/70" />
            </div>
          </div>

          {/* Photo 2 Upload */}
          <div className="flex-1">
            <div
              className={`
                relative h-40 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                ${dragOver === 'photo2' 
                  ? 'border-white bg-white/10 scale-105' 
                  : photos.photo2 
                    ? 'border-white/40 bg-black/20' 
                    : 'border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60'
                }
              `}
              onClick={() => photo2InputRef.current?.click()}
              onDragOver={(e) => handleDragOver(e, 'photo2')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'photo2')}
            >
              {photos.photo2 ? (
                <>
                  <img
                    src={photos.photo2}
                    alt="Person 2"
                    className="w-full h-full object-cover"
                  />
                  {/* Face detection overlay */}
                  <div className="absolute inset-4 border-2 border-white/60 rounded-lg animate-pulse"></div>
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Face Detected
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/70">
                  <User className="w-12 h-12 mb-2 opacity-50" />
                  <p className="text-sm font-medium mb-1">Tap to Upload</p>
                  <p className="text-xs opacity-60">or drag and drop</p>
                  <div className="flex items-center space-x-2 mt-3 text-xs opacity-40">
                    <Camera className="w-4 h-4" />
                    <span>Camera</span>
                    <Upload className="w-4 h-4 ml-2" />
                    <span>Gallery</span>
                  </div>
                </div>
              )}
              
              <input
                ref={photo2InputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileInputChange(e, 'photo2')}
              />
            </div>
            
            <div className="text-center mt-3">
              <input
                type="text"
                placeholder="Person 2 Name (Optional)"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                className="bg-white/10 text-white placeholder-white/50 px-4 py-2 rounded-xl border border-white/20 text-center text-sm backdrop-blur-sm focus:outline-none focus:border-white/40"
              />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className={`
              w-full h-14 rounded-2xl font-medium text-lg transition-all duration-300 relative overflow-hidden
              ${canAnalyze
                ? 'bg-white text-[#4B0082] hover:scale-105 hover:shadow-xl shadow-2xl'
                : 'bg-white/20 text-white/40 cursor-not-allowed'
              }
            `}
          >
            {canAnalyze ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4B0082]/10 to-[#00CED1]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Analyze Compatibility
                </span>
              </>
            ) : (
              <span>Upload Both Photos to Continue</span>
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-4 text-center">
          <p className="text-white/50 text-xs">
            💡 Tip: Use well-lit photos with clear facial features for best results
          </p>
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