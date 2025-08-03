import React from 'react';
import { Eye, Map, History, Heart } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const features = [
    {
      id: 'daily-insight',
      title: 'Daily Insight',
      description: 'Discover your face reading analysis',
      icon: Eye,
      gradient: 'from-[#9370DB] to-[#B0E0E6]',
    },
    {
      id: 'life-map',
      title: 'Life Map',
      description: 'Explore your life journey',
      icon: Map,
      gradient: 'from-[#4B0082] to-[#20B2AA]',
    },
    {
      id: 'life-map-history',
      title: 'Life Map History',
      description: 'View your past readings',
      icon: History,
      gradient: 'from-[#8A2BE2] to-[#00CED1]',
    },
    {
      id: 'compatibility',
      title: 'Compatibility Check',
      description: 'Compare with others',
      icon: Heart,
      gradient: 'from-[#6A5ACD] to-[#48D1CC]',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-safe-top">
      <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
        {/* Header */}
        <div className="text-center space-y-3 fade-in pt-4">
          <h1 className="text-white text-3xl font-medium tracking-wide">Face Astro</h1>
          <p className="text-[#D3D3D3] text-sm">Unlock the mysteries of your face</p>
          
          {/* Mystical decoration around title */}
          <div className="relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mystical-gradient opacity-60"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mystical-gradient opacity-60"></div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-3 w-full px-2">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`
                  relative p-4 rounded-xl bg-gradient-to-br ${feature.gradient} 
                  shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
                  min-h-[110px] flex flex-col items-center justify-center space-y-2
                  slide-up
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IconComponent className="w-6 h-6 text-white mb-1" />
                <h3 className="text-white font-medium text-xs text-center leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-[10px] text-center leading-tight">
                  {feature.description}
                </p>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>

        {/* Mystical elements */}
        <div className="relative mt-8 fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-32 h-32 relative">
            {/* Central mystical circle */}
            <div className="absolute inset-0 rounded-full border border-white/20 glow"></div>
            <div className="absolute inset-2 rounded-full border border-white/10"></div>
            <div className="absolute inset-4 rounded-full border border-white/5"></div>
            
            {/* Floating dots */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white rounded-full twinkle opacity-60"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Constellation decoration */}
        <div className="absolute top-24 right-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 left-6 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-32 right-12 w-1 h-1 bg-white rounded-full twinkle opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 left-8 w-2 h-2 bg-white rounded-full twinkle opacity-30" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
}