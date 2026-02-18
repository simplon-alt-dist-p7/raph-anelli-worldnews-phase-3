/**
 * Classe d'erreur pour les appels API
 * Permet de transporter le code HTTP et le message d'erreur du backend
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly originalMessage: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.originalMessage = message;
    this.name = "ApiError";
  }

  /**
   * Vérifie si c'est une erreur de validation (400)
   */
  isValidationError(): boolean {
    return this.statusCode === 400;
  }

  /**
   * Vérifie si c'est une erreur de ressource non trouvée (404)
   */
  isNotFoundError(): boolean {
    return this.statusCode === 404;
  }

  /**
   * Vérifie si c'est une erreur de conflit (409)
   */
  isConflictError(): boolean {
    return this.statusCode === 409;
  }

  /**
   * Vérifie si c'est une erreur de traitement (422)
   */
  isUnprocessableError(): boolean {
    return this.statusCode === 422;
  }

  /**
   * Vérifie si c'est une erreur de rate limit (429)
   */
  isRateLimitError(): boolean {
    return this.statusCode === 429;
  }

  /**
   * Vérifie si c'est une erreur serveur (500+)
   */
  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
