import { handleError } from "@/lib/api/shared/http/handleError";

export function controller<Args extends unknown[], T>(
  handler: (...args: Args) => Promise<T>,
) {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
