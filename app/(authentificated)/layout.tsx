"use server";

import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { eq } from "drizzle-orm";
import { peoples } from "@/lib/db/schema";
import { PeopleProvider } from "@/lib/contexts/PeopleContext";
import { redirect } from "next/navigation";
import { Navbar } from "@/lib/components/navbar/Navbar";

export default async function AuthentificatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  const people = await database.query.peoples.findFirst({
    where: eq(peoples.userId, userId!),
    with: { role: true },
  });

  if (!people?.role?.hasAccess) {
    redirect("/not-allowed");
  }

  return (
    <PeopleProvider people={people}>
      <Navbar />
      {children}
    </PeopleProvider>
  );
}
