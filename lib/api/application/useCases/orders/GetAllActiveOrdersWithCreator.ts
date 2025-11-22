import { OrderWithPeople } from "@/lib/api/domain/entities/Order";
import { OrderRepository } from "@/lib/api/domain/repositories/OrderRepository";

export const getAllActiveOrdersWithCreator = async (
  repo: OrderRepository,
  params?: { deleted?: boolean; done?: boolean },
): Promise<OrderWithPeople[]> =>
  repo.findAll({
    deleted: params?.deleted,
    done: params?.done,
  });
