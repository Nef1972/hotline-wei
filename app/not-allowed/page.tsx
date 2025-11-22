"use client";

import { Button, Result } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccessRequest } from "@/lib/api/domain/entity/AccessRequest";
import useNotification from "@/lib/hooks/useNotification";
import { PeopleWithRoleResponseDto } from "@/lib/api/http/people/PeopleResponseDto";

export default function NotAllowedPage() {
  const { signOut } = useClerk();

  const router = useRouter();

  const notification = useNotification();

  const [hasCreatedAccessRequest, setHasCreatedAccessRequest] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const response = await fetch("/api/peoples", {
        cache: "no-store",
      });
      if (!response.ok) return;

      const people: PeopleWithRoleResponseDto = await response.json();
      if (people.role.hasAccess) {
        router.push("/");
      }
    };

    checkAccess().then();
    const intervalId = setInterval(checkAccess, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  const {
    data: hasProcessingAccessRequest,
    isPending: isCheckProcessingPending,
  } = useQuery({
    queryKey: ["hasProcessingRequest"],
    queryFn: async (): Promise<boolean> => {
      const response = await axios.get("/api/access-requests/processing");
      return response.data;
    },
  });

  const {
    mutate: createAccessRequest,
    isPending: isCreatingRequestAccessPending,
  } = useMutation({
    mutationFn: async (): Promise<AccessRequest> => {
      const res = await axios.post("/api/access-requests");
      return res.data;
    },
    onSuccess: () => {
      notification.success({ description: "Demande effectuée avec succès" });
      setHasCreatedAccessRequest(true);
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la demande : ${error.message}`,
      });
    },
  });

  const hasProcessingRequest =
    hasProcessingAccessRequest || hasCreatedAccessRequest;

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
              <Button
                icon={
                  hasProcessingRequest && (
                    <FontAwesomeIcon icon={faHourglassHalf} />
                  )
                }
                className="w-45"
                size={"large"}
                type="primary"
                onClick={() => createAccessRequest()}
                disabled={
                  hasProcessingRequest ||
                  isCheckProcessingPending ||
                  isCreatingRequestAccessPending
                }
              >
                {hasProcessingRequest ? "Accès demandé" : "Demander l'accès"}
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
