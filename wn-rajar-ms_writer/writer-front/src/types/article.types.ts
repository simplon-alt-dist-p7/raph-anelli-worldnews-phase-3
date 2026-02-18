export interface Category {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
  publish_date: string; // ISO string depuis l'API
  update_date: string | null; // Date de modification (null si jamais modifié)
  deletedAt: string | null; // Date de suppression (null si jamais supprimé)
  category?: Category;
  category_id?: number; // Utilisé uniquement pour les updates
}

export interface CreateArticleDTO {
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
  category_id: number;
}
