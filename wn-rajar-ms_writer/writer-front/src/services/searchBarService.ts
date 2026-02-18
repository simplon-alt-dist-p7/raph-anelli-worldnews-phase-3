import type { ArticleType } from "../components/ArticleList/ArticleCard";

const API_URL = `${import.meta.env.VITE_API_URL}/articles/search`;

export async function searchArticles(query: string): Promise<ArticleType[]> {
  const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche des articles");
  }

  return response.json();
}
