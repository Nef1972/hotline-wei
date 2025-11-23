import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { getAllActiveOrdersForPeople } from "@/lib/api/application/useCases/order/GetAllActiveOrdersForPeople";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";
import { OrderWithItem } from "@/lib/api/domain/entity/Order";

export const GET = controller(async (req: Request) => {
  const userId = await authenticateUserOrReject();

  const url = new URL(req.url);
  const orderStatuses = url.searchParams.get("orderStatuses") ?? undefined;

  const orders: OrderWithItem[] = await getAllActiveOrdersForPeople(
    PeopleRepositoryImpl,
    {
      userId,
      orderStatuses,
    },
  );

  return NextResponse.json(orders, { status: 200 });
});
