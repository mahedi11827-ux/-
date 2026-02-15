
import { GoogleGenAI, Type } from "@google/genai";
import { ContentEntry, PerformanceDNA, AIRecommendation, DashboardInsights } from "../types";

// Always use the process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePerformance = async (history: ContentEntry[]): Promise<PerformanceDNA> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this content history and provide a Performance DNA profile in JSON format: ${JSON.stringify(history)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengthScore: { type: Type.NUMBER },
          hookEffectiveness: { type: Type.NUMBER },
          retentionPrediction: { type: Type.NUMBER },
          audienceSensitivity: { type: Type.STRING },
          topTone: { type: Type.STRING },
          bestDuration: { type: Type.NUMBER }
        },
        required: ["strengthScore", "hookEffectiveness", "retentionPrediction", "audienceSensitivity", "topTone", "bestDuration"]
      }
    }
  });

  // response.text is a property, not a method
  return JSON.parse(response.text || '{}') as PerformanceDNA;
};

export const getRecommendation = async (topic: string, history: ContentEntry[]): Promise<AIRecommendation> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on the content history: ${JSON.stringify(history)}, give me an optimized recommendation for a new video about: ${topic}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedDuration: { type: Type.NUMBER },
          suggestedTone: { type: Type.STRING },
          suggestedHook: { type: Type.STRING },
          predictedEngagement: { type: Type.NUMBER },
          reasoning: { type: Type.STRING }
        },
        required: ["suggestedDuration", "suggestedTone", "suggestedHook", "predictedEngagement", "reasoning"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as AIRecommendation;
};

export const getDashboardInsights = async (history: ContentEntry[]): Promise<DashboardInsights> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate dashboard insights (trends, improvement suggestions, risk alerts) based on: ${JSON.stringify(history)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trends: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                views: { type: Type.NUMBER },
                engagement: { type: Type.NUMBER }
              }
            }
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          alerts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                severity: { type: Type.STRING },
                message: { type: Type.STRING }
              }
            }
          }
        },
        required: ["trends", "suggestions", "alerts"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as DashboardInsights;
};
