"use client";

import { createContext, ReactNode, useContext } from "react";

type ThemeContextValue = {
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeContextProvider = ({
  children,
  isDark,
}: {
  children: ReactNode;
  isDark: boolean;
}) => (
  <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>
);
