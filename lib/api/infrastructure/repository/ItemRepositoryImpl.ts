import { database } from "@/lib/db";
import { Item } from "@/lib/api/domain/entity/Item";
import { eq } from "drizzle-orm";
import { items } from "@/lib/db/schema";
import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";

export const ItemRepositoryImpl: ItemRepository = {
  findAllByItemCategoryId: async (itemCategoryId: number): Promise<Item[]> =>
    await database.query.items.findMany({
      where: eq(items.itemCategoryId, itemCategoryId),
    }),
};
