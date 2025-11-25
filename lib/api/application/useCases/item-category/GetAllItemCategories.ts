import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

export const getAllItemCategories = async (
  repo: ItemCategoryRepository,
): Promise<ItemCategory[]> => repo.findAll();
