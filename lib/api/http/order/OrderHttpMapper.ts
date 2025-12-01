import { OrderWithItemAndPeople } from "@/lib/api/domain/entity/Order";
import { OrderWithItemAndPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { PeopleHttpMapper } from "@/lib/api/http/people/PeopleHttpMapper";

export class OrderHttpMapper {
  static toOrderWithPeopleResponseDto(
    order: OrderWithItemAndPeople,
  ): OrderWithItemAndPeopleResponseDto {
    return {
      id: order.id,
      peopleId: order.peopleId,
      operatorId: order.operatorId,
      itemId: order.itemId,
      createdAt: order.createdAt,
      deliverTime: order.deliverTime,
      deliverPlace: order.deliverPlace,
      status: order.status,
      people: PeopleHttpMapper.toPeopleResponseDto(order.people),
      operator: order.operator
        ? PeopleHttpMapper.toPeopleResponseDto(order.operator)
        : null,
      item: order.item,
    };
  }

  static toOrderWithPeopleResponseDtoList(
    orders: OrderWithItemAndPeople[],
  ): OrderWithItemAndPeopleResponseDto[] {
    return orders.map(this.toOrderWithPeopleResponseDto);
  }
}
