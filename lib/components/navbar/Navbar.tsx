"use client";

import { UserButton } from "@clerk/nextjs";
import { usePeople } from "@/lib/contexts/PeopleContext";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/lib/components/navbar/AdminButton";

export function Navbar() {
  const router = useRouter();
  const { people } = usePeople();

  return (
    <nav className="flex items-center justify-between px-4 h-[10vh] sm:h-[7vh] bg-indigo-600 dark:bg-indigo-950 text-white">
      <div
        className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faHeadset} size={"2xl"} />
        <h1 className="text-xl font-bold">Hotline Wei</h1>
      </div>
      <div className="flex-1 flex justify-end gap-5 md:right-4">
        {people?.role?.hasFullAccess && <AdminButton />}
        <div className="flex scale-[1.4]">
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
