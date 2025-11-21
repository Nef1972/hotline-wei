import { AccessRequestRepository } from "@/lib/api/domain/repositories/AccessRequestRepository";

export const checkIfAccessRequestIsProcessingForUser = async (
  repo: AccessRequestRepository,
  params: { userId: string },
): Promise<boolean> => {
  const accessRequest = await repo.findByUserId(params.userId, {
    done: false,
  });

  return !!accessRequest;
};
