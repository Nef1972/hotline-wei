import { PeopleRepository } from "@/lib/api/domain/repositories/PeopleRepository";
import { NotFoundError } from "@/lib/api/shared/errors/NotFoundError";
import { PeopleWithRole } from "@/lib/api/domain/entities/People";

export const getPeopleMatchingWithAnUser = async (
  repo: PeopleRepository,
  params: { userId: string },
): Promise<PeopleWithRole> => {
  const people = await repo.findWithRolesByUserId(params.userId);

  if (!people) {
    throw new NotFoundError("Profil introuvable pour cet utilisateur.");
  }

  return people;
};
