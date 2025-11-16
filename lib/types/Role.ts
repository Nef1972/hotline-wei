import { roles } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Role = InferSelectModel<typeof roles>;
