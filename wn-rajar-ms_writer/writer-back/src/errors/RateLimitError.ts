import { AppError } from "./AppError.js";

export class RateLimitError extends AppError {
  constructor(message: string = "Trop de requêtes, veuillez réessayer plus tard") {
    super(429, message);
  }
}
