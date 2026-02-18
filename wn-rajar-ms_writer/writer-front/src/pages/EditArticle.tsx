import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articleService } from "../services/article.service";
import { categoryService } from "../services/category.service";
import { getUserFriendlyMessage } from "../errors";
import type { Article, Category } from "../types/article.types";
import ArticleForm from "../components/ArticleForm/ArticleForm";
import Modal from "../components/Modal/Modal";
import styles from "./EditArticle.module.css";

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
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
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({ isOpen: false, title: "", message: "", type: "info" });

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

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError("ID d'article manquant");
        setLoadingArticle(false);
        return;
      }

      try {
        const response = await articleService.getArticleById(Number(id));
        const article = response.data;
        setFormData({
          title: article.title,
          subtitle: article.subtitle,
          subhead: article.subhead,
          body: article.body,
          category_id: article.category?.id || 0,
        });
      } catch (err) {
        setError(getUserFriendlyMessage(err));
      } finally {
        setLoadingArticle(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!id) {
      setError("ID d'article manquant");
      return;
    }

    const hasChanges = Object.values(formData).some(
      (value) => typeof value === "string" ? value.trim() !== "" : value !== 0
    );
    if (!hasChanges) {
      setError("Veuillez modifier au moins un champ");
      return;
    }

    const updateData: Partial<Article> = {};
    if (formData.title.trim()) updateData.title = formData.title.trim();
    if (formData.subtitle.trim())
      updateData.subtitle = formData.subtitle.trim();
    if (formData.subhead.trim()) updateData.subhead = formData.subhead.trim();
    if (formData.body.trim()) updateData.body = formData.body.trim();
    if (formData.category_id) updateData.category_id = formData.category_id;

    setLoading(true);

    try {
      const response = await articleService.updateArticle(
        Number(id),
        updateData
      );
      setSuccess(true);
      console.log("Article mis à jour:", response.data);
      setModal({
        isOpen: true,
        title: "Article mis à jour",
        message: "L'article a été modifié avec succès. La date de modification a été enregistrée.",
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

  if (loadingArticle) {
    return (
      <section className={styles.container}>
        <article className={styles.card}>
          <figure className={styles.loadingState} aria-busy="true">
            <span className={styles.loadingSpinner} aria-hidden="true" />
            <figcaption>Chargement de l'article...</figcaption>
          </figure>
        </article>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container} aria-labelledby="edit-title">
        <article className={styles.card}>
          <header className={styles.header}>
            <h1 id="edit-title" className={styles.title}>Modifier l'article</h1>
            <p className={styles.subtitle}>Modifiez les champs que vous souhaitez mettre à jour</p>
          </header>

          <ArticleForm
            formData={formData}
            onFormDataChange={setFormData}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            submitLabel="Mettre à jour"
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
