import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { articleService } from "../services/article.service";
import { categoryService } from "../services/category.service";
import { getUserFriendlyMessage } from "../errors";
import type { Category } from "../types/article.types";
import ArticleForm from "../components/ArticleForm/ArticleForm";
import Modal from "../components/Modal/Modal";
import styles from "./CreateArticle.module.css";

export default function CreateArticle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    subhead: "",
    body: "",
    category_id: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur chargement catégories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({ isOpen: false, title: "", message: "", type: "info" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (
      !formData.title.trim() ||
      !formData.subtitle.trim() ||
      !formData.subhead.trim() ||
      !formData.body.trim() ||
      !formData.category_id
    ) {
      setError("Tous les champs sont requis");
      return;
    }

    setLoading(true);

    try {
      const response = await articleService.createArticle({
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        subhead: formData.subhead.trim(),
        body: formData.body.trim(),
        category_id: formData.category_id,
      });
      setSuccess(true);
      console.log("Article créé:", response.data);
      setModal({
        isOpen: true,
        title: "Article créé",
        message: "L'article a été créé avec succès. La date de publication a été enregistrée.",
        type: "success",
      });
    } catch (err) {
      const errorMessage = getUserFriendlyMessage(err);
      setError(errorMessage);
      setModal({
        isOpen: true,
        title: "Erreur",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/articles");
  };

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    if (success) {
      navigate("/articles");
    }
  };

  return (
    <>
      <section className={styles.container} aria-labelledby="create-title">
        <article className={styles.card}>
          <header className={styles.header}>
            <h1 id="create-title" className={styles.title}>Nouvel article</h1>
            <p className={styles.subtitle}>Remplissez les informations ci-dessous pour créer votre article</p>
          </header>

          <ArticleForm
            formData={formData}
            onFormDataChange={setFormData}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            submitLabel="Créer l'article"
            error={error}
            success={success}
          />
        </article>
      </section>
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </>
  );
}
