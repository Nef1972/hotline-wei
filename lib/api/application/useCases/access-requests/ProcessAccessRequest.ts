import { AccessRequestRepository } from "@/lib/api/domain/repositories/AccessRequestRepository";
import {
  AccessRequestWithPeople,
  ProcessAccessRequest,
} from "@/lib/api/domain/entities/AccessRequest";
import { processAccessRequestSchema } from "@/lib/schemas/access-requests/processAcceptRequestSchema";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { idSchema } from "@/lib/schemas/utils/idSchema";
import { NotFoundError } from "@humanfs/core";

export const processAccessRequest = async (
  repo: AccessRequestRepository,
  params: { id: string; processAccessRequest: ProcessAccessRequest },
): Promise<void> => {
  const parsedId = idSchema.safeParse(params.id);
  const parsedProcessAccessRequest = processAccessRequestSchema.safeParse(
    params.processAccessRequest,
  );

  if (!parsedId.success || !parsedProcessAccessRequest.success)
    throw new BadRequestError(
      joinZodErrors(parsedId, parsedProcessAccessRequest),
    );

  const { isAccepted } = parsedProcessAccessRequest.data;
  const id = parsedId.data;

  const accessRequest: AccessRequestWithPeople | undefined =
    await repo.findById(id);

  if (!accessRequest) throw new NotFoundError("Demande d'accès introuvable");

  await repo.updateAccessRequestAndPromotePeopleIfApplicable(
    id,
    accessRequest.people.id,
    isAccepted,
  );
};
