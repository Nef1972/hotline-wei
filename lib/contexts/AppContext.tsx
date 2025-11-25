"use client";

import { PeopleWithRole } from "@/lib/api/domain/entity/People";
import { createContext, ReactNode, useContext } from "react";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

type AppContextValue = {
  people: PeopleWithRole | null;
  itemCategories: ItemCategory[];
};

const AppContext = createContext<AppContextValue>({
  people: null,
  itemCategories: [],
});

export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({
  children,
  people,
  itemCategories,
}: {
  children: ReactNode;
  people: PeopleWithRole;
  itemCategories: ItemCategory[];
}) => (
  <AppContext.Provider value={{ people, itemCategories }}>
    {children}
  </AppContext.Provider>
);
