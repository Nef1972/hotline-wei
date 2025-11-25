import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { NotFoundError } from "@humanfs/core";

export const getACategoryForId = async (
  repo: ItemCategoryRepository,
  params: { id: string },
): Promise<ItemCategory> => {
  const parsed = idSchema.safeParse(params.id);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  const itemCategory: ItemCategory | undefined = await repo.findById(
    parsed.data,
  );

  if (!itemCategory) throw new NotFoundError("Catégorie introuvable");

  return itemCategory;
};
