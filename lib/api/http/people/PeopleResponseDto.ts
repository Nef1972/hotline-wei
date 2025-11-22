import {
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entity/People";

export type PeopleResponseDto = Omit<People, "userId">;
export type PeopleWithRoleResponseDto = Omit<PeopleWithRole, "userId">;
export type PeopleWithOrdersResponseDto = Omit<PeopleWithOrders, "userId">;
