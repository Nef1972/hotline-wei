import { NextResponse } from "next/server";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { PeopleHttpMapper } from "@/lib/api/http/people/PeopleHttpMapper";

export const GET = controller(async () => {
  const userId = await authenticateUserOrReject();
  const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
    userId,
  });

  return NextResponse.json(
    PeopleHttpMapper.toPeopleWithRoleResponseDto(people),
    { status: 200 },
  );
});
