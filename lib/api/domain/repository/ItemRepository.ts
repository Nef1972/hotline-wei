import { Item, NewItem } from "@/lib/api/domain/entity/Item";

export interface ItemRepository {
  findAllAvailableByItemCategoryId: (itemCategoryId: number) => Promise<Item[]>;
  findById: (id: number) => Promise<Item | undefined>;
  create: (newItem: NewItem) => Promise<Item>;
  update: (id: number, item: Partial<Item>) => Promise<Item>;
}
