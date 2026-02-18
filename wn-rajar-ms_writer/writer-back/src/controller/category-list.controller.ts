import type { Request, Response, NextFunction} from "express";
import { AppDataSource } from "../config/database.js";
import { Category } from "../models/category.model.js";

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = AppDataSource.getRepository(Category);
        const allCategories = await categories.find({
            order: {
                title: "ASC"
            }
        });
        res.status(200).json(allCategories);
    } catch (error) {
        next(error);
    }
};