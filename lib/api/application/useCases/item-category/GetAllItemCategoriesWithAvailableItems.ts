import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";

export const getAllItemCategoriesWithAvailableItems = async (
  repo: ItemCategoryRepository,
): Promise<ItemCategoryWithItems[]> => repo.findAllWithAvailableItems();
