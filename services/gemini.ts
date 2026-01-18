
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, RefinedPortfolio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePortfolioContent(input: UserInput): Promise<RefinedPortfolio> {
  const prompt = `
    As a senior brand strategist and copywriter, generate a professional business portfolio based on these user inputs:
    
    Business Name: ${input.businessName}
    Niche: ${input.niche}
    Stage: ${input.stage}
    Target Audience: ${input.targetAudience}
    Problem Solved: ${input.problemSolved}
    Vision: ${input.vision}
    Mission: ${input.mission}
    Unique Value: ${input.uniqueValue}
    Services: ${input.services.join(', ')}
    Why Choose Us: ${input.whyChooseUs}
    Tone: ${input.visualStyle}
    Additional Notes: ${input.notes || "None"}

    Expand these points into polished, professional copywriting suitable for a high-end corporate portfolio. 
    Ensure the "Process" is a logical 4-6 step workflow.
    Ensure "Advantages" are benefit-driven.
    The content should be persuasive and visually descriptive.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hero: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "subtitle", "description"]
          },
          about: {
            type: Type.OBJECT,
            properties: {
              vision: { type: Type.STRING },
              mission: { type: Type.STRING },
              valueProp: { type: Type.STRING }
            },
            required: ["vision", "mission", "valueProp"]
          },
          services: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          audience: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              problemSolved: { type: Type.STRING }
            }
          },
          process: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          advantages: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          whyUs: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          contact: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING }
            }
          }
        },
        required: ["hero", "about", "services", "process", "advantages", "whyUs"]
      }
    }
  });

  return JSON.parse(response.text);
}
