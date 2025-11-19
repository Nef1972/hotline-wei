import { peoples } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Role } from "@/lib/types/Role";
import { Order } from "@/lib/types/Order";

export type People = InferSelectModel<typeof peoples>;

export type PeopleWithRole = People & {
  role: Role;
};

export type PeopleWithOrders = People & {
  orders: Order[];
};
