import { InferSelectModel } from "drizzle-orm";
import { items } from "@/lib/db/schema";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

export type Item = InferSelectModel<typeof items>;

export type ItemWithCategory = Item & { itemCategory: ItemCategory };
