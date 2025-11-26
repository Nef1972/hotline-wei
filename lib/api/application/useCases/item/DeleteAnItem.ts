import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";

export const deleteAnItem = async (
  repo: ItemRepository,
  params: { id: string },
) => {
  const parsed = idSchema.safeParse(params.id);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  await repo.update(parsed.data, { available: false });
};
