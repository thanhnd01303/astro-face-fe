interface MainImpression {
  shineIndex: number;
  energyColor: string;
  dayKeyword: string;
}

interface HealthNotice {
  type: string;
  icon: string;
  message: string;
}

interface CompanionMessage {
  title: string;
  emotionalAnalysis: string;
  healthNotices: HealthNotice[];
}

interface FocusRecommendations {
  icon: string;
  recommendations: string[];
}

interface AvoidRecommendations {
  icon: string;
  recommendations: string[];
}

interface TodaySuggestion {
  title: string;
  focusOn: FocusRecommendations;
  shouldAvoid: AvoidRecommendations;
}

interface SelfDiscovery {
  title: string;
  content: string;
}

export interface DailyInsightResponse {
  mainImpression: MainImpression;
  companionMessage: CompanionMessage;
  todaySuggestion: TodaySuggestion;
  selfDiscovery: SelfDiscovery;
}

export class GeminiService {
  private static readonly API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  static async analyzeDailyInsight(imageFile: File): Promise<DailyInsightResponse> {
    try {
      // Read the prompt file
      const promptResponse = await fetch('/daily_insight_prompt.txt');
      const prompt = await promptResponse.text();

      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: imageFile.type,
                  data: base64Image
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Parse JSON response
      try {
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        
        const parsedResponse: DailyInsightResponse = JSON.parse(jsonMatch[0]);
        return parsedResponse;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', textResponse);
        throw new Error('Failed to parse API response as JSON');
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Return mock data as fallback
      return this.getMockDailyInsight();
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private static getMockDailyInsight(): DailyInsightResponse {
    return {
      mainImpression: {
        shineIndex: 78,
        energyColor: "Golden Amber",
        dayKeyword: "Radiance"
      },
      companionMessage: {
        title: "Your Inner Light Shines Bright",
        emotionalAnalysis: "Your facial features reveal a harmonious blend of determination and sensitivity. The gentle curve of your eyes suggests empathy and intuition, while your jawline shows strong decision-making abilities. Today, your expression carries an underlying current of optimism mixed with thoughtful consideration.",
        healthNotices: [
          {
            type: "Energy",
            icon: "⚡",
            message: "Your eyes show good vitality, but consider more rest for optimal energy"
          },
          {
            type: "Stress",
            icon: "🧘",
            message: "Slight tension around the forehead suggests need for relaxation"
          }
        ]
      },
      todaySuggestion: {
        title: "Today's Cosmic Guidance for You",
        focusOn: {
          icon: "star",
          recommendations: [
            "Trust your intuitive insights in important decisions",
            "Express your creative ideas with confidence",
            "Take initiative in social situations and leadership roles"
          ]
        },
        shouldAvoid: {
          icon: "shield",
          recommendations: [
            "Making impulsive financial decisions without reflection",
            "Overanalyzing emotional situations that require heart-based responses"
          ]
        }
      },
      selfDiscovery: {
        title: "Your Cosmic Nature",
        content: "Your facial structure reveals a soul that bridges the analytical and intuitive realms. You possess natural leadership qualities combined with deep empathy, making you a natural guide for others. Your strong jawline indicates determination, while your expressive eyes show your ability to connect with others on a profound level."
      }
    };
  }
}