const ArticlesService = require("./../services/articles");

const articlesService = new ArticlesService();

async function getLastTenArticlesByMostRecent(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;        // Défaut: page 1
    const limit = parseInt(req.query.limit) || 5;      // Défaut: 5 articles
    const category = req.query.category || null; 

    const result = await articlesService.getLastTenByMostRecent(page, limit,category);

    res.status(200).json({
      articles: result.articles,
      categories: result.categories || [],
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        limit: result.limit,
        total: result.total
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params;

    const article = await articlesService.getById(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json(article);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function addArticleToFavorites(req, res) {
  try {
    const { id } = req.params;

    const article = await articlesService.getById(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const favorite = await articlesService.addToFavorites(id);

    res.status(201).json(favorite);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function getFavoriteArticles(req, res) {
  try {
    const favorites = await articlesService.getFavorites();

    res.status(200).json(favorites);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function removeArticleFromFavorites(req, res) {
  try {
    const { id } = req.params;

    const favorite = await articlesService.removeFromFavorites(id);

    res.status(200).json(favorite);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

module.exports = { getLastTenArticlesByMostRecent, getArticleById, addArticleToFavorites, getFavoriteArticles, removeArticleFromFavorites };
