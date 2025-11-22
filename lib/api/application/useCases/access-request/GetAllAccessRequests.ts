import { AccessRequestRepository } from "@/lib/api/domain/repository/AccessRequestRepository";
import { AccessRequestWithPeople } from "@/lib/api/domain/entity/AccessRequest";

export const getAllActiveAccessRequests = async (
  repo: AccessRequestRepository,
): Promise<AccessRequestWithPeople[]> => repo.findAll({ done: false });
