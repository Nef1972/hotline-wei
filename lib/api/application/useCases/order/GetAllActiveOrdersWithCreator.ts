import { OrderWithItemAndPeople } from "@/lib/api/domain/entity/Order";
import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { statusesSchema } from "@/lib/schemas/order/statusSchema";
import { joinZodErrors } from "@/lib/utils/StringUtils";

export const getAllActiveOrdersWithCreator = async (
  repo: OrderRepository,
  params?: { statuses?: string | undefined },
): Promise<OrderWithItemAndPeople[]> => {
  const parsed = statusesSchema.safeParse(params?.statuses);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.findAll({
    statuses: parsed.data,
  });
};
