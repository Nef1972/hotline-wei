import { PeopleRepository } from "@/lib/api/domain/repositories/PeopleRepository";
import { database } from "@/lib/db";
import { eq } from "drizzle-orm";
import { orders, peoples } from "@/lib/db/schema";
import {
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entities/People";

export const PeopleRepositoryImpl: PeopleRepository = {
  findWithRolesByUserId: async (
    userId: string,
  ): Promise<PeopleWithRole | undefined> => {
    return database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: { role: true },
    });
  },

  findWithOrdersByUserId: async (
    userId: string,
    params: { onlyActive?: boolean },
  ): Promise<PeopleWithOrders | undefined> => {
    return database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: {
        orders: params.onlyActive
          ? {
              where: eq(orders.deleted, false),
            }
          : true,
      },
    });
  },
};
