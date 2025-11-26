import { database } from "@/lib/db";
import {
  ItemCategory,
  ItemCategoryWithItems,
  NewItemCategory,
} from "@/lib/api/domain/entity/ItemCategory";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { eq } from "drizzle-orm";
import { itemCategories } from "@/lib/db/schema";

export const ItemCategoryRepositoryImpl: ItemCategoryRepository = {
  findAll: async (): Promise<ItemCategory[]> =>
    await database.query.itemCategories.findMany(),
  findAllWithItems: async (): Promise<ItemCategoryWithItems[]> =>
    await database.query.itemCategories.findMany({
      with: { items: true },
    }),
  findById: async (id: number): Promise<ItemCategory | undefined> =>
    await database.query.itemCategories.findFirst({
      where: eq(itemCategories.id, id),
    }),
  create: async (newItemCategory: NewItemCategory): Promise<ItemCategory> => {
    const [itemCategory] = await database
      .insert(itemCategories)
      .values(newItemCategory)
      .returning();
    return itemCategory;
  },
  delete: async (id: number): Promise<void> => {
    await database.delete(itemCategories).where(eq(itemCategories.id, id));
  },
};
