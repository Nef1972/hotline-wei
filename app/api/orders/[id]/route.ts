import { NextResponse } from "next/server";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repository/OrderRepositoryImpl";
import { deleteAnOrder } from "@/lib/api/application/useCases/order/DeleteAnOrder";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";

export const DELETE = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const userId = await authenticateUserOrReject();

    const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
      userId,
    });

    const { id } = await params;
    await deleteAnOrder(OrderRepositoryImpl, { id, people });

    return NextResponse.json({ status: 200 });
  },
);
