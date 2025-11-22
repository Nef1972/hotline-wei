import { PeopleHttpMapper } from "@/lib/api/http/people/PeopleHttpMapper";
import { AccessRequestWithPeople } from "@/lib/api/domain/entity/AccessRequest";
import { AccessRequestWithPeopleResponseDto } from "@/lib/api/http/access-request/AccessRequestResponseDto";

export class AccessRequestHttpMapper {
  static toAccessRequestWithPeopleResponseDto(
    accessRequest: AccessRequestWithPeople,
  ): AccessRequestWithPeopleResponseDto {
    return {
      id: accessRequest.id,
      peopleId: accessRequest.peopleId,
      createdAt: accessRequest.createdAt,
      done: accessRequest.done,
      people: PeopleHttpMapper.toPeopleResponseDto(accessRequest.people),
    };
  }

  static toAccessRequestWithPeopleResponseDtoList(
    accessRequests: AccessRequestWithPeople[],
  ): AccessRequestWithPeopleResponseDto[] {
    return accessRequests.map(this.toAccessRequestWithPeopleResponseDto);
  }
}
