@@ .. @@
 import React from 'react';
 import { Eye, Map, History, Heart } from 'lucide-react';
+import { AppState } from '../App';

 interface HomeScreenProps {
-  onNavigate: (screen: string) => void;
+  onNavigate: (screen: AppState, type?: string) => void;
 }

@@ .. @@
               key={feature.id}
-              onClick={() => onNavigate(feature.id)}
+              onClick={() => onNavigate(feature.id as AppState, feature.id)}
               className={`