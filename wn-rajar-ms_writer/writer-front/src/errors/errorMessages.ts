import { ApiError } from "./ApiError";

/**
 * Messages d'erreur adaptés au métier (auteur d'articles)
 * Mappage des messages techniques vers des messages compréhensibles
 */

// Messages par défaut selon le code HTTP
const defaultMessages: Record<number, string> = {
  400: "Les informations saisies sont incorrectes",
  404: "L'élément demandé n'existe pas ou a été supprimé",
  409: "Cette action crée un conflit avec une donnée existante",
  422: "Impossible de traiter votre demande",
  429: "Trop de demandes, veuillez patienter quelques instants",
  500: "Une erreur inattendue s'est produite",
  503: "Le service est temporairement indisponible",
};

// Messages spécifiques selon le message technique du backend
const specificMessages: Record<string, string> = {
  // Validation des articles
  "Le titre est requis": "Veuillez saisir un titre pour votre article",
  "Le titre ne peut pas dépasser 300 caractères": "Votre titre est trop long (300 caractères maximum)",
  "Le titre ne peut pas être vide": "Veuillez saisir un titre pour votre article",
  "Le sous-titre est requis": "Veuillez saisir un sous-titre",
  "Le sous-titre ne peut pas dépasser 300 caractères": "Votre sous-titre est trop long (300 caractères maximum)",
  "Le sous-titre ne peut pas être vide": "Veuillez saisir un sous-titre",
  "Le chapeau est requis": "Veuillez saisir un chapeau pour introduire votre article",
  "Le chapeau ne peut pas dépasser 1000 caractères": "Votre chapeau est trop long (1000 caractères maximum)",
  "Le chapeau ne peut pas être vide": "Veuillez saisir un chapeau",
  "Le contenu est requis": "Veuillez rédiger le contenu de votre article",
  "Le contenu ne peut pas être vide": "Veuillez rédiger le contenu de votre article",
  "Une catégorie est requise": "Veuillez sélectionner une catégorie",
  "Au moins un champ doit être fourni pour la mise à jour": "Aucune modification détectée",

  // Conflits
  "Un article avec ce titre existe déjà": "Ce titre est déjà utilisé, veuillez en choisir un autre",
  "Un article avec ce titre existe déjà pour cette date": "Ce titre est déjà utilisé pour cette date de publication",

  // Ressources non trouvées
  "Article non trouvé": "Cet article n'existe plus ou a été supprimé",
  "Catégorie non trouvée": "Cette catégorie n'existe plus",

  // Validation ID
  "L'id est requis": "Identifiant manquant",
  "L'id est invalide": "Identifiant invalide",

  // Erreurs Gemini / IA
  "Le contenu de l'article est trop court pour générer un titre": "Votre contenu est trop court pour générer un titre automatiquement",
  "Le contenu de l'article est trop court pour générer un sous-titre": "Votre contenu est trop court pour générer un sous-titre automatiquement",
  "Le contenu de l'article est trop court pour générer un chapeau (min 50 caractères)": "Votre contenu doit faire au moins 50 caractères pour la génération automatique",
  "L'IA n'a pas pu générer de texte": "La génération automatique a échoué, veuillez réessayer ou rédiger manuellement",
  "GEMINI_API_KEY manquante dans le .env": "Le service de génération automatique n'est pas configuré",

  // Rate limit
  "Trop de requêtes, veuillez réessayer plus tard": "Vous avez fait trop de demandes, patientez quelques instants avant de réessayer",

  // Service indisponible
  "Service externe indisponible": "Le service de génération est temporairement indisponible, réessayez plus tard",
};

/**
 * Convertit une erreur API en message compréhensible pour l'utilisateur
 */
export function getErrorMessage(error: ApiError): string {
  // Chercher d'abord un message spécifique
  const specificMessage = specificMessages[error.originalMessage];
  if (specificMessage) {
    return specificMessage;
  }

  // Sinon utiliser le message par défaut selon le code HTTP
  const defaultMessage = defaultMessages[error.statusCode];
  if (defaultMessage) {
    return defaultMessage;
  }

  // En dernier recours
  return "Une erreur est survenue, veuillez réessayer";
}

/**
 * Convertit n'importe quelle erreur en message utilisateur
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return getErrorMessage(error);
  }

  if (error instanceof Error) {
    // Erreur réseau ou autre
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return "Impossible de contacter le serveur, vérifiez votre connexion internet";
    }
    return error.message;
  }

  return "Une erreur inattendue s'est produite";
}
