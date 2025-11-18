import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { PeopleWithRole } from "@/lib/types/People";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié." },
      { status: 401 },
    );
  }

  const people: PeopleWithRole | undefined =
    await database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
      with: { role: true },
    });

  if (!people) {
    return NextResponse.json(
      { error: "Profil people introuvable pour cet utilisateur." },
      { status: 404 },
    );
  }

  return NextResponse.json(people, { status: 200 });
}
