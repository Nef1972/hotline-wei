import { NextResponse } from "next/server";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/peoples/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repositories/PeopleRepositoryImpl";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";

export const GET = controller(async () => {
  const userId = await authenticateUserOrReject();
  const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
    userId,
  });
  return NextResponse.json(people, { status: 200 });
});
