import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { database } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { orders, peoples, roles } from "@/lib/db/schema";
import {
  NewPeople,
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entity/People";
import { Status } from "@/lib/api/domain/entity/Order";
import { inArray } from "drizzle-orm/sql/expressions/conditions";

export const PeopleRepositoryImpl: PeopleRepository = {
  findAllByRolePermissions: async (params?: {
    hasAccess?: boolean;
    hasFullAccess?: boolean;
  }): Promise<People[]> => {
    const conditions = [];

    if (params?.hasAccess !== undefined) {
      conditions.push(eq(roles.hasAccess, params.hasAccess));
    }

    if (params?.hasFullAccess !== undefined) {
      conditions.push(eq(roles.hasFullAccess, params.hasFullAccess));
    }

    const peoplesAndRole = await database
      .select()
      .from(peoples)
      .leftJoin(roles, eq(peoples.roleId, roles.id))
      .where(conditions.length ? and(...conditions) : undefined);

    return peoplesAndRole.map((peopleAndRole) => peopleAndRole.peoples);
  },
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
    params?: { orderStatuses?: Status[] },
  ): Promise<PeopleWithOrders | undefined> =>
    database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: {
        orders: {
          where:
            params?.orderStatuses && params.orderStatuses.length > 0
              ? inArray(orders.status, params.orderStatuses)
              : undefined,
          with: { item: true },
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
