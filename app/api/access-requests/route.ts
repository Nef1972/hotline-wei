import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { getAllActiveAccessRequests } from "@/lib/api/application/useCases/access-request/GetAllAccessRequests";
import { AccessRequestRepositoryImpl } from "@/lib/api/infrastructure/repository/AccessRequestRepositoryImpl";
import { createNewAccessRequest } from "@/lib/api/application/useCases/access-request/CreateNewAccessRequest";
import { controller } from "@/lib/api/shared/http/controller";
import {
  AccessRequest,
  AccessRequestWithPeople,
} from "@/lib/api/domain/entity/AccessRequest";
import { AccessRequestHttpMapper } from "@/lib/api/http/access-request/AccessRequestHttpMapper";
import env from "@/lib/utils/env";
import { sendAnAccessRequestEmailToAdmins } from "@/lib/api/application/useCases/email/SendAnAccessRequestEmailToAdmins";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";

export const GET = controller(async () => {
  await authenticateUserOrReject();

  const activeAccessRequests: AccessRequestWithPeople[] =
    await getAllActiveAccessRequests(AccessRequestRepositoryImpl);

  return NextResponse.json(
    AccessRequestHttpMapper.toAccessRequestWithPeopleResponseDtoList(
      activeAccessRequests,
    ),
    { status: 200 },
  );
});

export const POST = controller(async () => {
  const userId = await authenticateUserOrReject();

  const accessRequest: AccessRequest = await createNewAccessRequest(
    AccessRequestRepositoryImpl,
    {
      userId,
    },
  );

  const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
    userId,
  });

  if (env.resend.activated)
    await sendAnAccessRequestEmailToAdmins(PeopleRepositoryImpl, {
      people,
      accessRequest,
    });

  return NextResponse.json(accessRequest, { status: 201 });
});
