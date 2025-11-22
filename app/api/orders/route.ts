import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { Order } from "@/lib/api/domain/entities/Order";
import { createNewOrder } from "@/lib/api/application/useCases/orders/CreateNewOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repositories/OrderRepositoryImpl";
import { getAllActiveOrdersWithCreator } from "@/lib/api/application/useCases/orders/GetAllActiveOrdersWithCreator";
import { parseBooleanParam } from "@/lib/utils/QueryUtils";

export const GET = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const url = new URL(req.url);
  const deleted = parseBooleanParam(url.searchParams.get("deleted"));
  const done = parseBooleanParam(url.searchParams.get("done"));

  const orders: Order[] = await getAllActiveOrdersWithCreator(
    OrderRepositoryImpl,
    {
      deleted,
      done,
    },
  );

  return NextResponse.json(orders, { status: 200 });
});

export const POST = controller(async (req: Request) => {
  const userId = await authenticateUserOrReject();

  const body = await req.json();

  const order = await createNewOrder(OrderRepositoryImpl, {
    userId,
    newOrder: body,
  });

  return NextResponse.json(order, { status: 201 });
});
