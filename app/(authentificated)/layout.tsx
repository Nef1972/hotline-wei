"use server";

import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { AppContextProvider } from "@/lib/contexts/AppContext";
import { redirect } from "next/navigation";
import { Navbar } from "@/lib/components/navbar/Navbar";
import { getPeopleMatchingWithAnUser } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUser";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";
import { getAllItemCategories } from "@/lib/api/application/useCases/item-category/GetAllItemCategories";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

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

  const itemCategories: ItemCategory[] = await getAllItemCategories(
    ItemCategoryRepositoryImpl,
  );

  return (
    <AppContextProvider people={people} itemCategories={itemCategories}>
      <Navbar />
      {children}
    </AppContextProvider>
  );
}
