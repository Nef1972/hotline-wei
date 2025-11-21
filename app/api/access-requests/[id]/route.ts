import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { database } from "@/lib/db";
import { accessRequests, peoples, roles } from "@/lib/db/schema";
import { NEED_TO_BE_AUTHENTICATED } from "@/lib/constants/ResponseConstant";
import { eq } from "drizzle-orm";
import { AccessRequestWithPeople } from "@/lib/types/AccessRequest";
import { processAccessRequestSchema } from "@/lib/schemas/access-requests/processAcceptRequest";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const { id: idParam } = await params;
  const id = Number(idParam);

  const body = await req.json();
  const parsed = processAccessRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: joinZodErrors(parsed) }, { status: 400 });
  }

  const { isAccepted } = parsed.data;

  const accessRequest: AccessRequestWithPeople | undefined =
    await database.query.accessRequests.findFirst({
      where: eq(accessRequests.id, id),
      with: { people: true },
    });

  if (!accessRequest) {
    return NextResponse.json(
      { error: "Demande d'accès introuvable" },
      { status: 404 },
    );
  }

  await database.transaction(async (tx) => {
    await tx
      .update(accessRequests)
      .set({ done: true })
      .where(eq(accessRequests.id, id));

    if (!isAccepted) return;

    const rolePeople = await tx.query.roles.findFirst({
      where: eq(roles.name, "User"),
    });

    await tx
      .update(peoples)
      .set({ roleId: rolePeople!.id })
      .where(eq(peoples.id, accessRequest.people.id));
  });

  return NextResponse.json({ status: 200 });
}
