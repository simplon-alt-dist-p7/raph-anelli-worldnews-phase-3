const prisma = require("./../lib/prisma");
const CommentsService = require("./comments");

const commentsService = new CommentsService();

class ArticlesService {

  async getLastTenByMostRecent(page = 1, limit = 5, category = null) {
    const skip = (page - 1) * limit;

    // Récupérer les catégories avec au moins un article
    const categoriesFromArticles = await prisma.article.findMany({
      where: { delete_date: null }, //on ne prend que les articles non supprimés
      select: { category_id: true, category_title: true }, // on prend l'id et le title
      distinct: ['category_id'], // permet d'avoir une catégorie unique et évite les doublons
      orderBy: { category_title: 'asc' },
    });

    // Transformer en objets {id, title} pour le front
    const categories = categoriesFromArticles.map((cat) => ({
      id: cat.category_id,
      title: cat.category_title
    }));

    // Filter les articles par catégorie
    const whereClause = { delete_date: null }; //on créer un objet avec uniuquement les articles non supprimés
    if (category) { //si le user a choisi une catégorie
      whereClause.category_title = category; //alors je filtre les articles par cette catégorie
    }

    // Récupération des articles paginés + total pour pagination
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: whereClause,
        orderBy: { publish_date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where: whereClause }),
    ]);

    // Ajouter le nombre de commentaires pour chaque article
    const articlesWithCommentCount = await Promise.all(
      articles.map(async (article) => {
        const commentCount = await commentsService.getCommentCountByArticleId(article.id);
        return { ...article, commentCount };
      })
    );

    const totalPages = Math.ceil(total / limit);

    return {
      articles: articlesWithCommentCount,
      categories,
      currentPage: page,
      totalPages,
      limit,
      total,
    };
  }


  async getById(id) {
    return prisma.article.findFirst({
      where: { id, delete_date: null },
    });
  }

  async addToFavorites(articleId) {
    return prisma.articleFavorite.upsert({
      where: { article_id: articleId },
      update: {},
      create: { article_id: articleId },
    });
  }

  async getFavorites() {
    return prisma.articleFavorite.findMany();
  }

  async removeFromFavorites(articleId) {
    return prisma.articleFavorite.delete({
      where: { article_id: articleId },
    });
  }
}

module.exports = ArticlesService;
