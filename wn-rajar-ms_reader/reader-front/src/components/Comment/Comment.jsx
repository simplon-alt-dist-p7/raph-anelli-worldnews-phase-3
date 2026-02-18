import { useEffect, useState } from "react";
import "./Comment.css";
import CommentCount from "../CommentCount/CommentCount";

const API_URL = import.meta.env.VITE_API_URL;

function formatDate(dateString) {
  const dates = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", dates);
}

export default function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/articles/${articleId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/articles/${articleId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du commentaire");

      const savedComment = await res.json();
      setComments([savedComment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Impossible d'ajouter le commentaire");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="comments__loading">Chargement des commentaires...</p>;

  return (
    <div className="comments">
      <h3 className="comments__title">
        Commentaires <CommentCount count={comments.length} showParentheses />
      </h3>

      {/* Formulaire */}
      <form className="comments__form" onSubmit={handleSubmit}>
        <textarea
          className="comments__textarea"
          placeholder="Écrire un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          disabled={submitting}
        />
        <button
          className="comments__button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Envoi..." : "Publier"}
        </button>
      </form>

      {/* Liste des commentaires */}
      {comments.length === 0 ? (
        <p className="comments__empty">Aucun commentaire pour le moment.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="comments__item">
            <p className="comments__date">{formatDate(c.createdAt)}</p>
            <p className="comments__content">{c.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
