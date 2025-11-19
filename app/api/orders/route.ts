import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { database } from "@/lib/db";
import { orders, peoples } from "@/lib/db/schema";
import { NEED_TO_BE_AUTHENTICATED } from "@/lib/constants/ResponseConstant";
import { eq } from "drizzle-orm";
import { Order } from "@/lib/types/Order";
import { PeopleWithOrders } from "@/lib/types/People";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const body = await req.json();
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: joinZodErrors(parsed) }, { status: 400 });
  }

  const { people, description, deliverTime } = parsed.data;

  if (!people?.id || people?.userId != userId) return NEED_TO_BE_AUTHENTICATED;

  const [newOrder] = await database
    .insert(orders)
    .values({
      peopleId: people.id,
      description: description,
      deliverTime: deliverTime,
    })
    .returning();

  return NextResponse.json(newOrder, { status: 201 });
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const peopleWithOrders: PeopleWithOrders | undefined =
    await database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: { orders: true },
    });

  const orders: Order[] = peopleWithOrders?.orders ?? [];

  return NextResponse.json(orders, { status: 200 });
}
