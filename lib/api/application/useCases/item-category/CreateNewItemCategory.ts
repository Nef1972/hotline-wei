import { joinZodErrors } from "@/lib/utils/StringUtils";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import {
  ItemCategory,
  NewItemCategory,
} from "@/lib/api/domain/entity/ItemCategory";
import { createItemCategorySchema } from "@/lib/schemas/item-category/createItemCategorySchema";

export const createNewItemCategory = async (
  repo: ItemCategoryRepository,
  params: { newItemCategory: NewItemCategory },
): Promise<ItemCategory | undefined> => {
  const parsed = createItemCategorySchema.safeParse(params.newItemCategory);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.create(parsed.data);
};
