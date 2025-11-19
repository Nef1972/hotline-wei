"use client";

import { Button, Result } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PeopleWithRole } from "@/lib/types/People";

export default function NotAllowedPage() {
  const { signOut } = useClerk();

  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const response = await fetch("/api/peoples", {
        cache: "no-store",
      });
      if (!response.ok) return;

      const people: PeopleWithRole = await response.json();
      if (people.role.hasAccess) {
        router.push("/");
      }
    };

    checkAccess().then();
    const intervalId = setInterval(checkAccess, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="max-w-xl w-full px-4">
        <Result
          icon={
            <div className="scale-[2.0]">
              <UserButton />
            </div>
          }
          title={
            <div className="font-bold pb-4 text-black dark:text-white">
              Votre accès est en cours de validation
            </div>
          }
          subTitle={
            <div className="space-y-2 text-base text-black dark:text-white">
              Demandez un accès à l&apos;application, la page se rafraîchira
              automatiquement une fois votre accès validé
            </div>
          }
          extra={
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              <Button className="w-45" size={"large"} type="primary">
                Demander l&apos;accès
              </Button>
              <Button
                className="w-45"
                type={"default"}
                size={"large"}
                icon={<FontAwesomeIcon icon={faDoorOpen} />}
                onClick={() =>
                  signOut({
                    redirectUrl: "/",
                  })
                }
              >
                Se déconnecter
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
