import { Item } from "@/lib/api/domain/entity/Item";

export interface ItemRepository {
  findAllByItemCategoryId: (itemCategoryId: number) => Promise<Item[]>;
}
