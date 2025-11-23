import { InferSelectModel } from "drizzle-orm";
import { orders, orderStatusEnum } from "@/lib/db/schema";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import { z } from "zod";
import { People } from "@/lib/api/domain/entity/People";

export type Order = InferSelectModel<typeof orders>;

export type OrderWithPeople = Order & {
  people: People;
};

export type NewOrder = z.infer<typeof createOrderSchema>;

export type Status = (typeof orderStatusEnum.enumValues)[number];
