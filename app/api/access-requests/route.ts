import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { accessRequests, peoples } from "@/lib/db/schema";
import { NEED_TO_BE_AUTHENTICATED } from "@/lib/constants/ResponseConstant";
import { eq } from "drizzle-orm";
import { AccessRequestWithPeople } from "@/lib/types/AccessRequest";
import { People } from "@/lib/types/People";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const allAccessRequest: AccessRequestWithPeople[] =
    await database.query.accessRequests.findMany({
      where: eq(accessRequests.done, false),
      with: { people: true },
    });

  return NextResponse.json(allAccessRequest, { status: 200 });
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const [accessRequest] = await database.transaction(async (tx) => {
    const people: People | undefined = await tx.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
    });

    return tx
      .insert(accessRequests)
      .values({ peopleId: people!.id })
      .returning();
  });

  return NextResponse.json(accessRequest, { status: 201 });
}
