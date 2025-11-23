import {
  NewOrder,
  Order,
  OrderWithItemAndPeople,
  Status,
} from "@/lib/api/domain/entity/Order";

export interface OrderRepository {
  findAll: (params?: {
    statuses?: Status[];
  }) => Promise<OrderWithItemAndPeople[]>;
  create: (userId: string, newOrder: NewOrder) => Promise<Order | undefined>;
  update: (id: number, order: Partial<Order>) => Promise<Order>;
}
