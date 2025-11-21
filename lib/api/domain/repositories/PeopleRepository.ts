import {
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entities/People";

export interface PeopleRepository {
  findWithRolesByUserId: (
    userId: string,
  ) => Promise<PeopleWithRole | undefined>;
  findWithOrdersByUserId: (
    userId: string,
    params: { onlyActive?: boolean },
  ) => Promise<PeopleWithOrders | undefined>;
}
