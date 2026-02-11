
import { GoogleGenAI, Type } from "@google/genai";
import { MotivationalResponse } from "../types";

export const getMotivationalContent = async (): Promise<MotivationalResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Génère une citation motivante pour un étudiant en CPGE au Maroc qui prépare le CNC 2026, ainsi que 3 conseils spécifiques pour la réussite au Concours National Commun (Maths, Physique, SI, Français ou TIPE). Réponds uniquement au format JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING, description: "Une citation inspirante en français." },
            author: { type: Type.STRING, description: "L'auteur de la citation." },
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  category: { type: Type.STRING, enum: ['Math', 'Physique', 'SI', 'Conseil', 'Motivation'] }
                },
                required: ["title", "content", "category"]
              }
            }
          },
          required: ["quote", "author", "tips"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching Gemini content:", error);
    return {
      quote: "L'excellence est un art que l'on n'atteint que par l'exercice constant.",
      author: "Aristote",
      tips: [
        { title: "Rigueur Mathématique", content: "Ne négligez jamais la rédaction. Au CNC, la clarté du raisonnement compte autant que le résultat.", category: "Math" },
        { title: "Gestion du Stress", content: "Le CNC est un marathon. Dormez suffisamment et apprenez à gérer vos temps de pause.", category: "Conseil" },
        { title: "Annales", content: "Travailler les annales des 10 dernières années est la clé pour comprendre l'esprit des concepteurs.", category: "Physique" }
      ]
    };
  }
};
