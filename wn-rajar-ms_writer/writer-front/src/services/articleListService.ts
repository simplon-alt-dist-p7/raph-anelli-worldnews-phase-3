import type { ArticleType } from "../components/ArticleList/ArticleCard";

const API_BASE = import.meta.env.VITE_API_URL;

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse {
  articles: ArticleType[];
  pagination: PaginationInfo;
}

export const fetchArticles = async (page = 1, limit = 5): Promise<PaginatedResponse> => {
  const res = await fetch(`${API_BASE}/articles?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }
  return res.json();
};
