import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen.tsx";
import { PhotoUpload } from "./components/PhotoUpload.tsx";
import { LoadingScreen } from "./components/LoadingScreen.tsx";
import { ResultsScreen } from "./components/ResultsScreen.tsx";
import { LifeMapScreen } from "./components/LifeMapScreen.tsx";
import { LifeMapHistoryScreen } from "./components/LifeMapHistoryScreen.tsx";
import { CompatibilityScreen } from "./components/CompatibilityScreen.tsx";
import { StarField } from "./components/StarField.tsx";

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

  const handleNavigate = (screen: AppState, type?: string) => {
    setCurrentScreen(screen);
    if (type) setAnalysisType(type);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "daily-insight":
      case "life-map":
      case "compatibility":
        return (
          <PhotoUpload
            analysisType={analysisType}
            onNext={() => handleNavigate("loading")}
            onBack={() => handleNavigate("home")}
          />
        );
      case "life-map-history":
        return (
          <LifeMapHistoryScreen onBack={() => handleNavigate("home")} />
        );
      case "loading":
        return (
          <LoadingScreen
            analysisType={analysisType}
            onComplete={() => handleNavigate("results")}
          />
        );
      case "results":
        if (analysisType === "life-map") {
          return (
            <LifeMapScreen onBack={() => handleNavigate("home")} />
          );
        } else if (analysisType === "compatibility") {
          return (
            <CompatibilityScreen onBack={() => handleNavigate("home")} />
          );
        }
        return (
          <ResultsScreen
            analysisType={analysisType}
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