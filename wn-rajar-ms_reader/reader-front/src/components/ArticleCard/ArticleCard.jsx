import "./ArticleCard.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import CommentCount from "../CommentCount/CommentCount";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="article-card__header">
        <span className="article-card__category">{article.category_title}</span>
      </div>
      <h2 className="article-card__title">{article.title}</h2>
      <p className="article-card__chapeau">{article.subhead}</p>
      <div className="article-card__footer">
        <span className="article-card__date article-card__date--long">
          {formatDate(article.publish_date)}
        </span>
        <span className="article-card__date article-card__date--short">
          {formatDateShort(article.publish_date)}
        </span>
        <div className="article-card__actions">
          <CommentCount count={article.commentCount} hideText />
          <FavoriteButton articleId={article.id} />
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
