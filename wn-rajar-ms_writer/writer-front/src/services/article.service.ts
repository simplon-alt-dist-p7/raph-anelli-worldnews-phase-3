import { api } from "../api/api";
import type { Article, CreateArticleDTO } from "../types/article.types";

export const articleService = {
  getArticleById: async (id: number): Promise<{ data: Article }> => {
    return api.get<{ data: Article }>(`/articles/${id}`);
  },

  createArticle: async (
    data: CreateArticleDTO,
  ): Promise<{ message: string; data: Article }> => {
    const payload = {
      title: data.title,
      subtitle: data.subtitle,
      subhead: data.subhead,
      body: data.body,
      categoryId: data.category_id,
    };
    return api.post<{ message: string; data: Article }>("/articles", payload);
  },

  updateArticle: async (
    id: number,
    data: Partial<Article>,
  ): Promise<{ message: string; data: Article }> => {
    const payload: Record<string, unknown> = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.subtitle !== undefined) payload.subtitle = data.subtitle;
    if (data.subhead !== undefined) payload.subhead = data.subhead;
    if (data.body !== undefined) payload.body = data.body;
    if (data.category_id !== undefined) payload.categoryId = data.category_id;

    return api.patch<{ message: string; data: Article }>(
      `/articles/${id}`,
      payload,
    );
  },

  deleteArticle: async (
    id: number,
  ): Promise<{ message: string; data: Article }> => {
    return api.patch<{ message: string; data: Article }>(
      `/articles/${id}/delete`,
      {},
    );
  },

  restoreArticle: async (
    id: number,
  ): Promise<{ message: string; data: Article }> => {
    return api.patch<{ message: string; data: Article }>(
      `/articles/${id}/restore`,
      {},
    );
  },
};
