import { database } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { accessRequests, peoples, roles } from "@/lib/db/schema";
import { People } from "@/lib/api/domain/entity/People";
import { AccessRequestRepository } from "@/lib/api/domain/repository/AccessRequestRepository";
import {
  AccessRequest,
  AccessRequestWithPeople,
} from "@/lib/api/domain/entity/AccessRequest";

export const AccessRequestRepositoryImpl: AccessRequestRepository = {
  findAll: async (params?: {
    done?: boolean;
  }): Promise<AccessRequestWithPeople[]> => {
    return database.query.accessRequests.findMany({
      where:
        params?.done !== undefined
          ? eq(accessRequests.done, params.done)
          : undefined,
      with: { people: true },
    });
  },

  findById: async (id: number): Promise<AccessRequestWithPeople | undefined> =>
    await database.query.accessRequests.findFirst({
      where: eq(accessRequests.id, id),
      with: { people: true },
    }),

  findByUserId: async (
    userId: string,
    params?: {
      done?: boolean;
    },
  ): Promise<AccessRequestWithPeople | undefined> =>
    await database.transaction(async (tx) => {
      const people: People | undefined = await tx.query.peoples.findFirst({
        where: eq(peoples.userId, userId),
      });

      return tx.query.accessRequests.findFirst({
        where: and(
          params?.done !== undefined
            ? eq(accessRequests.done, params.done)
            : undefined,
          eq(accessRequests.peopleId, people!.id),
        ),
        with: { people: true },
      });
    }),

  create: async (userId: string): Promise<AccessRequest | undefined> => {
    const [accessRequest] = await database.transaction(async (tx) => {
      const people: People | undefined = await tx.query.peoples.findFirst({
        where: eq(peoples.userId, userId),
      });

      return tx
        .insert(accessRequests)
        .values({ peopleId: people!.id })
        .returning();
    });
    return accessRequest;
  },

  updateAccessRequestAndPromotePeopleIfApplicable: async (
    id: number,
    peopleId: number,
    isAccepted: boolean,
  ) =>
    await database.transaction(async (tx) => {
      await tx
        .update(accessRequests)
        .set({ done: true })
        .where(eq(accessRequests.id, id));

      if (!isAccepted) return;

      const rolePeople = await tx.query.roles.findFirst({
        where: eq(roles.name, "User"),
      });

      await tx
        .update(peoples)
        .set({ roleId: rolePeople!.id })
        .where(eq(peoples.id, peopleId));
    }),
};
