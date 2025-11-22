import { database } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { orders, peoples } from "@/lib/db/schema";
import {
  NewOrder,
  Order,
  OrderWithPeople,
} from "@/lib/api/domain/entity/Order";
import { OrderRepository } from "@/lib/api/domain/repository/OrderRepository";
import { People } from "@/lib/api/domain/entity/People";

export const OrderRepositoryImpl: OrderRepository = {
  findAll: async (params?: {
    deleted?: boolean;
    done?: boolean;
  }): Promise<OrderWithPeople[]> =>
    await database.query.orders.findMany({
      where: and(
        params?.deleted !== undefined
          ? eq(orders.deleted, params.deleted)
          : undefined,
        params?.done !== undefined ? eq(orders.done, params.done) : undefined,
      ),
      with: { people: true },
    }),

  create: async (
    userId: string,
    newOrder: NewOrder,
  ): Promise<Order | undefined> => {
    const [order] = await database.transaction(async (tx) => {
      const people: People | undefined = await tx.query.peoples.findFirst({
        where: eq(peoples.userId, userId),
      });

      return tx
        .insert(orders)
        .values({
          peopleId: people!.id,
          description: newOrder.description,
          deliverTime: newOrder.deliverTime,
        })
        .returning();
    });
    return order;
  },

  update: async (id: number, order: Partial<Order>): Promise<Order> => {
    const [updatedOrder] = await database
      .update(orders)
      .set(order)
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  },
};
