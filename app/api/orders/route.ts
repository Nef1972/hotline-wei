import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { Order, OrderWithItemAndPeople } from "@/lib/api/domain/entity/Order";
import { createNewOrder } from "@/lib/api/application/useCases/order/CreateNewOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repository/OrderRepositoryImpl";
import { getAllActiveOrdersWithCreator } from "@/lib/api/application/useCases/order/GetAllActiveOrdersWithCreator";
import { OrderHttpMapper } from "@/lib/api/http/order/OrderHttpMapper";
import env from "@/lib/utils/env";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { ItemRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemRepositoryImpl";
import { sendAnOrderCreatedEmailToAdmins } from "@/lib/api/application/useCases/email/SendAnOrderCreatedEmailToAdmins";

export const GET = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const url = new URL(req.url);
  const statuses = url.searchParams.get("statuses") ?? undefined;
  const peopleId = url.searchParams.get("peopleId") ?? undefined;
  const operatorId = url.searchParams.get("operatorId") ?? undefined;

  const orders: OrderWithItemAndPeople[] = await getAllActiveOrdersWithCreator(
    OrderRepositoryImpl,
    {
      statuses,
      peopleId,
      operatorId,
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

  const order: Order = await createNewOrder(OrderRepositoryImpl, {
    userId,
    newOrder: body,
  });

  if (env.resend.activated) {
    const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
      userId,
    });

    await sendAnOrderCreatedEmailToAdmins(
      PeopleRepositoryImpl,
      ItemRepositoryImpl,
      {
        people,
        order,
      },
    );
  }

  return NextResponse.json(order, { status: 201 });
});
