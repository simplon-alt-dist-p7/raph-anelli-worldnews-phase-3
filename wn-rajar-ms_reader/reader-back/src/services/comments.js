const prisma = require('../lib/prisma');

class CommentsService {
  async getCommentsByArticleId(articleId) {
    return prisma.comment.findMany({
      where: { articleId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async addCommentToArticle(articleId, commentData) {
    if (!commentData.content || commentData.content.trim() === "") {
      throw new Error("Contenu obligatoire");
    }
    if (commentData.content.length > 1000) {
      throw new Error("Contenu trop long (max 1000 caractères)");
    }

    return prisma.comment.create({
      data: {
        articleId,
        content: commentData.content,
      },
    });
  }

  async getCommentCountByArticleId(articleId) {
    return prisma.comment.count({
      where: { articleId },
    });
  }
}

module.exports = CommentsService;
