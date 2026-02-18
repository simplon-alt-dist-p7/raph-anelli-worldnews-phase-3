const express = require("express");
const router = express.Router();
const {
  getLastTenArticlesByMostRecent,
  getArticleById,
  addArticleToFavorites,
  getFavoriteArticles,
  removeArticleFromFavorites,
} = require("./../controllers/articles");
const validate = require("./../middlewares/validate");
const { getArticleByIdSchema } = require("./../schemas/articles.schema");

// Importer le router commentaires
const commentsRoutes = require("./comments");

// Routes articles
router.get("/", getLastTenArticlesByMostRecent);
router.get("/favorites", getFavoriteArticles);
router.get("/:id", validate(getArticleByIdSchema, "params"), getArticleById);
router.post("/:id/favorite", validate(getArticleByIdSchema, "params"), addArticleToFavorites);
router.delete("/:id/favorite", validate(getArticleByIdSchema, "params"), removeArticleFromFavorites);

// Monter le router commentaires sous /:id/comments
router.use("/:id/comments", commentsRoutes);

module.exports = router;
