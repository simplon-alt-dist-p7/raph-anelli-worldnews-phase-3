import { AppError } from "./AppError.js";

export class ServiceError extends AppError {
  constructor(message: string = "Service externe indisponible") {
    super(503, message);
  }
}
