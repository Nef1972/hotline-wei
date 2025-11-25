import { Item, NewItem } from "@/lib/api/domain/entity/Item";

export interface ItemRepository {
  findAllByItemCategoryId: (itemCategoryId: number) => Promise<Item[]>;
  create: (newItem: NewItem) => Promise<Item>;
}
