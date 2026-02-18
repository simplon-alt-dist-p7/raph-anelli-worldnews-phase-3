export interface CreateArticleDTO {
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
  categoryId: number;
}

export interface UpdateArticleDTO {
  title?: string;
  subtitle?: string;
  subhead?: string;
  body?: string;
  categoryId?: number;
}
