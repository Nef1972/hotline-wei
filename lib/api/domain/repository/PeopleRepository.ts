import {
  NewPeople,
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entity/People";
import { Status } from "@/lib/api/domain/entity/Order";

export interface PeopleRepository {
  findAllByRolePermissions: (params?: {
    hasAccess?: boolean;
    hasFullAccess?: boolean;
    hasEmailNotifications?: boolean;
  }) => Promise<People[]>;
  findByUserId: (userId: string) => Promise<People | undefined>;
  findWithRolesByUserId: (
    userId: string,
  ) => Promise<PeopleWithRole | undefined>;
  findWithOrdersByUserId: (
    userId: string,
    params?: { orderStatuses?: Status[] },
  ) => Promise<PeopleWithOrders | undefined>;
  create: (people: NewPeople) => Promise<People | undefined>;
}
