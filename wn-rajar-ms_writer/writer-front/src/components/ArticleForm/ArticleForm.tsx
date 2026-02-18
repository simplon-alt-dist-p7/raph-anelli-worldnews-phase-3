import { useState, type FormEvent } from "react";
import type { Category } from "../../types/article.types";
import { geminiService } from "../../services/gemini.service";
import { getUserFriendlyMessage } from "../../errors";
import styles from "./ArticleForm.module.css";

interface ArticleFormData {
  title: string;
  subtitle: string;
  subhead: string;
  body: string;
  category_id: number;
}

interface ArticleFormProps {
  formData: ArticleFormData;
  onFormDataChange: (data: ArticleFormData) => void;
  categories: Category[];
  categoriesLoading?: boolean;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
  error?: string | null;
  success?: boolean;
}

type GeneratingField = "title" | "subtitle" | "subhead" | "body" | null;

export default function ArticleForm({
  formData,
  onFormDataChange,
  categories,
  categoriesLoading = false,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Enregistrer",
  error,
  success,
}: ArticleFormProps) {
  const [generatingField, setGeneratingField] = useState<GeneratingField>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const MIN_BODY_LENGTH = 50;

  const canGenerate = formData.body.trim().length >= MIN_BODY_LENGTH;

  const handleGenerateTitle = async () => {
    if (!canGenerate || generatingField) return;

    setGeneratingField("title");
    setGenerationError(null);

    try {
      const response = await geminiService.generateTitle(formData.body);
      onFormDataChange({ ...formData, title: response.data });
    } catch (err) {
      setGenerationError(getUserFriendlyMessage(err));
    } finally {
      setGeneratingField(null);
    }
  };

  const handleGenerateSubtitle = async () => {
    if (!canGenerate || generatingField) return;

    setGeneratingField("subtitle");
    setGenerationError(null);

    try {
      const response = await geminiService.generateSubtitle(
        formData.title,
        formData.body
      );
      onFormDataChange({ ...formData, subtitle: response.data });
    } catch (err) {
      setGenerationError(getUserFriendlyMessage(err));
    } finally {
      setGeneratingField(null);
    }
  };

  const handleGenerateSubhead = async () => {
    if (!canGenerate || generatingField) return;

    setGeneratingField("subhead");
    setGenerationError(null);

    try {
      const response = await geminiService.generateSubhead(formData.body);
      onFormDataChange({ ...formData, subhead: response.data });
    } catch (err) {
      setGenerationError(getUserFriendlyMessage(err));
    } finally {
      setGeneratingField(null);
    }
  };

  const handleGenerateBody = async () => {
    if (!canGenerate || generatingField) return;

    setGeneratingField("body");
    setGenerationError(null);

    try {
      const response = await geminiService.generateBody(formData.body);
      onFormDataChange({ ...formData, body: response.data });
    } catch (err) {
      setGenerationError(getUserFriendlyMessage(err));
    } finally {
      setGeneratingField(null);
    }
  };

  return (
    <>
      {error && (
        <aside className={styles.alert} data-type="error" role="alert">
          {error}
        </aside>
      )}

      {generationError && (
        <aside className={styles.alert} data-type="error" role="alert">
          {generationError}
        </aside>
      )}

      {success && (
        <aside className={styles.alert} data-type="success" role="status">
          Article enregistré avec succès ! Redirection...
        </aside>
      )}

      <form onSubmit={onSubmit} className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Informations principales</legend>

          <p className={styles.formGroup}>
            <span className={styles.labelRow}>
              <label htmlFor="title" className={styles.label}>
                Titre <abbr title="requis" className={styles.required}>*</abbr>
              </label>
              <button
                type="button"
                onClick={handleGenerateTitle}
                disabled={!canGenerate || generatingField !== null}
                className={styles.generateButton}
                title={
                  !canGenerate
                    ? `Rédigez au moins ${MIN_BODY_LENGTH} caractères dans le corps de l'article`
                    : "Générer avec l'IA"
                }
              >
                <span className={styles.sparkleIcon}>
                  {generatingField === "title" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                    </svg>
                  )}
                </span>
                <span className={styles.generateText}>
                  {generatingField === "title" ? "Génération..." : "Générer"}
                </span>
              </button>
            </span>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                onFormDataChange({ ...formData, title: e.target.value })
              }
              className={styles.input}
              placeholder="Titre de l'article"
              maxLength={300}
              required
            />
            <small className={styles.hint}>Max 300 caractères</small>
          </p>

          <p className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Catégorie <abbr title="requis" className={styles.required}>*</abbr>
            </label>
            <select
              id="category"
              value={formData.category_id}
              onChange={(e) =>
                onFormDataChange({ ...formData, category_id: Number(e.target.value) })
              }
              className={styles.select}
              required
              disabled={categoriesLoading}
            >
              <option value={0} disabled>
                {categoriesLoading ? "Chargement..." : "Sélectionner une catégorie"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </p>

          <p className={styles.formGroup}>
            <span className={styles.labelRow}>
              <label htmlFor="subtitle" className={styles.label}>
                Sous-titre <abbr title="requis" className={styles.required}>*</abbr>
              </label>
              <button
                type="button"
                onClick={handleGenerateSubtitle}
                disabled={!canGenerate || generatingField !== null}
                className={styles.generateButton}
                title={
                  !canGenerate
                    ? `Rédigez au moins ${MIN_BODY_LENGTH} caractères dans le corps de l'article`
                    : "Générer avec l'IA"
                }
              >
                <span className={styles.sparkleIcon}>
                  {generatingField === "subtitle" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                    </svg>
                  )}
                </span>
                <span className={styles.generateText}>
                  {generatingField === "subtitle" ? "Génération..." : "Générer"}
                </span>
              </button>
            </span>
            <input
              type="text"
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) =>
                onFormDataChange({ ...formData, subtitle: e.target.value })
              }
              className={styles.input}
              placeholder="Sous-titre de l'article"
              maxLength={300}
              required
            />
            <small className={styles.hint}>Max 300 caractères</small>
          </p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Contenu de l'article</legend>

          <p className={styles.formGroup}>
            <span className={styles.labelRow}>
              <label htmlFor="subhead" className={styles.label}>
                Chapeau <abbr title="requis" className={styles.required}>*</abbr>
              </label>
              <button
                type="button"
                onClick={handleGenerateSubhead}
                disabled={!canGenerate || generatingField !== null}
                className={styles.generateButton}
                title={
                  !canGenerate
                    ? `Rédigez au moins ${MIN_BODY_LENGTH} caractères dans le corps de l'article`
                    : "Générer avec l'IA"
                }
              >
                <span className={styles.sparkleIcon}>
                  {generatingField === "subhead" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                    </svg>
                  )}
                </span>
                <span className={styles.generateText}>
                  {generatingField === "subhead" ? "Génération..." : "Générer"}
                </span>
              </button>
            </span>
            <textarea
              id="subhead"
              value={formData.subhead}
              onChange={(e) =>
                onFormDataChange({ ...formData, subhead: e.target.value })
              }
              className={styles.textarea}
              placeholder="Chapeau de l'article (introduction accrocheuse)"
              rows={3}
              maxLength={1000}
              required
            />
            <small className={styles.hint}>Max 1000 caractères</small>
          </p>

          <p className={styles.formGroup}>
            <span className={styles.labelRow}>
              <label htmlFor="body" className={styles.label}>
                Corps de l'article <abbr title="requis" className={styles.required}>*</abbr>
              </label>
              <button
                type="button"
                onClick={handleGenerateBody}
                disabled={!canGenerate || generatingField !== null}
                className={styles.generateButton}
                title={
                  !canGenerate
                    ? `Rédigez au moins ${MIN_BODY_LENGTH} caractères pour corriger`
                    : "Corriger et améliorer avec l'IA"
                }
              >
                <span className={styles.sparkleIcon}>
                  {generatingField === "body" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                    </svg>
                  )}
                </span>
                <span className={styles.generateText}>
                  {generatingField === "body" ? "Correction..." : "Corriger"}
                </span>
              </button>
            </span>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) =>
                onFormDataChange({ ...formData, body: e.target.value })
              }
              className={styles.textarea}
              placeholder="Rédigez le contenu complet de votre article..."
              rows={12}
              required
            />
            {!canGenerate && (
              <small className={styles.hintWarning}>
                Écrivez au moins {MIN_BODY_LENGTH} caractères pour activer la génération IA
                ({formData.body.trim().length}/{MIN_BODY_LENGTH})
              </small>
            )}
          </p>
        </fieldset>

        <footer className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.buttonSecondary}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : submitLabel}
          </button>
        </footer>
      </form>
    </>
  );
}
