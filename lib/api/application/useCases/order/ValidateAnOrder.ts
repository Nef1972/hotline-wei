import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { PeopleWithRole } from "@/lib/api/domain/entity/People";

export const validateAnOrder = async (
  repo: OrderRepository,
  params: { id: string; people: PeopleWithRole },
) => {
  const parsed = idSchema.safeParse(params.id);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  await repo.update(parsed.data, {
    status: "DONE",
    operatorId: params.people.id,
  });
};
