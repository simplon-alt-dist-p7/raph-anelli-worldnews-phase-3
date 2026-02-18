import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Article.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Comments from "../Comment/Comment.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("L'article n'a pas été trouvé")
        }
        return res.json()
      })
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setArticle(data)
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <div className="article">
        <p>Article inexistant, veuillez retourner à la liste d'articles.</p>
        <Link to="/">← Retour aux articles</Link>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  if (!article && !notFound) {
  return <p>Chargement...</p>;
}

  return (
    <article className="article">
      <Link to="/" className="article__back">
        ← Retour aux articles
      </Link>

      <header className="article__header">
        <div className="article__meta">
          <span className="article__category">{article.category_title}</span>
          <span className="article__date">
            Publié le {formatDate(article.publish_date)}
          </span>
          <FavoriteButton articleId={article.id} showLabel />
        </div>
        <h1 className="article__title">{article.title}</h1>
        <h2 className="article__subtitle">{article.subtitle}</h2>
      </header>

      <p className="article__subhead">{article.subhead}</p>

      <p className="article__body">{article.body}</p>

      <Comments articleId={article.id} />
    </article>
  );
}
