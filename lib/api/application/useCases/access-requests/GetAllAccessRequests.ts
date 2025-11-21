import { AccessRequestRepository } from "@/lib/api/domain/repositories/AccessRequestRepository";
import { AccessRequestWithPeople } from "@/lib/api/domain/entities/AccessRequest";

export const getAllActiveAccessRequests = async (
  repo: AccessRequestRepository,
): Promise<AccessRequestWithPeople[]> => repo.findAll({ done: false });
