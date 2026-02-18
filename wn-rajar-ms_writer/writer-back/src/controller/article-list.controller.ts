import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = [5, 10].includes(parseInt(req.query.limit as string))
      ? parseInt(req.query.limit as string)
      : 5;
    const skip = (page - 1) * limit;

    const repository = AppDataSource.getRepository(Article);

    const articles = await repository
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.category", "category")
      .withDeleted()
      .addSelect("COALESCE(article.update_date, article.publish_date)", "sort_date")
      .orderBy("sort_date", "DESC")
      .skip(skip)
      .take(limit)
      .getMany();

    const total = await repository.createQueryBuilder("article").withDeleted().getCount();

    res.status(200).json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error)
  }
};
