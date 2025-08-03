const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(functions.config().gemini.api_key);

// Daily Insight Analysis Function
exports.analyzeImage = functions.https.onCall(async (data, context) => {
  try {
    console.log('Starting image analysis...');
    
    const { imageBase64, analysisType, userId } = data;
    
    if (!imageBase64) {
      throw new functions.https.HttpsError('invalid-argument', 'Image data is required');
    }

    // Load prompt based on analysis type
    let prompt = '';
    if (analysisType === 'daily-insight') {
      // Read the daily insight prompt
      prompt = `
Please analyze this portrait photo and provide a detailed daily insight analysis.

You are an AI specially trained to be a Digital Empathy Expert and Spiritual Advisor. Your role combines:

- Subtle Psychologist: Capable of "reading" emotions through facial expressions
- Trusted Companion: Always providing advice in a warm, positive, and constructive tone
- Modern Physiognomist: Offering intriguing insights about human characteristics

Core Task: Based on the portrait photo, analyze and create a complete JSON object for the "Daily Insight" feature.

Golden Rules:
- Always Positive: Even if you notice signs of fatigue, interpret them as opportunities for rest and renewal
- Non-Judgmental: Absolutely avoid critical language or rating appearances
- Highly Personalized: The content should feel tailored specifically to the user

Please return ONLY a valid JSON object with this exact format:

{
  "mainImpression": {
    "shineIndex": <number 50-100>,
    "energyColor": "<string>",
    "dayKeyword": "<string>"
  },
  "companionMessage": {
    "title": "<string 5-7 words>",
    "emotionalAnalysis": "<string>",
    "healthNotices": [
      {
        "type": "<string>",
        "icon": "<string>",
        "message": "<string>"
      }
    ]
  },
  "todaySuggestion": {
    "title": "<string 5-7 words>",
    "focusOn": {
      "icon": "star",
      "recommendations": ["<string>", "<string>", "<string>"]
    },
    "shouldAvoid": {
      "icon": "shield",
      "recommendations": ["<string>", "<string>"]
    }
  },
  "selfDiscovery": {
    "title": "<string 3-5 words>",
    "content": "<string>"
  }
}
      `;
    }

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg'
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini response:', text);

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const analysisResult = JSON.parse(jsonMatch[0]);

    // Save to Firestore if userId provided
    if (userId) {
      await admin.firestore().collection('analyses').add({
        userId,
        analysisType,
        result: analysisResult,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    return {
      success: true,
      data: analysisResult
    };

  } catch (error) {
    console.error('Analysis error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Life Map Analysis Function
exports.analyzeLifeMap = functions.https.onCall(async (data, context) => {
  try {
    const { imageBase64, userId } = data;
    
    // Similar implementation for life map analysis
    // You can customize the prompt for life map specific analysis
    
    return {
      success: true,
      data: {
        // Life map specific response structure
        personalityScores: {
          openness: Math.floor(Math.random() * 30) + 70,
          conscientiousness: Math.floor(Math.random() * 35) + 65,
          extraversion: Math.floor(Math.random() * 40) + 60,
          agreeableness: Math.floor(Math.random() * 25) + 75,
          neuroticism: Math.floor(Math.random() * 50) + 30
        },
        careerSuggestions: [
          {
            title: "Creative Artist",
            description: "Your high openness suggests natural talent for creative expression",
            match: 92
          }
        ]
      }
    };
    
  } catch (error) {
    console.error('Life map analysis error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Compatibility Analysis Function
exports.analyzeCompatibility = functions.https.onCall(async (data, context) => {
  try {
    const { image1Base64, image2Base64, userId } = data;
    
    // Implement compatibility analysis logic
    
    return {
      success: true,
      data: {
        work: Math.floor(Math.random() * 30) + 70,
        relationship: Math.floor(Math.random() * 40) + 60,
        overall: Math.floor(Math.random() * 25) + 75,
        traits: {
          communication: Math.floor(Math.random() * 30) + 70,
          trust: Math.floor(Math.random() * 40) + 60,
          creativity: Math.floor(Math.random() * 35) + 65,
          empathy: Math.floor(Math.random() * 25) + 75,
          ambition: Math.floor(Math.random() * 30) + 70,
          stability: Math.floor(Math.random() * 20) + 80
        }
      }
    };
    
  } catch (error) {
    console.error('Compatibility analysis error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Save Analysis Result Function
exports.saveAnalysisResult = functions.https.onCall(async (data, context) => {
  try {
    const { userId, analysisType, result, timestamp } = data;
    
    if (!userId) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    await admin.firestore().collection('user_analyses').add({
      userId,
      analysisType,
      result,
      timestamp: timestamp || admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
    
  } catch (error) {
    console.error('Save analysis error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Get User History Function
exports.getUserHistory = functions.https.onCall(async (data, context) => {
  try {
    const { userId } = data;
    
    if (!userId) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const snapshot = await admin.firestore()
      .collection('user_analyses')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const history = [];
    snapshot.forEach(doc => {
      history.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return history;
    
  } catch (error) {
    console.error('Get history error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});