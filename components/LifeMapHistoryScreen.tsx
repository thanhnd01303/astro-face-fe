import React from 'react';
import { History, ArrowLeft, Calendar } from 'lucide-react';

interface LifeMapHistoryScreenProps {
  onBack: () => void;
}

export function LifeMapHistoryScreen({ onBack }: LifeMapHistoryScreenProps) {
  // Mock history data
  const historyItems = [
    { date: '2024-01-15', type: 'Daily Insight', status: 'Completed' },
    { date: '2024-01-10', type: 'Life Map', status: 'Completed' },
    { date: '2024-01-05', type: 'Compatibility', status: 'Completed' },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-16">
      <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center w-full">
          <button
            onClick={onBack}
            className="text-[#D3D3D3] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-medium text-center flex-1">Reading History</h1>
          <div className="w-6"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-6 w-full fade-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#00CED1] flex items-center justify-center glow">
              <History className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* History List */}
          <div className="w-full space-y-3">
            <h2 className="text-white text-lg font-medium text-center mb-4">Your Readings</h2>
            
            {historyItems.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-[#8A2BE2]/20 to-[#00CED1]/20 rounded-lg p-4 border border-white/10 slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#D3D3D3]" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.type}</p>
                      <p className="text-[#D3D3D3] text-xs">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-[#00CED1] text-xs px-2 py-1 bg-[#00CED1]/20 rounded-full">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}

            {/* Empty state if no more items */}
            <div className="text-center py-8">
              <p className="text-[#D3D3D3] text-sm">No more readings found</p>
              <p className="text-[#D3D3D3]/60 text-xs mt-2">Start a new reading to build your history</p>
            </div>
          </div>
        </div>

        {/* Mystical decoration */}
        <div className="absolute top-28 right-8 w-1 h-1 bg-white rounded-full twinkle opacity-60" />
        <div className="absolute bottom-48 left-6 w-1.5 h-1.5 bg-white rounded-full twinkle opacity-40" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}