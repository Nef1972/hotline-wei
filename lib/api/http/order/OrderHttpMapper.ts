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
      itemId: order.itemId,
      createdAt: order.createdAt,
      deliverTime: order.deliverTime,
      status: order.status,
      people: PeopleHttpMapper.toPeopleResponseDto(order.people),
      item: order.item,
    };
  }

  static toOrderWithPeopleResponseDtoList(
    orders: OrderWithItemAndPeople[],
  ): OrderWithItemAndPeopleResponseDto[] {
    return orders.map(this.toOrderWithPeopleResponseDto);
  }
}
