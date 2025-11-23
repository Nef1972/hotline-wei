"use server";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
    userId: userId!,
  });

  if (!people?.role?.hasFullAccess) {
    redirect("/");
  }

  return children;
}
