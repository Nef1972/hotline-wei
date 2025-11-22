import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { Order } from "@/lib/api/domain/entity/Order";

export const getAllActiveOrdersForPeople = async (
  repo: PeopleRepository,
  params: { userId: string; orderDeleted?: boolean },
): Promise<Order[]> => {
  const peopleWithOrders = await repo.findWithOrdersByUserId(params.userId, {
    orderDeleted: params.orderDeleted,
  });

  return peopleWithOrders?.orders ?? [];
};
