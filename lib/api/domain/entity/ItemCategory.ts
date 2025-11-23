import { InferSelectModel } from "drizzle-orm";
import { itemCategories } from "@/lib/db/schema";
import { Item } from "@/lib/api/domain/entity/Item";

export type ItemCategory = InferSelectModel<typeof itemCategories>;

export type ItemCategoryWithItems = ItemCategory & { items: Item[] };
