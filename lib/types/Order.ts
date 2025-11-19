import { InferSelectModel } from "drizzle-orm";
import { orders } from "@/lib/db/schema";

export type Order = InferSelectModel<typeof orders>;

export type NewOrder = Omit<Order, "id" | "peopleId" | "done" | "createdAt">;
