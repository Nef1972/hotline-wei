import { AppError } from "@/lib/api/shared/errors/AppError";

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}
