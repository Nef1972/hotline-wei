import { z } from "zod";

export const processAccessRequestSchema = z.object({
  isAccepted: z.boolean(),
});
