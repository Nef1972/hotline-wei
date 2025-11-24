import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { ClerkJwt, decodeToken } from "@/lib/utils/TokenUtils";

export const getPeopleMatchingWithAnUserOrCreateIt = async (
  repo: PeopleRepository,
  params: { userId: string; token: string },
) => {
  const people = await repo.findByUserId(params.userId);

  if (!people) {
    const claims: ClerkJwt = decodeToken(params.token);

    await repo.create({
      userId: params.userId,
      firstName: claims.first_name ?? `User ${Date.now()}`,
      lastName: claims.last_name ?? "",
      email: claims.email ?? "",
    });
  }
};
