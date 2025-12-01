import { z } from "zod";
import { statusesSchema } from "@/lib/schemas/order/statusSchema";

export const filterOrderSchema = z.object({
  statuses: statusesSchema,
  peopleId: z.number().optional(),
  operatorId: z.number().optional(),
});
