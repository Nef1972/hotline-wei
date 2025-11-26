import {
  ItemCategory,
  ItemCategoryWithItems,
  NewItemCategory,
} from "@/lib/api/domain/entity/ItemCategory";

export interface ItemCategoryRepository {
  findAll: () => Promise<ItemCategory[]>;
  findAllWithAvailableItems: () => Promise<ItemCategoryWithItems[]>;
  findById: (id: number) => Promise<ItemCategory | undefined>;
  create: (newItemCategory: NewItemCategory) => Promise<ItemCategory>;
  delete: (id: number) => Promise<void>;
}
