import { OrderWithPeople } from "@/lib/api/domain/entity/Order";
import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";

export const getAllActiveOrdersWithCreator = async (
  repo: OrderRepository,
  params?: { deleted?: boolean; done?: boolean },
): Promise<OrderWithPeople[]> =>
  repo.findAll({
    deleted: params?.deleted,
    done: params?.done,
  });
