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

  const accessRequest: AccessRequest | undefined = await createNewAccessRequest(
    AccessRequestRepositoryImpl,
    {
      userId,
    },
  );

  return NextResponse.json(accessRequest, { status: 201 });
});
