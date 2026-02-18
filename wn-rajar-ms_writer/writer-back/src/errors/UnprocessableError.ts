import { AppError } from './AppError.js';

export class UnprocessableError extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}