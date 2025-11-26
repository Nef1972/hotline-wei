import {BadRequestError} from "@/lib/api/shared/errors/BadRequestError";
import {joinZodErrors} from "@/lib/utils/StringUtils";
import {ItemRepository} from "@/lib/api/domain/repository/ItemRepository";
import {pictureUrlSchema} from "@/lib/schemas/item/pictureUrlSchema";
import {Item} from "@/lib/api/domain/entity/Item";

export const updateAnItemPictureUrl = async (
  repo: ItemRepository,
  params: { id: string; pictureUrl: string },
): Promise<Item> => {
  const parsed = pictureUrlSchema.safeParse(params);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.update(parsed.data.id, { pictureUrl: parsed.data.pictureUrl });
};
