import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { PhotoUpload } from "./components/PhotoUpload";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { LifeMapScreen } from "./components/LifeMapScreen";
import { LifeMapHistoryScreen } from "./components/LifeMapHistoryScreen";
import { CompatibilityScreen } from "./components/CompatibilityScreen";
import { StarField } from "./components/StarField";

type AppState =
  | "home"
  | "daily-insight"
  | "loading"
  | "results"
  | "life-map"
  | "life-map-history"
  | "compatibility";

export default function App() {
  const [currentState, setCurrentState] =
    useState<AppState>("home");
  const [uploadedPhoto, setUploadedPhoto] = useState<
    string | null
  >(null);

  const handleNavigation = (screen: string) => {
    if (screen === "daily-insight") {
      setCurrentState("daily-insight");
    } else if (screen === "life-map") {
      setCurrentState("life-map");
    } else if (screen === "life-map-history") {
      setCurrentState("life-map-history");
    } else if (screen === "compatibility") {
      setCurrentState("compatibility");
    }
  };

  const handlePhotoUpload = (file: File) => {
    const photoUrl = URL.createObjectURL(file);
    setUploadedPhoto(photoUrl);
  };

  const handleExplore = () => {
    if (uploadedPhoto) {
      setCurrentState("loading");
      // Simulate API call delay
      setTimeout(() => {
        setCurrentState("results");
      }, 3000);
    } else {
      // If no photo uploaded, simulate with a placeholder
      setUploadedPhoto(
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      );
      setCurrentState("loading");
      setTimeout(() => {
        setCurrentState("results");
      }, 3000);
    }
  };

  const handleBackToHome = () => {
    setCurrentState("home");
    // Don't reset uploadedPhoto when going back to home, so Life Map can use it
  };

  const handleBackToDailyInsight = () => {
    setCurrentState("daily-insight");
    setUploadedPhoto(null);
  };

  return (
    <div className="w-full h-screen bg-[#1A1A2E] relative overflow-hidden">
      <StarField />

      <div className="relative z-10 w-full h-full max-w-[375px] mx-auto">
        {currentState === "home" && (
          <HomeScreen onNavigate={handleNavigation} />
        )}

        {currentState === "daily-insight" && (
          <PhotoUpload
            onUpload={handlePhotoUpload}
            onExplore={handleExplore}
            onBack={handleBackToHome}
          />
        )}

        {currentState === "loading" && <LoadingScreen />}

        {currentState === "results" && uploadedPhoto && (
          <ResultsScreen
            photoUrl={uploadedPhoto}
            onBack={handleBackToDailyInsight}
          />
        )}

        {currentState === "life-map" && (
          <LifeMapScreen
            onBack={handleBackToHome}
            userPhotoUrl={uploadedPhoto || undefined}
          />
        )}

        {currentState === "life-map-history" && (
          <LifeMapHistoryScreen onBack={handleBackToHome} />
        )}

        {currentState === "compatibility" && (
          <CompatibilityScreen onBack={handleBackToHome} />
        )}
      </div>
    </div>
  );
}