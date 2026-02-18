import { categoryRepository } from "../repository/category.repository.js";
import { Category } from "../models/category.model.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class CategoryService {
  async getCategoryById(id: number): Promise<Category | null> {
    if (!id) {
      throw new ValidationError("L'id est requis");
    }
    if (isNaN(id) || id <= 0) {
      throw new ValidationError("L'id est invalide");
    }

    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError("Catégorie non trouvée");
    }
    return category;
  }
}

export const categoryService = new CategoryService();
