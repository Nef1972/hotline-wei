import { controller } from "@/lib/api/shared/http/controller";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { validateAnOrder } from "@/lib/api/application/useCases/order/ValidateAnOrder";
import { OrderRepositoryImpl } from "@/lib/api/infrastructure/repository/OrderRepositoryImpl";
import { NextResponse } from "next/server";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";

export const PATCH = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const userId = await authenticateUserOrReject();

    const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
      userId,
    });

    const { id } = await params;
    await validateAnOrder(OrderRepositoryImpl, { id, people });

    return NextResponse.json({ status: 200 });
  },
);
