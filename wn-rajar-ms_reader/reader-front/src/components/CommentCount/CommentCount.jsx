import "./CommentCount.css";

function CommentCount({ count, showParentheses = false, hideText = false }) {
  const CommentIcon = () => (
    <svg
      className="comment-count__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  return (
    <span className="comment-count">
      {showParentheses ? "(" : ""}<CommentIcon /> {count}
      {!hideText && <span className="comment-count__text"> {count <= 1 ? "commentaire" : "commentaires"}</span>}
      {showParentheses ? ")" : ""}
    </span>
  );
}

export default CommentCount;
