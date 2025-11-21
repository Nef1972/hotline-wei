import { InferSelectModel } from "drizzle-orm";
import { orders } from "@/lib/db/schema";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import { z } from "zod";

export type Order = InferSelectModel<typeof orders>;

export type NewOrder = z.infer<typeof createOrderSchema>;
