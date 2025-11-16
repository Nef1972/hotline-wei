import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { eq } from "drizzle-orm";
import { peoples, roles } from "@/lib/db/schema";
import { PeopleProvider } from "@/app/PeopleContext";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authSession = await auth();

  const people = await database.query.peoples.findFirst({
    where: eq(peoples.userId, authSession.userId!),
  });

  const role = await database.query.roles.findFirst({
    where: eq(roles.id, people!.roleId),
  });

  if (!role?.hasAccess) {
    redirect("/not-allowed");
  }

  return (
    <PeopleProvider people={people} role={role}>
      {children}
    </PeopleProvider>
  );
}
