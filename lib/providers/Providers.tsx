"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query/queryClient";
import { ClerkProvider } from "@clerk/nextjs";
import { App, ConfigProvider, theme } from "antd";

export function Providers({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const timeout = setTimeout(() => {
      setIsDark(media.matches);
      setMounted(true);
    });

    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener("change", listener);

    return () => {
      clearTimeout(timeout);
      media.removeEventListener("change", listener);
    };
  }, []);

  const memoizedTheme = useMemo(
    () => ({
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }),
    [isDark],
  );

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <ConfigProvider theme={memoizedTheme}>
          <App>{children}</App>
        </ConfigProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
