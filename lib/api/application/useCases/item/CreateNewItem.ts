import { joinZodErrors } from "@/lib/utils/StringUtils";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { Item, NewItem } from "@/lib/api/domain/entity/Item";
import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";
import { createItemSchema } from "@/lib/schemas/item/createItemSchema";

export const createNewItem = async (
  repo: ItemRepository,
  params: { newItem: NewItem },
): Promise<Item | undefined> => {
  const parsed = createItemSchema.safeParse(params.newItem);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.create(parsed.data);
};
