"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";

export type DrawerItemProps = {
  label: ReactNode;
  redirectPath: string;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

export const DrawerItem = ({
  label,
  redirectPath,
  setIsDrawerOpen,
}: DrawerItemProps) => {
  const router = useRouter();

  const path = usePathname();

  const onClick = () => {
    router.push(redirectPath);
    setIsDrawerOpen(false);
  };

  return (
    <div
      className={`flex items-center gap-2 mb-2 px-3 py-2 font-semibold font-mono cursor-pointer rounded overflow-hidden ${
        redirectPath === path
          ? "bg-zinc-500 dark:bg-zinc-600 text-white"
          : "text-black dark:text-white hover:bg-zinc-200 hover:dark:bg-zinc-800"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
