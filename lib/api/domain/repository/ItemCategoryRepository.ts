import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";

export interface ItemCategoryRepository {
  findAll: (params?: {
    itemAvailable?: boolean;
  }) => Promise<ItemCategoryWithItems[]>;
}
