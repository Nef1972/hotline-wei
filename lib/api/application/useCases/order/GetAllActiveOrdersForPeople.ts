import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { Order } from "@/lib/api/domain/entity/Order";
import { statusesSchema } from "@/lib/schemas/order/statusSchema";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";

export const getAllActiveOrdersForPeople = async (
  repo: PeopleRepository,
  params: { userId: string; orderStatuses?: string },
): Promise<Order[]> => {
  const parsed = statusesSchema.safeParse(params.orderStatuses);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  console.log(params, parsed.data);

  const peopleWithOrders = await repo.findWithOrdersByUserId(params.userId, {
    orderStatuses: parsed.data,
  });

  return peopleWithOrders?.orders ?? [];
};
