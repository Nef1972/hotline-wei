import { PeopleRepository } from "@/lib/api/domain/repositories/PeopleRepository";
import { Order } from "@/lib/api/domain/entities/Order";

export const getAllActiveOrdersForPeople = async (
  repo: PeopleRepository,
  params: { userId: string; onlyActive?: boolean },
): Promise<Order[]> => {
  const peopleWithOrders = await repo.findWithOrdersByUserId(params.userId, {
    onlyActive: params.onlyActive,
  });

  return peopleWithOrders?.orders ?? [];
};
