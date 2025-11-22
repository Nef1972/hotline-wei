import { peoples } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Role } from "@/lib/api/domain/entity/Role";
import { Order } from "@/lib/api/domain/entity/Order";

export type People = InferSelectModel<typeof peoples>;

export type PeopleWithRole = People & {
  role: Role;
};

export type PeopleWithOrders = People & {
  orders: Order[];
};

export type NewPeople = Omit<People, "id" | "roleId">;
