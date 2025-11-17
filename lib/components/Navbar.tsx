"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "antd";
import Link from "next/link";
import { usePeople } from "@/lib/contexts/PeopleContext";

export function Navbar() {
  const { people } = usePeople();

  return (
    <nav className="flex items-center justify-between p-4 bg-indigo-600 dark:bg-indigo-950 text-white">
      <h1 className="text-xl font-bold">Hotline Wei</h1>
      {people?.role?.hasFullAccess && (
        <Link href="/admin">
          <Button>Admin</Button>
        </Link>
      )}
      <UserButton />
    </nav>
  );
}
