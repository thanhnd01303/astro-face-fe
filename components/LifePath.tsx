import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface LifeStage {
  id: string;
  title: string;
  emoji: string;
  ageRange: string;
  analysisSource: string;
  description: string;
  position: number; // 0-100 percentage along the path
}

interface LifePathProps {
  onBack?: () => void;
}

export function LifePath({ onBack }: LifePathProps) {
  const [activeStage, setActiveStage] = useState(0); // Using index instead of string
  const [progressOffset, setProgressOffset] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lifeStages: LifeStage[] = [
    {
      id: 'early',
      title: 'Early Life',
      emoji: '🌅',
      ageRange: '18-30',
      analysisSource: 'Interpretation from the Upper Court (Forehead)',
      description: 'Your forehead reveals exceptional intellectual potential and natural leadership qualities. During this foundational period, you will discover your true calling through education and early career experiences. Your analytical mind will open doors to opportunities in strategic roles. Focus on building solid foundations and developing your unique skills. This is a time of rapid growth and self-discovery.',
      position: 20
    },
    {
      id: 'middle',
      title: 'Middle Life',
      emoji: '🌟',
      ageRange: '31-50',
      analysisSource: 'Interpretation from the Middle Court (Eyes & Nose)',
      description: 'The strength of your eyes and nose indicates this will be your most powerful period for material and spiritual achievement. Your intuitive abilities peak, allowing you to make wise decisions in both personal and professional spheres. Wealth accumulation and social status reach their highest point. Your empathetic nature helps you build lasting relationships and a strong network.',
      position: 50
    },
    {
      id: 'late',
      title: 'Late Life',
      emoji: '🌙',
      ageRange: '51+',
      analysisSource: 'Interpretation from the Lower Court (Mouth)',
      description: 'Your mouth reveals a gift for wisdom sharing and mentorship in your later years. This period brings deep fulfillment through teaching others and leaving a lasting legacy. Your communication skills become your greatest asset as you guide the next generation. Family relationships flourish, and you find peace through spiritual growth and community contribution.',
      position: 80
    }
  ];

  const currentStage = lifeStages[activeStage];

  const updateProgressAndStage = useCallback((stageIndex: number) => {
    const stage = lifeStages[stageIndex];
    if (!stage) return;

    setActiveStage(stageIndex);
    setProgressOffset(100 - stage.position);
    
    // Update slider position to match
    const newTranslate = -stageIndex * 100;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
  }, []);

  const handleStageClick = (stageIndex: number) => {
    if (isDragging) return; // Prevent clicking during drag
    updateProgressAndStage(stageIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const newTranslate = prevTranslate + deltaX;
    
    // Constrain within bounds
    const maxTranslate = 0;
    const minTranslate = -(lifeStages.length - 1) * 100;
    const constrainedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
    
    setCurrentTranslate(constrainedTranslate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap to nearest stage
    const stageWidth = 100;
    const nearestStage = Math.round(-currentTranslate / stageWidth);
    const clampedStage = Math.max(0, Math.min(lifeStages.length - 1, nearestStage));
    
    const snapTranslate = -clampedStage * stageWidth;
    setCurrentTranslate(snapTranslate);
    setPrevTranslate(snapTranslate);
    
    if (clampedStage !== activeStage) {
      updateProgressAndStage(clampedStage);
    }
  };

  const handleMouseStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const newTranslate = prevTranslate + deltaX;
    
    const maxTranslate = 0;
    const minTranslate = -(lifeStages.length - 1) * 100;
    const constrainedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
    
    setCurrentTranslate(constrainedTranslate);
  };

  const handleMouseEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const stageWidth = 100;
    const nearestStage = Math.round(-currentTranslate / stageWidth);
    const clampedStage = Math.max(0, Math.min(lifeStages.length - 1, nearestStage));
    
    const snapTranslate = -clampedStage * stageWidth;
    setCurrentTranslate(snapTranslate);
    setPrevTranslate(snapTranslate);
    
    if (clampedStage !== activeStage) {
      updateProgressAndStage(clampedStage);
    }
  };

  const goToNext = () => {
    const nextStage = Math.min(activeStage + 1, lifeStages.length - 1);
    updateProgressAndStage(nextStage);
  };

  const goToPrev = () => {
    const prevStage = Math.max(activeStage - 1, 0);
    updateProgressAndStage(prevStage);
  };

  useEffect(() => {
    // Initialize with early stage
    updateProgressAndStage(0);
  }, [updateProgressAndStage]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        const newTranslate = prevTranslate + deltaX;
        
        const maxTranslate = 0;
        const minTranslate = -(lifeStages.length - 1) * 100;
        const constrainedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
        
        setCurrentTranslate(constrainedTranslate);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, prevTranslate, activeStage]);

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        
        <div className="flex-1 text-center">
          <h2 className="text-white text-xl font-medium">The Flow of Time</h2>
          <p className="text-[#D3D3D3] text-sm">Your life's cosmic journey</p>
        </div>
        
        {/* Spacer to balance the back button */}
        <div className="w-10 h-10"></div>
      </div>

      {/* Timeline Navigator */}
      <div className="relative">
        <div className="timeline-map relative h-32 bg-gradient-to-r from-[#1A1A2E] via-[#2A1B5A] to-[#1A1A2E] rounded-xl p-4 overflow-hidden">
          {/* Background Starfield */}
          <div className="absolute inset-0">
            <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full twinkle opacity-30" />
            <div className="absolute top-6 right-12 w-0.5 h-0.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-4 left-16 w-1 h-1 bg-white rounded-full twinkle opacity-20" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* Curved Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            {/* Background Path */}
            <path
              d="M 20 70 Q 150 20 280 70"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
              className="timeline-path-bg"
            />
            {/* Progress Path */}
            <path
              d="M 20 70 Q 150 20 280 70"
              stroke="var(--planet-glow)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="timeline-path-progress"
              style={{
                strokeDasharray: '100%',
                strokeDashoffset: `${progressOffset}%`,
                filter: 'drop-shadow(0 0 8px var(--planet-glow))',
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </svg>

          {/* Timeline Nodes */}
          {lifeStages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => handleStageClick(index)}
              className={`
                timeline-node absolute w-8 h-8 rounded-full border-2 flex items-center justify-center
                text-xs font-medium cursor-pointer z-10 transition-all duration-300
                ${index === activeStage
                  ? 'active bg-[var(--planet-glow)] border-[var(--planet-glow)] text-black planet-glow scale-125'
                  : 'bg-[#1A1A2E] border-white/30 text-white hover:border-[var(--planet-glow)] hover:scale-110'
                }
              `}
              style={{
                left: `${stage.position}%`,
                top: stage.id === 'middle' ? '25%' : '60%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: isDragging ? 'none' : 'auto' // Disable during drag
              }}
            >
              {stage.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Slider Container */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          disabled={activeStage === 0}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            activeStage === 0 
              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-[var(--planet-glow)]/80 text-black hover:bg-[var(--planet-glow)] hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={goToNext}
          disabled={activeStage === lifeStages.length - 1}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            activeStage === lifeStages.length - 1
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-[var(--planet-glow)]/80 text-black hover:bg-[var(--planet-glow)] hover:scale-110'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slider Content */}
        <div
          ref={containerRef}
          className="relative touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${currentTranslate}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {lifeStages.map((stage, index) => (
              <div
                key={stage.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div
                  className={`
                    glassmorphism rounded-xl p-5 border-l-4 transition-all duration-500 h-full
                    ${index === activeStage 
                      ? 'border-l-[var(--planet-glow)] bg-[var(--planet-glow)]/5 scale-100' 
                      : 'border-l-white/20 scale-95 opacity-70'
                    }
                  `}
                >
                  <h3 className="text-white font-medium text-lg mb-2 flex items-center">
                    <span className="text-2xl mr-3">{stage.emoji}</span>
                    <div>
                      <div>{stage.title}</div>
                      <div className="text-sm text-[#D3D3D3] font-normal">({stage.ageRange})</div>
                    </div>
                  </h3>
                  
                  <div className="analysis-point mb-3">
                    <p className="text-[var(--planet-glow)] text-xs font-medium">
                      {stage.analysisSource}
                    </p>
                  </div>
                  
                  <p className="text-white/90 text-sm leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Stage indicator dots */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {lifeStages.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIndex === index
                            ? 'bg-[var(--planet-glow)] scale-125'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="text-center">
        <p className="text-xs text-[#D3D3D3] opacity-60 flex items-center justify-center">
          <span>Swipe, use arrows, or click timeline nodes to explore</span>
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="relative mt-6">
        <div className="w-16 h-16 mx-auto relative">
          <div className="absolute inset-0 rounded-full border border-white/10 opacity-30 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full border border-white/5"></div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-[var(--planet-glow)] rounded-full twinkle" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-[var(--planet-glow)] rounded-full twinkle" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}