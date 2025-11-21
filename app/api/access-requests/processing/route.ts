import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { NEED_TO_BE_AUTHENTICATED } from "@/lib/constants/ResponseConstant";
import { AccessRequestWithPeople } from "@/lib/types/AccessRequest";
import { and, eq } from "drizzle-orm";
import { People } from "@/lib/types/People";
import { accessRequests, peoples } from "@/lib/db/schema";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const people: People | undefined = await database.query.peoples.findFirst({
    where: eq(peoples.userId, userId),
  });

  const accessRequest: AccessRequestWithPeople | undefined =
    await database.query.accessRequests.findFirst({
      where: and(
        eq(accessRequests.done, false),
        eq(accessRequests.peopleId, people!.id),
      ),
      with: { people: true },
    });

  return NextResponse.json(!!accessRequest, { status: 200 });
}
