import { PeopleRepository } from "@/lib/api/domain/repositories/PeopleRepository";
import { Order } from "@/lib/api/domain/entities/Order";

export const getAllActiveOrdersForPeople = async (
  repo: PeopleRepository,
  params: { userId: string; orderDeleted?: boolean },
): Promise<Order[]> => {
  const peopleWithOrders = await repo.findWithOrdersByUserId(params.userId, {
    orderDeleted: params.orderDeleted,
  });

  return peopleWithOrders?.orders ?? [];
};
