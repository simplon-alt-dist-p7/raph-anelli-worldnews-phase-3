import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialisation de l'API avec ta clé
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// On utilise le modèle "flash" : c'est le plus rapide et le plus léger
export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
  generationConfig: {
    maxOutputTokens: 200, // Un chapeau est court, pas besoin de plus
    temperature: 0.7, // Équilibre entre créativité et précision
  },
});
