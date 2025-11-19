import { InferSelectModel } from "drizzle-orm";
import { orders } from "@/lib/db/schema";
import { PeopleWithRole } from "@/lib/types/People";

export type Order = InferSelectModel<typeof orders>;

export type NewOrder = { people: PeopleWithRole | null } & Omit<
  Order,
  "id" | "peopleId" | "done" | "createdAt"
>;
