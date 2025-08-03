import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';
import { DailyInsightResponse } from './geminiService';

export interface FirebaseAnalysisRequest {
  imageBase64: string;
  analysisType: 'daily-insight' | 'life-map' | 'compatibility';
  userId?: string;
}

export interface FirebaseAnalysisResponse {
  success: boolean;
  data: DailyInsightResponse | any;
  error?: string;
}

export class FirebaseService {
  // Daily Insight Analysis
  static async analyzeDailyInsight(imageFile: File, userId?: string): Promise<DailyInsightResponse> {
    try {
      console.log('Starting Firebase Functions analysis...');
      
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      // Call Firebase Function
      const analyzeImage = httpsCallable<FirebaseAnalysisRequest, FirebaseAnalysisResponse>(
        functions, 
        'analyzeImage'
      );
      
      const result = await analyzeImage({
        imageBase64: base64Image,
        analysisType: 'daily-insight',
        userId
      });
      
      console.log('Firebase Functions response:', result.data);
      
      if (!result.data.success) {
        throw new Error(result.data.error || 'Analysis failed');
      }
      
      return result.data.data as DailyInsightResponse;
      
    } catch (error) {
      console.error('Firebase Functions error:', error);
      throw error;
    }
  }

  // Life Map Analysis
  static async analyzeLifeMap(imageFile: File, userId?: string): Promise<any> {
    try {
      const base64Image = await this.fileToBase64(imageFile);
      
      const analyzeImage = httpsCallable<FirebaseAnalysisRequest, FirebaseAnalysisResponse>(
        functions, 
        'analyzeLifeMap'
      );
      
      const result = await analyzeImage({
        imageBase64: base64Image,
        analysisType: 'life-map',
        userId
      });
      
      if (!result.data.success) {
        throw new Error(result.data.error || 'Life map analysis failed');
      }
      
      return result.data.data;
      
    } catch (error) {
      console.error('Life map analysis error:', error);
      throw error;
    }
  }

  // Compatibility Analysis
  static async analyzeCompatibility(
    image1File: File, 
    image2File: File, 
    userId?: string
  ): Promise<any> {
    try {
      const base64Image1 = await this.fileToBase64(image1File);
      const base64Image2 = await this.fileToBase64(image2File);
      
      const analyzeCompatibility = httpsCallable(functions, 'analyzeCompatibility');
      
      const result = await analyzeCompatibility({
        image1Base64: base64Image1,
        image2Base64: base64Image2,
        userId
      });
      
      return result.data;
      
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      throw error;
    }
  }

  // Save analysis result to user history
  static async saveAnalysisResult(
    userId: string, 
    analysisType: string, 
    result: any
  ): Promise<void> {
    try {
      const saveResult = httpsCallable(functions, 'saveAnalysisResult');
      
      await saveResult({
        userId,
        analysisType,
        result,
        timestamp: new Date().toISOString()
      });
      
      console.log('Analysis result saved successfully');
      
    } catch (error) {
      console.error('Error saving analysis result:', error);
    }
  }

  // Get user analysis history
  static async getUserHistory(userId: string): Promise<any[]> {
    try {
      const getHistory = httpsCallable(functions, 'getUserHistory');
      
      const result = await getHistory({ userId });
      
      return result.data as any[];
      
    } catch (error) {
      console.error('Error getting user history:', error);
      return [];
    }
  }

  // Helper function to convert file to base64
  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix (data:image/jpeg;base64,)
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}