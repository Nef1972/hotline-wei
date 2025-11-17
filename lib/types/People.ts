import { peoples } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Role } from "@/lib/types/Role";

export type People = InferSelectModel<typeof peoples>;

export type PeopleWithRole = People & {
  role: Role;
};
