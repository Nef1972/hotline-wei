import { NextResponse } from "next/server";
import { controller } from "@/lib/api/shared/http/controller";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { processAccessRequest } from "@/lib/api/application/useCases/access-requests/ProcessAccessRequest";
import { AccessRequestRepositoryImpl } from "@/lib/api/infrastructure/repositories/AccessRequestRepositoryImpl";

export const POST = controller(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;
    const body = await req.json();

    await processAccessRequest(AccessRequestRepositoryImpl, {
      id,
      processAccessRequest: body,
    });

    return NextResponse.json({ status: 200 });
  },
);
