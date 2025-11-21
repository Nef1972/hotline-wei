import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { getAllActiveAccessRequests } from "@/lib/api/application/useCases/access-requests/GetAllAccessRequests";
import { AccessRequestRepositoryImpl } from "@/lib/api/infrastructure/repositories/AccessRequestRepositoryImpl";
import { createNewAccessRequest } from "@/lib/api/application/useCases/access-requests/CreateNewAccessRequest";
import { controller } from "@/lib/api/shared/http/controller";

export const GET = controller(async () => {
  await authenticateUserOrReject();

  const activeAccessRequests = await getAllActiveAccessRequests(
    AccessRequestRepositoryImpl,
  );

  return NextResponse.json(activeAccessRequests, { status: 200 });
});

export const POST = controller(async () => {
  const userId = await authenticateUserOrReject();

  const accessRequest = createNewAccessRequest(AccessRequestRepositoryImpl, {
    userId,
  });

  return NextResponse.json(accessRequest, { status: 201 });
});
