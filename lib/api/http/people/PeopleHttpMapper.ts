import {
  People,
  PeopleWithOrders,
  PeopleWithRole,
} from "@/lib/api/domain/entity/People";
import {
  PeopleResponseDto,
  PeopleWithOrdersResponseDto,
  PeopleWithRoleResponseDto,
} from "@/lib/api/http/people/PeopleResponseDto";

export class PeopleHttpMapper {
  static toPeopleResponseDto(people: People): PeopleResponseDto {
    return {
      id: people.id,
      firstName: people.firstName,
      lastName: people.lastName,
      email: people.email,
      roleId: people.roleId,
    };
  }

  static toPeopleResponseDtoList(peoples: People[]): PeopleResponseDto[] {
    return peoples.map(this.toPeopleResponseDto);
  }

  static toPeopleWithRoleResponseDto(
    people: PeopleWithRole,
  ): PeopleWithRoleResponseDto {
    return {
      ...this.toPeopleResponseDto(people),
      role: people.role,
    };
  }

  static toPeopleWithRoleResponseDtoList(
    peoples: PeopleWithRole[],
  ): PeopleWithRoleResponseDto[] {
    return peoples.map(this.toPeopleWithRoleResponseDto);
  }

  static toPeopleWithOrdersResponseDto(
    people: PeopleWithOrders,
  ): PeopleWithOrdersResponseDto {
    return {
      ...this.toPeopleResponseDto(people),
      orders: people.orders,
    };
  }

  static toPeopleWithOrdersResponseDtoList(
    peoples: PeopleWithOrders[],
  ): PeopleWithOrdersResponseDto[] {
    return peoples.map(this.toPeopleWithOrdersResponseDto);
  }
}
