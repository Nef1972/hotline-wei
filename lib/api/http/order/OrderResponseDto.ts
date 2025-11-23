import { Order } from "@/lib/api/domain/entity/Order";
import { PeopleResponseDto } from "@/lib/api/http/people/PeopleResponseDto";
import { Item } from "@/lib/api/domain/entity/Item";

export type OrderWithItemAndPeopleResponseDto = Order & {
  people: PeopleResponseDto;
  item: Item;
};
