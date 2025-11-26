import { z } from "zod";
import { idSchema } from "@/lib/schemas/utils/idSchema";

export const pictureUrlSchema = z.object({
  id: idSchema,
  pictureUrl: z.string(),
});
