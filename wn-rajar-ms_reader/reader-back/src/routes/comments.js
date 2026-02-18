const express = require("express");
const router = express.Router({ mergeParams: true }); // 🔹 Obligatoire pour récupérer :id
const { getCommentsByArticleId, addCommentToArticle } = require("../controllers/comments");

// GET tous les commentaires d’un article
router.get("/", getCommentsByArticleId);

// POST un nouveau commentaire
router.post("/", addCommentToArticle);

module.exports = router;
