import { InferSelectModel } from "drizzle-orm";
import { orders } from "@/lib/db/schema";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import { z } from "zod";
import { People } from "@/lib/api/domain/entities/People";
import { validateOrderSchema } from "@/lib/schemas/order/validateOrderSchema";

export type Order = InferSelectModel<typeof orders>;

export type OrderWithPeople = Order & {
  people: People;
};

export type NewOrder = z.infer<typeof createOrderSchema>;

export type ValidateOrder = z.infer<typeof validateOrderSchema>;
