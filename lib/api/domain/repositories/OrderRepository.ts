import { NewOrder, Order } from "@/lib/api/domain/entities/Order";

export interface OrderRepository {
  create: (userId: string, newOrder: NewOrder) => Promise<Order | undefined>;
  update: (id: number, order: Partial<Order>) => Promise<Order>;
}
