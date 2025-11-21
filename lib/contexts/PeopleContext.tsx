"use client";

import { PeopleWithRole } from "@/lib/api/domain/entities/People";
import { createContext, ReactNode, useContext } from "react";

type PeopleContextValue = {
  people: PeopleWithRole | null;
};

const PeopleContext = createContext<PeopleContextValue>({
  people: null,
});

export function usePeople() {
  return useContext(PeopleContext);
}

export const PeopleProvider = ({
  children,
  people,
}: {
  children: ReactNode;
  people: PeopleWithRole;
}) => (
  <PeopleContext.Provider value={{ people }}>{children}</PeopleContext.Provider>
);
