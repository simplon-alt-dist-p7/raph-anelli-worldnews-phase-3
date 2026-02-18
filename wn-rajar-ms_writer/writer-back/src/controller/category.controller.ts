import type { Request, Response, NextFunction } from "express";
import { categoryService } from "../services/category.service.js";

class CategoryController {

  async getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(400).json({
          error: "ID de la catégorie manquant",
        });
        return;
      }

      const categoryId = parseInt(req.params.id, 10);

      const category = await categoryService.getCategoryById(categoryId);

      res.status(200).json({
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

}

export const categoryController = new CategoryController();
