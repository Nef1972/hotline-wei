import { NewOrder, Order } from "@/lib/api/domain/entity/Order";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";

export const createNewOrder = async (
  repo: OrderRepository,
  params: { userId: string; newOrder: NewOrder },
): Promise<Order | undefined> => {
  const parsed = createOrderSchema.safeParse(params.newOrder);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  return repo.create(params.userId, parsed.data);
};
