"use server";

import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { PeopleProvider } from "@/lib/contexts/PeopleContext";
import { redirect } from "next/navigation";
import { Navbar } from "@/lib/components/navbar/Navbar";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";

export default async function AuthentificatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  const people = await getPeopleMatchingWithAnUser(PeopleRepositoryImpl, {
    userId: userId!,
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
