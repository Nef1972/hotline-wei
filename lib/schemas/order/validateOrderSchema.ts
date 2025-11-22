import { z } from "zod";

export const validateOrderSchema = z.object({
  done: z.boolean(),
});
