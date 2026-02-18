import { articleRepository } from "../repository/article.repository.js";
import { Article } from "../models/article.model.js";
import type { CreateArticleDTO, UpdateArticleDTO } from "../types/article.types.js";
import { ValidationError } from "../errors/ValidationError.js";
import { ConflictError } from "../errors/ConflictError.js";

class ArticleService {
  async getArticleById(id: number): Promise<Article | null> {
    return await articleRepository.findById(id);
  }

  async createArticle(data: CreateArticleDTO): Promise<Article> {
    if (!data.title || data.title.trim().length === 0) {
      throw new ValidationError("Le titre est requis");
    }
    if (data.title.length > 300) {
      throw new ValidationError("Le titre ne peut pas dépasser 300 caractères");
    }

    if (!data.subtitle || data.subtitle.trim().length === 0) {
      throw new ValidationError("Le sous-titre est requis");
    }
    if (data.subtitle.length > 300) {
      throw new ValidationError("Le sous-titre ne peut pas dépasser 300 caractères");
    }

    if (!data.subhead || data.subhead.trim().length === 0) {
      throw new ValidationError("Le chapeau est requis");
    }
    if (data.subhead.length > 1000) {
      throw new ValidationError("Le chapeau ne peut pas dépasser 1000 caractères");
    }

    if (!data.body || data.body.trim().length === 0) {
      throw new ValidationError("Le contenu est requis");
    }

    if (!data.categoryId) {
      throw new ValidationError("Une catégorie est requise");
    }

    const sanitizedData: CreateArticleDTO = {
      title: data.title.trim(),
      subtitle: data.subtitle.trim(),
      subhead: data.subhead.trim(),
      body: data.body.trim(),
      categoryId: data.categoryId,
    };

    try {
      return await articleRepository.create(sanitizedData);
    } catch (error: unknown) {
      // PostgreSQL unique_violation error code
      if (error && typeof error === "object" && "code" in error && error.code === "23505") {
        throw new ConflictError("Un article avec ce titre existe déjà pour cette date");
      }
      throw error;
    }
  }

  async updateArticle(
    id: number,
    data: UpdateArticleDTO
  ): Promise<Article | null> {
    const existingArticle = await articleRepository.findById(id);
    if (!existingArticle) {
      return null;
    }

    const fields = Object.keys(data).filter(
      (key) => data[key as keyof UpdateArticleDTO] !== undefined
    );
    if (fields.length === 0) {
      throw new ValidationError("Au moins un champ doit être fourni pour la mise à jour");
    }

    if (data.title !== undefined) {
      if (data.title.trim().length === 0) {
        throw new ValidationError("Le titre ne peut pas être vide");
      }
      if (data.title.length > 300) {
        throw new ValidationError("Le titre ne peut pas dépasser 300 caractères");
      }
    }

    if (data.subtitle !== undefined) {
      if (data.subtitle.length === 0) {
        throw new ValidationError("Le sous-titre ne peut pas être vide");
      }
      if (data.subtitle.length > 300) {
        throw new ValidationError("Le sous-titre ne peut pas dépasser 300 caractères");
      }
    }

    if (data.subhead !== undefined) {
      if (data.subhead.length === 0) {
        throw new ValidationError("Le chapeau ne peut pas être vide");
      }
      if (data.subhead.length > 1000) {
        throw new ValidationError("Le chapeau ne peut pas dépasser 1000 caractères");
      }
    }

    if (data.body !== undefined && data.body.length === 0) {
      throw new ValidationError("Le contenu ne peut pas être vide");
    }

    const sanitizedData: Partial<Article> = {};
    if (data.title !== undefined) sanitizedData.title = data.title.trim();
    if (data.subtitle !== undefined)
      sanitizedData.subtitle = data.subtitle.trim();
    if (data.subhead !== undefined) sanitizedData.subhead = data.subhead.trim();
    if (data.body !== undefined) sanitizedData.body = data.body.trim();
    if (data.categoryId !== undefined) {
      sanitizedData.category = { id: data.categoryId } as any;
    }

    // Mise à jour de la date de modification (en UTC)
    sanitizedData.update_date = new Date(new Date().toISOString());

    return await articleRepository.update(id, sanitizedData);
  }

  async softDeleteArticle(
    id: number,
  ): Promise<Article | null>{
    const article = await articleRepository.findById(id);
    if (!article){
      return null;
    };

    await articleRepository.softDelete(id);
    return articleRepository.findById(id);
  }

  async restoreArticle(id: number): Promise<Article | null> {
    const article = await articleRepository.findById(id);
    if (!article){
      return null;
    };
    await articleRepository.restore(id);
    return articleRepository.findById(id);
  }

}

export const articleService = new ArticleService();
