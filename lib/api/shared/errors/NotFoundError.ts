import { AppError } from "@/lib/api/shared/errors/AppError";

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}
