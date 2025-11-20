import { GoogleGenAI, Type } from "@google/genai";
import { KeywordResponse } from "../types";

// 🔥 Hardcoded API Key (you asked for it)
const apiKey = "AIzaSyAuEUSYpTfXq28k9kiTsSywz8pvUYoRmuU";

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey });

export const generateKeywords = async (clientDescription: string): Promise<KeywordResponse> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are an expert video editor and professional stock footage researcher.
    Your goal is to help an editor find the perfect B-roll or footage based on a client's possibly vague description.
    
    Analyze the following client request: "${clientDescription}"
    
    Provide a structured list of keywords and phrases categorized to help find footage on sites like Shutterstock, Getty Images, Artgrid, or YouTube.
    
    Categories:
    1. Literal: What is actually seen in the frame? (e.g., "man typing", "sunrise over mountains").
    2. Conceptual: Metaphors and abstract ideas (e.g., "success", "isolation", "connection", "innovation").
    3. Emotional: The mood or vibe (e.g., "melancholic", "energetic", "hopeful", "cinematic").
    4. Technical: Shot types and styles (e.g., "slow motion", "drone shot", "bokeh", "close up", "4k").
    5. Search Phrases: Complete, ready-to-paste search queries that combine these elements for best results.
    
    Return ONLY JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            literal: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            conceptual: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            emotional: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            technical: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            searchPhrases: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["literal", "conceptual", "emotional", "technical", "searchPhrases"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as KeywordResponse;
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
