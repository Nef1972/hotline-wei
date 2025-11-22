import { OrderWithPeople } from "@/lib/api/domain/entity/Order";
import { OrderWithPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { PeopleHttpMapper } from "@/lib/api/http/people/PeopleHttpMapper";

export class OrderHttpMapper {
  static toOrderWithPeopleResponseDto(
    order: OrderWithPeople,
  ): OrderWithPeopleResponseDto {
    return {
      id: order.id,
      peopleId: order.peopleId,
      description: order.description,
      deliverTime: order.deliverTime,
      done: order.done,
      createdAt: order.createdAt,
      deleted: order.deleted,
      people: PeopleHttpMapper.toPeopleResponseDto(order.people),
    };
  }

  static toOrderWithPeopleResponseDtoList(
    orders: OrderWithPeople[],
  ): OrderWithPeopleResponseDto[] {
    return orders.map(this.toOrderWithPeopleResponseDto);
  }
}
