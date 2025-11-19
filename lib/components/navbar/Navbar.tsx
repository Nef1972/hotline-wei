"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "antd";
import Link from "next/link";
import { usePeople } from "@/lib/contexts/PeopleContext";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Navbar() {
  const { people } = usePeople();

  return (
    <nav className="flex items-center justify-between p-4 bg-indigo-600 dark:bg-indigo-950 text-white">
      <div />
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHeadset} size={"2xl"} />
        <h1 className="text-xl font-bold">Hotline Wei</h1>
      </div>
      {people?.role?.hasFullAccess && (
        <Link href="/admin">
          <Button>Admin</Button>
        </Link>
      )}
      <div className="flex scale-[1.4]">
        <UserButton />
      </div>
    </nav>
  );
}
