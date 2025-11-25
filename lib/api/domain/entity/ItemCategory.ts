import { InferSelectModel } from "drizzle-orm";
import { itemCategories } from "@/lib/db/schema";
import { Item } from "@/lib/api/domain/entity/Item";
import { z } from "zod";
import { createItemCategorySchema } from "@/lib/schemas/item-category/createItemCategorySchema";

export type ItemCategory = InferSelectModel<typeof itemCategories>;

export type ItemCategoryWithItems = ItemCategory & { items: Item[] };

export type NewItemCategory = z.infer<typeof createItemCategorySchema>;
