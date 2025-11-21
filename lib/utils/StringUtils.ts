import { ZodSafeParseResult } from "zod";

export const joinZodErrors = <T>(
  ...parsedList: ZodSafeParseResult<T | boolean | number | string>[]
) =>
  parsedList
    .map((parsed) => parsed.error?.issues.map((e) => e.message).join(", "))
    .join(", ");
