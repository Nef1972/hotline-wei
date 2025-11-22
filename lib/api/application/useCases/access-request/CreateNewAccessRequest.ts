import { AccessRequestRepository } from "@/lib/api/domain/repository/AccessRequestRepository";
import { AccessRequest } from "@/lib/api/domain/entity/AccessRequest";

export const createNewAccessRequest = async (
  repo: AccessRequestRepository,
  params: { userId: string },
): Promise<AccessRequest | undefined> => repo.create(params.userId);
