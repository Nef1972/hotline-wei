import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { getAllActiveOrdersForPeople } from "@/lib/api/application/useCases/orders/GetAllActiveOrdersForPeople";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repositories/PeopleRepositoryImpl";
import { Order } from "@/lib/api/domain/entities/Order";
import { createNewOrder } from "@/lib/api/application/useCases/orders/CreateNewOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repositories/OrderRepositoryImpl";
import { deleteAnOrder } from "@/lib/api/application/useCases/orders/DeleteAnOrder";

export const GET = controller(async (req: Request) => {
  const userId = await authenticateUserOrReject();

  const url = new URL(req.url);
  const onlyActive = url.searchParams.get("onlyActive") === "true";

  const orders: Order[] = await getAllActiveOrdersForPeople(
    PeopleRepositoryImpl,
    {
      userId,
      onlyActive,
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

export const DELETE = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  await deleteAnOrder(OrderRepositoryImpl, { id });

  return NextResponse.json({ status: 200 });
});
