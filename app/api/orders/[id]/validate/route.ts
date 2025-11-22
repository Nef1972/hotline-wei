import { controller } from "@/lib/api/shared/http/controller";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { validateAnOrder } from "@/lib/api/application/useCases/order/ValidateAnOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repository/OrderRepositoryImpl";
import { NextResponse } from "next/server";

export const PUT = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;
    await validateAnOrder(OrderRepositoryImpl, { id });

    return NextResponse.json({ status: 200 });
  },
);
