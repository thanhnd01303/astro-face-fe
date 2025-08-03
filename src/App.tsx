@@ .. @@
 import React, { useState } from "react";
 import { HomeScreen } from "./components/HomeScreen";
 import { PhotoUpload } from "./components/PhotoUpload";
 import { LoadingScreen } from "./components/LoadingScreen";
 import { ResultsScreen } from "./components/ResultsScreen";
 import { LifeMapScreen } from "./components/LifeMapScreen";
 import { LifeMapHistoryScreen } from "./components/LifeMapHistoryScreen";
 import { CompatibilityScreen } from "./components/CompatibilityScreen";
 import { StarField } from "./components/StarField";
+import "./styles/globals.css";
 
 type AppState
   | "home"