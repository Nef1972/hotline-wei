import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { Order, OrderWithPeople } from "@/lib/api/domain/entity/Order";
import { createNewOrder } from "@/lib/api/application/useCases/order/CreateNewOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repository/OrderRepositoryImpl";
import { getAllActiveOrdersWithCreator } from "@/lib/api/application/useCases/order/GetAllActiveOrdersWithCreator";
import { parseBooleanParam } from "@/lib/utils/QueryUtils";
import { OrderHttpMapper } from "@/lib/api/http/order/OrderHttpMapper";

export const GET = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const url = new URL(req.url);
  const deleted = parseBooleanParam(url.searchParams.get("deleted"));
  const done = parseBooleanParam(url.searchParams.get("done"));

  const orders: OrderWithPeople[] = await getAllActiveOrdersWithCreator(
    OrderRepositoryImpl,
    {
      deleted,
      done,
    },
  );

  return NextResponse.json(
    OrderHttpMapper.toOrderWithPeopleResponseDtoList(orders),
    { status: 200 },
  );
});

export const POST = controller(async (req: Request) => {
  const userId = await authenticateUserOrReject();

  const body = await req.json();

  const order: Order | undefined = await createNewOrder(OrderRepositoryImpl, {
    userId,
    newOrder: body,
  });

  return NextResponse.json(order, { status: 201 });
});
