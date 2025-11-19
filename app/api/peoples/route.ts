import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { PeopleWithRole } from "@/lib/types/People";
import { NEED_TO_BE_AUTHENTICATED } from "@/lib/constants/ResponseConstant";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NEED_TO_BE_AUTHENTICATED;

  const people: PeopleWithRole | undefined =
    await database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: { role: true },
    });

  if (!people) {
    return NextResponse.json(
      { error: "Profil introuvable pour cet utilisateur." },
      { status: 404 },
    );
  }

  return NextResponse.json(people, { status: 200 });
}
