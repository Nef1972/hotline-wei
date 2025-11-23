import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { availableSchema } from "@/lib/schemas/item/availableSchema";

export const getAllItemCategories = async (
  repo: ItemCategoryRepository,
  params?: { itemAvailable?: boolean },
): Promise<ItemCategoryWithItems[]> => {
  const parsed = availableSchema.safeParse({
    itemAvailable: params?.itemAvailable,
  });

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.findAll(parsed.data);
};
