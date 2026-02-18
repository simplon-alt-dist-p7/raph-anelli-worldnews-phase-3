import { api } from "../api/api";
import type { Category } from "../types/article.types";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    return api.get<Category[]>("/categories");
  },

  getCategoryById: async (id: number): Promise<{ data: Category }> => {
    return api.get<{ data: Category }>(`/categories/${id}`);
  },
};
