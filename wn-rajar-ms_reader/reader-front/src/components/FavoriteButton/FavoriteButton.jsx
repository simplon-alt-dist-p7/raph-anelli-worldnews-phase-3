import { useState, useEffect } from "react";
import "./FavoriteButton.css";

const API_URL = import.meta.env.VITE_API_URL;

function FavoriteButton({ articleId, showLabel = false }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/articles/favorites`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des favoris");
        }
        return res.json();
      })
      .then((favorites) => {
        const isFav = favorites.some((fav) => fav.article_id === articleId);
        setIsFavorite(isFav);
      })
      .catch(() => {
        setIsFavorite(false);
      });
  }, [articleId]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch(`${API_URL}/articles/${articleId}/favorite`, {
        method,
      });

      if (!res.ok) {
        throw new Error(
          isFavorite
            ? "Erreur lors du retrait des favoris"
            : "Erreur lors de l'ajout aux favoris"
        );
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "favorite-button--active" : ""} ${showLabel ? "favorite-button--with-label" : ""}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      title={error || (isFavorite ? "Retirer des favoris" : "Ajouter aux favoris")}
    >
      <span className="favorite-button__icon">♡</span>
      {showLabel && (
        <span className="favorite-button__label">
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </span>
      )}
    </button>
  );
}

export default FavoriteButton;
