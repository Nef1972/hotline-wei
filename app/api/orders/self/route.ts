import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { getAllActiveOrdersForPeople } from "@/lib/api/application/useCases/orders/GetAllActiveOrdersForPeople";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repositories/PeopleRepositoryImpl";
import { Order } from "@/lib/api/domain/entities/Order";
import { parseBooleanParam } from "@/lib/utils/QueryUtils";

export const GET = controller(async (req: Request) => {
  const userId = await authenticateUserOrReject();

  const url = new URL(req.url);
  const orderDeleted = parseBooleanParam(url.searchParams.get("orderDeleted"));

  const orders: Order[] = await getAllActiveOrdersForPeople(
    PeopleRepositoryImpl,
    {
      userId,
      orderDeleted,
    },
  );

  return NextResponse.json(orders, { status: 200 });
});
