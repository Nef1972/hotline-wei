import { NextResponse } from "next/server";
import { controller } from "@/lib/api/shared/http/controller";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { checkIfAccessRequestIsProcessingForUser } from "@/lib/api/application/useCases/access-request/CheckIfAccessRequestIsProcessingForUser";
import { AccessRequestRepositoryImpl } from "@/lib/api/infrastructure/repository/AccessRequestRepositoryImpl";

export const GET = controller(async () => {
  const userId = await authenticateUserOrReject();

  const isAccessRequestProcessing: boolean =
    await checkIfAccessRequestIsProcessingForUser(AccessRequestRepositoryImpl, {
      userId,
    });

  return NextResponse.json(isAccessRequestProcessing, { status: 200 });
});
