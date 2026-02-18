import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";

// recherche d'articles par mot-clé dans le titre, le sous-titre, le chapeau ou le corps
export const searchArticles = async (req: Request, res: Response, next: NextFunction) => {
    // On récupère le paramètre de recherche "q" depuis la query string de l'URL. Exemple : /api/articles/search?q=IA
    const query = req.query.q as string;

    if (!query) {
        return res.status(400).json({ message: "Le paramètre de recherche 'q' est requis." });
    }

    try {
        const articles = AppDataSource.getRepository(Article);
        // On crée une requête pour chercher les articles correspondant au mot-clé 
        const matchedArticles = await articles.createQueryBuilder("article")
            .leftJoinAndSelect("article.category", "category")
            .where("article.title ILIKE :query OR article.subtitle ILIKE :query OR article.subhead ILIKE :query OR article.body ILIKE :query", 
                { query: `%${query}%` })
                // ILIKE insensible à la casse 
                // :query évite les injections SQL
                // Les % permettent de rechercher le mot n'importe où dans le texte
            .getMany();

        res.status(200).json(matchedArticles);
    } catch (error) {
        next(error);
    }
};