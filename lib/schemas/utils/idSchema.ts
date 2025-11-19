import { z } from "zod";

export const idSchema = z
  .string()
  .regex(/^\d+$/, "L'id doit être un nombre.")
  .transform(Number);
