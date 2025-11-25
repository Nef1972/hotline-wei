import { z } from "zod";

export const createItemCategorySchema = z.object({
  title: z.string().min(1),
});
