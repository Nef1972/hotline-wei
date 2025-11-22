import {
  NewOrder,
  Order,
  OrderWithPeople,
} from "@/lib/api/domain/entity/Order";

export interface OrderRepository {
  findAll: (params?: {
    deleted?: boolean;
    done?: boolean;
  }) => Promise<OrderWithPeople[]>;
  create: (userId: string, newOrder: NewOrder) => Promise<Order | undefined>;
  update: (id: number, order: Partial<Order>) => Promise<Order>;
}
