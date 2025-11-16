import { peoples } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type People = InferSelectModel<typeof peoples>;
