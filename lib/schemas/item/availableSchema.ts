import { z } from "zod";

export const availableSchema = z
  .object({
    itemAvailable: z.boolean().optional(),
  })
  .optional();
