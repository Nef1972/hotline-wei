import { createInsertSchema } from "drizzle-zod";
import { peoples } from "@/lib/db/schema";

export const createPeopleSchema = createInsertSchema(peoples);
