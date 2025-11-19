import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createOrderSchema } from "@/lib/schemas/createOrderSchema";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { database } from "@/lib/db";
import { orders, peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { People } from "@/lib/types/People";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour effectuer cette action." },
      { status: 401 },
    );
  }

  const people: People | undefined = await database.query.peoples.findFirst({
    where: eq(peoples.userId, userId),
  });

  if (!people) {
    return NextResponse.json(
      { error: "Profil introuvable pour cet utilisateur." },
      { status: 404 },
    );
  }

  const body = await req.json();
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: joinZodErrors(parsed) }, { status: 400 });
  }

  const { description, deliverTime } = parsed.data;

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
