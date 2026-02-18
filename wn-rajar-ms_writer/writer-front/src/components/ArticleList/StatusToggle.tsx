import { useState } from "react";
import { articleService } from "../../services/article.service";
import "./StatusToggle.css";

type StatusToggleProps = {
  articleId: number;
  isActive: boolean;
  onStatusChange: (id: number, isActive: boolean) => void;
};

export default function StatusToggle({ articleId, isActive, onStatusChange }: StatusToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      if (isActive) {
        await articleService.deleteArticle(articleId);
      } else {
        await articleService.restoreArticle(articleId);
      }
      onStatusChange(articleId, !isActive);
    } catch (error) {
      console.error("Erreur changement statut:", articleId, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="status-toggle-container">
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        className={`status-toggle ${isActive ? "status-toggle--active" : "status-toggle--inactive"} ${isLoading ? "status-toggle--loading" : ""}`}
        onClick={handleToggle}
        disabled={isLoading}
      >
        <span className="status-toggle-track">
          <span className="status-toggle-thumb" />
        </span>
        <span className="visually-hidden">
          {isActive ? "Désactiver l'article" : "Activer l'article"}
        </span>
      </button>
      <output className={`status-label ${isActive ? "status-label--active" : "status-label--inactive"}`}>
        {isLoading ? "..." : isActive ? "Actif" : "Inactif"}
      </output>
    </label>
  );
}
