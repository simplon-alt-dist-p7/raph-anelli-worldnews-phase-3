import { api } from "../api/api";

interface GeminiResponse {
  message: string;
  data: string;
}

export const geminiService = {
  generateTitle: async (body: string): Promise<GeminiResponse> => {
    return api.post<GeminiResponse>("/gemini/generate-titre", { body });
  },

  generateSubtitle: async (
    title: string,
    body: string
  ): Promise<GeminiResponse> => {
    return api.post<GeminiResponse>("/gemini/generate-sous-titre", {
      title,
      body,
    });
  },

  generateSubhead: async (body: string): Promise<GeminiResponse> => {
    return api.post<GeminiResponse>("/gemini/generate-chapeau", { body });
  },

  generateBody: async (body: string): Promise<GeminiResponse> => {
    return api.post<GeminiResponse>("/gemini/generate-body", { body });
  },
};
