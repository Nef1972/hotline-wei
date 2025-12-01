import { OrderWithItemAndPeople } from "@/lib/api/domain/entity/Order";
import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { filterOrderSchema } from "@/lib/schemas/order/filterOrderSchema";

export const getAllActiveOrdersWithCreator = async (
  repo: OrderRepository,
  params?: {
    statuses?: string | undefined;
    peopleId?: string | undefined;
    operatorId?: string | undefined;
  },
): Promise<OrderWithItemAndPeople[]> => {
  const parsed = filterOrderSchema.safeParse(params);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.findAll({
    statuses: parsed.data.statuses,
    peopleId: parsed.data.peopleId,
    operatorId: parsed.data.operatorId,
  });
};
