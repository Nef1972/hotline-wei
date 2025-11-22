import {
  NewPeople,
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entities/People";

export interface PeopleRepository {
  findByUserId: (userId: string) => Promise<People | undefined>;
  findWithRolesByUserId: (
    userId: string,
  ) => Promise<PeopleWithRole | undefined>;
  findWithOrdersByUserId: (
    userId: string,
    params?: { orderDeleted?: boolean },
  ) => Promise<PeopleWithOrders | undefined>;
  create: (people: NewPeople) => Promise<People | undefined>;
}
