import { useNavigate } from "react-router-dom";
import "./Button.css";

type EditButtonProps = {
  articleId: number;
};

export default function EditButton({ articleId }: EditButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${articleId}/edit`);
  };

  return (
    <button className="action-button action-button--edit" onClick={handleClick}>
      Modifier
    </button>
  );
}
