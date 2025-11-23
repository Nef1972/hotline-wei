import { peoples } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Role } from "@/lib/api/domain/entity/Role";
import { OrderWithItem } from "@/lib/api/domain/entity/Order";

export type People = InferSelectModel<typeof peoples>;

export type PeopleWithRole = People & {
  role: Role | null;
};

export type PeopleWithOrders = People & {
  orders: OrderWithItem[];
};

export type NewPeople = Omit<People, "id" | "roleId">;
