import { ZodSafeParseResult } from "zod";

export const joinZodErrors = <T>(parsed: ZodSafeParseResult<T>) =>
  parsed.error?.issues.map((e) => e.message).join(", ");
