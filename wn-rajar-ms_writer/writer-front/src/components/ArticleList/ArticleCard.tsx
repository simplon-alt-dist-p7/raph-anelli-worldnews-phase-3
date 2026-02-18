import "./ArticleCard.css";

export type ArticleType = {
  id: number;
  title: string;
  subtitle: string;
  subhead: string;
  publish_date: string;
  update_date: string | null;
  deletedAt: string | null;
  category?: {
    id: number;
    title: string;
  };
};

type ArticleCardProps = {
  article: ArticleType;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article className="article-card">
      {article.category && (
        <span className="article-category">{article.category.title}</span>
      )}
      <header className="article-card-header">
        <h2 className="article-title">{article.title}</h2>
      </header>
      {article.subtitle && (
        <p className="article-subtitle">{article.subtitle}</p>
      )}
      <footer className="article-meta">
        <time className="article-date" dateTime={article.publish_date}>
          Publié le {formatDate(article.publish_date)}
        </time>
        {article.update_date && (
          <>
            <span className="article-date-separator" aria-hidden="true">•</span>
            <time className="article-date article-date--modified" dateTime={article.update_date}>
              Modifié le {formatDate(article.update_date)}
            </time>
          </>
        )}
      </footer>
    </article>
  );
}
