import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { database } from "@/lib/db";
import { eq } from "drizzle-orm";
import { orders, peoples } from "@/lib/db/schema";
import {
  NewPeople,
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entity/People";

export const PeopleRepositoryImpl: PeopleRepository = {
  findByUserId: async (userId: string): Promise<People | undefined> =>
    database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
    }),

  findWithRolesByUserId: async (
    userId: string,
  ): Promise<PeopleWithRole | undefined> =>
    database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: { role: true },
    }),

  findWithOrdersByUserId: async (
    userId: string,
    params?: { orderDeleted?: boolean },
  ): Promise<PeopleWithOrders | undefined> =>
    database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: {
        orders:
          params?.orderDeleted === undefined
            ? true
            : {
                where: eq(orders.deleted, params.orderDeleted),
              },
      },
    }),

  create: async (people: NewPeople): Promise<People | undefined> => {
    const [createdPeople] = await database
      .insert(peoples)
      .values(people)
      .returning();
    return createdPeople;
  },
};
