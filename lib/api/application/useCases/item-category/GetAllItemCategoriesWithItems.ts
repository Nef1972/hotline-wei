import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";

export const getAllItemCategoriesWithItems = async (
  repo: ItemCategoryRepository,
): Promise<ItemCategoryWithItems[]> => repo.findAllWithItems();
