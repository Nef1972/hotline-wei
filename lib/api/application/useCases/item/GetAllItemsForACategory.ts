import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";
import { Item } from "@/lib/api/domain/entity/Item";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";

export const getAllItemsForACategory = async (
  repo: ItemRepository,
  params: { itemCategoryId: string },
): Promise<Item[]> => {
  const parsed = idSchema.safeParse(params.itemCategoryId);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.findAllByItemCategoryId(parsed.data);
};
