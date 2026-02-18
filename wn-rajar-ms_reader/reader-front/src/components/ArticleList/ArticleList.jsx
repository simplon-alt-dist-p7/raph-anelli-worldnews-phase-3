import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../ArticleCard/ArticleCard";
import useIsMobile from "../../hooks/useIsMobile";
import "./ArticleList.css";

const API_URL = import.meta.env.VITE_API_URL;

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  // Etats pour les catégories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Détection mobile
  const isMobile = useIsMobile();

  // Infinite scroll
  const observer = useRef();
  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && isMobile) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isMobile],
  );

  // Fonction pour charger les articles
  const fetchArticles = async (pageToFetch, shouldAppend = false) => {
    setLoading(true);
    setError(null);

    try {
      let url = `${API_URL}/articles?page=${pageToFetch}&limit=${limit}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;

      const response = await fetch(url);
      if (response.status === 404) {
        // Plus d'articles disponibles
        setHasMore(false);
        setLoading(false);
        return;
      }
      if (!response.ok) throw new Error("Impossible de récupérer les articles");

      const data = await response.json();

      // En mode mobile (infinite scroll), on AJOUTE les articles
      // En mode desktop (pagination), on REMPLACE les articles
      if (shouldAppend && isMobile) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      } else {
        setArticles(data.articles);
      }

      setTotalPages(data.pagination.totalPages);
      if (categories.length === 0) setCategories(data.categories ?? []);
      setHasMore(pageToFetch < data.pagination.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Charger les articles quand la page change
  useEffect(() => {
    if (isMobile && currentPage > 1) {
      fetchArticles(currentPage, true);
    } else {
      fetchArticles(currentPage, false);
    }
  }, [currentPage, isMobile]);

  // Réinitialiser
  useEffect(() => {
    setCurrentPage(1);
    setArticles([]);
    fetchArticles(1, false);
  }, [limit, selectedCategory]);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
  };

  if (error) {
    return (
      <div className="empty-state">
        <p className="empty-state__icon">😕</p>
        <p className="empty-state__message">Oups ! Une erreur est survenue</p>
        <p className="empty-state__detail">{error}</p>
      </div>
    );
  }

  if (loading && articles.length === 0) {
    return <p className="loading">Chargement des articles...</p>;
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__icon">📰</p>
        <p className="empty-state__message">
          Aucun article disponible pour le moment
        </p>
        <p className="empty-state__detail">
          Revenez bientôt pour découvrir nos dernières actualités !
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Contrôles - visible uniquement en desktop */}
      {!isMobile && (
        <div className="pagination-controls">
          <span className="toggle-label">Articles par page :</span>
          <div className="toggle-container">
            <button
              className={`toggle-button ${limit === 5 ? "active" : ""}`}
              onClick={() => handleLimitChange({ target: { value: "5" } })}
            >
              5
            </button>
            <button
              className={`toggle-button ${limit === 10 ? "active" : ""}`}
              onClick={() => handleLimitChange({ target: { value: "10" } })}
            >
              10
            </button>
          </div>

          {/* Filtre par catégorie */}
          <div className="control-category">
            <label htmlFor="category-select">Articles par catégorie :</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              className="limit-select"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Filtre catégorie mobile */}
      {isMobile && (
        <div className="mobile-category-filter">
          <select
            id="category-select-mobile"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className="mobile-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Grille d'articles */}
      <section className="articles-grid">
        {articles.map((article, index) => {
          // Pour l'infinite scroll : on attache la ref au dernier article
          if (isMobile && articles.length === index + 1) {
            return (
              <Link
                ref={lastArticleRef}
                key={article.id}
                to={`/${article.id}`}
                className="article-card-link"
              >
                <ArticleCard article={article} />
              </Link>
            );
          } else {
            return (
              <Link
                key={article.id}
                to={`/${article.id}`}
                className="article-card-link"
              >
                <ArticleCard article={article} />
              </Link>
            );
          }
        })}
      </section>

      {/* Indicateur pour infinite scroll */}
      {isMobile && loading && (
        <p className="loading">Chargement de plus d'articles...</p>
      )}

      {isMobile && !hasMore && (
        <p className="end-message">Vous avez vu tous les articles ! 🎉</p>
      )}

      {/* Boutons de pagination (visible uniquement en desktop) */}
      {!isMobile && (
        <div className="pagination">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ← Précédent
          </button>

          <span className="pagination-info">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
