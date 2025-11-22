import { Order } from "@/lib/api/domain/entity/Order";
import { PeopleResponseDto } from "@/lib/api/http/people/PeopleResponseDto";

export type OrderWithPeopleResponseDto = Order & { people: PeopleResponseDto };
