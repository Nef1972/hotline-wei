"use client";

import { PeopleWithRole } from "@/lib/types/People";
import { createContext, ReactNode, useContext } from "react";

type PeopleContextValue = {
  people: PeopleWithRole | undefined;
};

export const PeopleContext = createContext<PeopleContextValue>({
  people: undefined,
});

export function usePeople() {
  return useContext(PeopleContext);
}

export const PeopleProvider = ({
  children,
  people,
}: {
  children: ReactNode;
  people: PeopleWithRole | undefined;
}) => (
  <PeopleContext.Provider value={{ people }}>{children}</PeopleContext.Provider>
);
