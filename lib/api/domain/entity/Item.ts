import { InferSelectModel } from "drizzle-orm";
import { items } from "@/lib/db/schema";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { createItemSchema } from "@/lib/schemas/item/createItemSchema";
import { z } from "zod";

export type Item = InferSelectModel<typeof items>;

export type ItemWithCategory = Item & { itemCategory: ItemCategory };

export type NewItem = z.infer<typeof createItemSchema>;
