import { database } from "@/lib/db";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { eq } from "drizzle-orm";
import { itemCategories } from "@/lib/db/schema";

export const ItemCategoryRepositoryImpl: ItemCategoryRepository = {
  findAll: async (): Promise<ItemCategory[]> =>
    await database.query.itemCategories.findMany(),
  findById: async (id: number): Promise<ItemCategory | undefined> =>
    await database.query.itemCategories.findFirst({
      where: eq(itemCategories.id, id),
    }),
};
