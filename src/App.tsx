import React, { useState } from "react";
import { HomeScreen } from "../components/HomeScreen";
import { PhotoUpload } from "../components/PhotoUpload";
import { LoadingScreen } from "../components/LoadingScreen";
import { ResultsScreen } from "../components/ResultsScreen";
import { LifeMapScreen } from "../components/LifeMapScreen";
import { LifeMapHistoryScreen } from "../components/LifeMapHistoryScreen";
import { CompatibilityScreen } from "../components/CompatibilityScreen";
import { StarField } from "../components/StarField";

type AppState =
  | "home"
  | "daily-insight"
  | "life-map"
  | "life-map-history"
  | "compatibility"
  | "photo-upload"
  | "loading"
  | "results";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("home");
  const [analysisType, setAnalysisType] = useState<string>("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dailyInsightData, setDailyInsightData] = useState<any>(null);

  const handleNavigate = (screen: AppState, type?: string) => {
    setCurrentScreen(screen);
    if (type) setAnalysisType(type);
  };

  const handlePhotoUpload = (file: File) => {
    const photoUrl = URL.createObjectURL(file);
    setUploadedPhoto(photoUrl);
    setUploadedFile(file);
  };

  const handleAnalysisComplete = (data: any) => {
    setDailyInsightData(data);
    handleNavigate("results");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "daily-insight":
        return (
          <PhotoUpload
            onUpload={handlePhotoUpload}
            onExplore={() => uploadedFile ? handleNavigate("loading") : null}
            onBack={() => handleNavigate("home")}
            uploadedPhoto={uploadedPhoto}
          />
        );
      case "life-map":
        return (
          <LifeMapScreen onBack={() => handleNavigate("home")} />
        );
      case "compatibility":
        return (
          <CompatibilityScreen onBack={() => handleNavigate("home")} />
        );
      case "life-map-history":
        return (
          <LifeMapHistoryScreen onBack={() => handleNavigate("home")} />
        );
      case "loading":
        return (
          <LoadingScreen onAnalysisComplete={handleAnalysisComplete} uploadedFile={uploadedFile} />
        );
      case "results":
        return (
          <ResultsScreen
            photoUrl={uploadedPhoto!}
            dailyInsightData={dailyInsightData}
            onBack={() => handleNavigate("home")}
          />
        );
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <StarField />
      {renderScreen()}
    </div>
  );
}