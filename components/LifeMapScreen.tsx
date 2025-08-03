import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LiveMapEntry } from './LiveMapEntry';
import { LiveMapPhotoUpload } from './LiveMapPhotoUpload';
import { LiveMapAnalysis } from './LiveMapAnalysis';
import { LiveMapResults } from './LiveMapResults';
import { LiveMapFacialDetails } from './LiveMapFacialDetails';
import { LiveMapTimeline } from './LiveMapTimeline';
import { LiveMapAnimation } from './LiveMapAnimation';

type LiveMapState = 'entry' | 'upload' | 'analysis' | 'results' | 'facial-details' | 'timeline' | 'animation';

interface LifeMapScreenProps {
  onBack: () => void;
  userPhotoUrl?: string;
}

export interface PersonalityScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface CareerSuggestion {
  title: string;
  description: string;
  match: number;
}

export interface FacialFeatureInsight {
  id: string;
  name: string;
  title: string;
  strengths: string[];
  growth: string[];
  icon: string;
}

export interface LifeStage {
  id: 'dawn' | 'noon' | 'dusk';
  title: string;
  period: string;
  description: string;
  predictions: string[];
  color: string;
  icon: string;
}

export function LifeMapScreen({ onBack, userPhotoUrl }: LifeMapScreenProps) {
  const [currentState, setCurrentState] = useState<LiveMapState>(userPhotoUrl ? 'results' : 'entry');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(userPhotoUrl || null);
  const [personalityScores, setPersonalityScores] = useState<PersonalityScores | null>(null);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion[]>([]);

  const handleStartJourney = () => {
    setCurrentState('upload');
  };

  const handlePhotoUploaded = (photoUrl: string) => {
    setUploadedPhoto(photoUrl);
    setCurrentState('analysis');
  };

  const handleAnalysisComplete = (scores: PersonalityScores, careers: CareerSuggestion[]) => {
    setPersonalityScores(scores);
    setCareerSuggestions(careers);
    setCurrentState('results');
  };

  const handleViewFacialDetails = () => {
    setCurrentState('facial-details');
  };

  const handleViewTimeline = () => {
    setCurrentState('timeline');
  };

  const handleGenerateAnimation = () => {
    setCurrentState('animation');
  };

  const handleBackToEntry = () => {
    setCurrentState('entry');
    setUploadedPhoto(null);
    setPersonalityScores(null);
    setCareerSuggestions([]);
  };

  const handleBackToUpload = () => {
    setCurrentState('upload');
  };

  const handleBackToResults = () => {
    setCurrentState('results');
  };

  const handleBackToFacialDetails = () => {
    setCurrentState('facial-details');
  };

  const handleBackToTimeline = () => {
    setCurrentState('timeline');
  };

  if (currentState === 'entry') {
    return (
      <LiveMapEntry
        onBack={onBack}
        onStartJourney={handleStartJourney}
      />
    );
  }

  if (currentState === 'upload') {
    return (
      <LiveMapPhotoUpload
        onBack={handleBackToEntry}
        onPhotoUploaded={handlePhotoUploaded}
        initialPhoto={uploadedPhoto}
      />
    );
  }

  if (currentState === 'analysis') {
    return (
      <LiveMapAnalysis
        photoUrl={uploadedPhoto!}
        onAnalysisComplete={handleAnalysisComplete}
        onBack={handleBackToUpload}
      />
    );
  }

  if (currentState === 'results' && personalityScores) {
    return (
      <LiveMapResults
        photoUrl={uploadedPhoto!}
        personalityScores={personalityScores}
        careerSuggestions={careerSuggestions}
        onViewFacialDetails={handleViewFacialDetails}
        onViewTimeline={handleViewTimeline}
        onBack={handleBackToEntry}
      />
    );
  }

  if (currentState === 'facial-details' && personalityScores) {
    return (
      <LiveMapFacialDetails
        photoUrl={uploadedPhoto!}
        personalityScores={personalityScores}
        onBack={handleBackToResults}
        onViewTimeline={handleViewTimeline}
      />
    );
  }

  if (currentState === 'timeline' && personalityScores) {
    return (
      <LiveMapTimeline
        photoUrl={uploadedPhoto!}
        personalityScores={personalityScores}
        onBack={handleBackToResults}
        onGenerateAnimation={handleGenerateAnimation}
      />
    );
  }

  if (currentState === 'animation' && personalityScores) {
    return (
      <LiveMapAnimation
        photoUrl={uploadedPhoto!}
        personalityScores={personalityScores}
        careerSuggestions={careerSuggestions}
        onBack={handleBackToTimeline}
      />
    );
  }

  // Fallback to entry if something goes wrong
  return (
    <LiveMapEntry
      onBack={onBack}
      onStartJourney={handleStartJourney}
    />
  );
}