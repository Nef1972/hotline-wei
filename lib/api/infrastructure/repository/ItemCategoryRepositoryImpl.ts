import { database } from "@/lib/db";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { eq } from "drizzle-orm";
import { items } from "@/lib/db/schema";

export const ItemCategoryRepositoryImpl: ItemCategoryRepository = {
  findAll: async (params?: {
    itemAvailable?: boolean;
  }): Promise<ItemCategoryWithItems[]> =>
    await database.query.itemCategories.findMany({
      with: {
        items: {
          where:
            params?.itemAvailable !== undefined
              ? eq(items.available, params.itemAvailable)
              : undefined,
        },
      },
    }),
};
