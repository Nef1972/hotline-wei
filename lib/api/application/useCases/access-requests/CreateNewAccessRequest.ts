import { AccessRequestRepository } from "@/lib/api/domain/repositories/AccessRequestRepository";
import { AccessRequest } from "@/lib/api/domain/entities/AccessRequest";

export const createNewAccessRequest = async (
  repo: AccessRequestRepository,
  params: { userId: string },
): Promise<AccessRequest | undefined> => repo.create(params.userId);
