import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { decodeToken } from "@/lib/utils/TokenUtils";
import {
  ClerkClaimsSchema,
  clerkClaimsSchema,
} from "@/lib/schemas/clerk/clerkClaimsSchema";
import { z } from "zod";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";

export const getPeopleMatchingWithAnUserOrCreateIt = async (
  repo: PeopleRepository,
  params: { userId: string; token: string },
) => {
  const people = await repo.findByUserId(params.userId);

  if (!people) {
    const claims = decodeToken(params.token);

    const parseResult = clerkClaimsSchema.safeParse(claims);

    if (!parseResult.success) {
      console.error("JWT claims invalid : ", z.treeifyError(parseResult.error));
      throw new BadRequestError(
        `Invalid JWT claims : ${JSON.stringify(claims, null, 2)}`,
      );
    }

    const {
      first_name: firstName,
      last_name: lastName,
      email,
    } = parseResult.data as ClerkClaimsSchema;

    await repo.create({ userId: params.userId, firstName, lastName, email });
  }
};
