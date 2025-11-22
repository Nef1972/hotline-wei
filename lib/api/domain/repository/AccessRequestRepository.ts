import {
  AccessRequest,
  AccessRequestWithPeople,
} from "@/lib/api/domain/entity/AccessRequest";

export interface AccessRequestRepository {
  findAll: (params?: { done?: boolean }) => Promise<AccessRequestWithPeople[]>;
  findById: (id: number) => Promise<AccessRequestWithPeople | undefined>;
  findByUserId: (
    userId: string,
    params?: { done?: boolean },
  ) => Promise<AccessRequestWithPeople | undefined>;
  create: (userId: string) => Promise<AccessRequest | undefined>;
  updateAccessRequestAndPromotePeopleIfApplicable: (
    id: number,
    peopleId: number,
    isAccepted: boolean,
  ) => Promise<void>;
}
