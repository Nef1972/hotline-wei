import { database } from "@/lib/db";
import { Item, NewItem } from "@/lib/api/domain/entity/Item";
import { and, eq } from "drizzle-orm";
import { items } from "@/lib/db/schema";
import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";

export const ItemRepositoryImpl: ItemRepository = {
  findAllAvailableByItemCategoryId: async (
    itemCategoryId: number,
  ): Promise<Item[]> =>
    await database.query.items.findMany({
      where: and(
        eq(items.itemCategoryId, itemCategoryId),
        eq(items.available, true),
      ),
    }),
  create: async (newItem: NewItem): Promise<Item> => {
    const [item] = await database.insert(items).values(newItem).returning();
    return item;
  },
  update: async (id: number, item: Partial<Item>): Promise<Item> => {
    const [updatedItem] = await database
      .update(items)
      .set(item)
      .where(eq(items.id, id))
      .returning();
    return updatedItem;
  },
};
