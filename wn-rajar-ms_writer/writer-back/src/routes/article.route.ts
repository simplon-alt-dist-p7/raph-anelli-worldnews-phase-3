import { Router } from "express";
import { articleController } from "../controller/article.controller.js";
import { getAllArticles } from "../controller/article-list.controller.js";
import { searchArticles } from "../controller/article-search.controller.js";

const router = Router();

// Récupérer tous les articles
router.get("/", getAllArticles);

// Créer un article
router.post("/", (req, res, next) =>
  articleController.createArticle(req, res, next)
);

// Rechercher des articles
router.get("/search", searchArticles);

// Récupérer un article par ID
router.get("/:id", (req, res, next) =>
  articleController.getArticle(req, res, next)
);

// Mettre à jour un article
router.patch("/:id", (req, res, next) =>
  articleController.updateArticle(req, res, next)
);

// Supprimer un article
router.patch("/:id/delete", (req, res, next) =>
  articleController.softDeleteArticle(req, res, next)
);

// Restorer un article
router.patch("/:id/restore", (req, res, next) =>
  articleController.restoreArticle(req, res, next)
);

export default router;
