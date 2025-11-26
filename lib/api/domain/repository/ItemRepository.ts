import { Item, NewItem } from "@/lib/api/domain/entity/Item";

export interface ItemRepository {
  findAllAvailableByItemCategoryId: (itemCategoryId: number) => Promise<Item[]>;
  create: (newItem: NewItem) => Promise<Item>;
  update: (id: number, item: Partial<Item>) => Promise<Item>;
}
