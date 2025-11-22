import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repositories/OrderRepositoryImpl";
import { deleteAnOrder } from "@/lib/api/application/useCases/orders/DeleteAnOrder";

export const DELETE = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;
    await deleteAnOrder(OrderRepositoryImpl, { id });

    return NextResponse.json({ status: 200 });
  },
);
