import { InferSelectModel } from "drizzle-orm";
import { items } from "@/lib/db/schema";

export type Item = InferSelectModel<typeof items>;
