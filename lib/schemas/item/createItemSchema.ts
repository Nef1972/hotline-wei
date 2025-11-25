import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(1),
  itemCategoryId: z.number(),
});
