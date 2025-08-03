import React from 'react';
import { Eye, Map, History, Heart } from 'lucide-react';
import { AppState } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: AppState, type?: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'camera',
      title: 'Plant Identification',
      description: 'Take a photo to identify plants instantly',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      id: 'map',
      title: 'Plant Map',
      description: 'Discover plants around you',
      icon: Map,
      color: 'bg-blue-500'
    },
    {
      id: 'history',
      title: 'History',
      description: 'View your identified plants',
      icon: History,
      color: 'bg-purple-500'
    },
    {
      id: 'favorites',
      title: 'Favorites',
      description: 'Your saved plant discoveries',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PlantID</h1>
          <p className="text-gray-600">Discover the world of plants</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id as AppState, feature.id)}
                className={`
                  ${feature.color} text-white p-6 rounded-xl shadow-lg
                  transform transition-all duration-200 hover:scale-105 active:scale-95
                  flex flex-col items-center text-center space-y-3
                `}
              >
                <IconComponent size={32} />
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Tips</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Take clear photos in good lighting for best results</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Include leaves, flowers, or fruits when possible</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Save your favorites to build your plant collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;