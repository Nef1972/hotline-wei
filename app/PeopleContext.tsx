"use client";

import { People } from "@/lib/types/People";
import { createContext, ReactNode, useContext } from "react";
import { Role } from "@/lib/types/Role";

type PeopleContextValue = {
  people: People | undefined;
  role: Role | undefined;
};

export const PeopleContext = createContext<PeopleContextValue>({
  people: undefined,
  role: undefined,
});

export function usePeople() {
  return useContext(PeopleContext);
}

export const PeopleProvider = ({
  children,
  people,
  role,
}: {
  children: ReactNode;
  people: People | undefined;
  role: Role | undefined;
}) => (
  <PeopleContext.Provider value={{ people, role }}>
    {children}
  </PeopleContext.Provider>
);
