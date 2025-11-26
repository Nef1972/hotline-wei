import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { ItemCategoryRepository } from "@/lib/api/domain/repository/ItemCategoryRepository";

export const deleteAnItemCategory = async (
  repo: ItemCategoryRepository,
  params: { id: string },
) => {
  const parsed = idSchema.safeParse(params.id);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  await repo.delete(parsed.data);
};
