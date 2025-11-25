import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

export interface ItemCategoryRepository {
  findAll: () => Promise<ItemCategory[]>;
  findById: (id: number) => Promise<ItemCategory | undefined>;
}
