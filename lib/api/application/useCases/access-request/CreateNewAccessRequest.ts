import { AccessRequestRepository } from "@/lib/api/domain/repository/AccessRequestRepository";
import { AccessRequest } from "@/lib/api/domain/entity/AccessRequest";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";

export const createNewAccessRequest = async (
  repo: AccessRequestRepository,
  params: { userId: string },
): Promise<AccessRequest> => {
  const accessRequest = await repo.create(params.userId);

  if (!accessRequest)
    throw new BadRequestError("Impossible de créer la demande d'accès.");

  return accessRequest;
};
