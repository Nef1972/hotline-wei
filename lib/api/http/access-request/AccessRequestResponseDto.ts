import { PeopleResponseDto } from "@/lib/api/http/people/PeopleResponseDto";
import { AccessRequest } from "@/lib/api/domain/entity/AccessRequest";

export type AccessRequestWithPeopleResponseDto = AccessRequest & {
  people: PeopleResponseDto;
};
