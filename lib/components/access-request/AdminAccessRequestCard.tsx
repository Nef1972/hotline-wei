"use client";

import { Spin, Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/client/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { ProcessAccessRequest } from "@/lib/api/domain/entity/AccessRequest";
import { useState } from "react";
import { ValidateButton } from "@/lib/components/shared/buttons/ValidateButton";
import { RefuseButtonWithPopConfirm } from "@/lib/components/shared/buttons/RefuseButtonWithPopConfirm";
import { AccessRequestWithPeopleResponseDto } from "@/lib/api/http/access-request/AccessRequestResponseDto";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

type AccessRequestCardProps = {
  accessRequest: AccessRequestWithPeopleResponseDto;
};

export const AdminAccessRequestCard = ({
  accessRequest,
}: AccessRequestCardProps) => {
  const notification = useNotification();
  const [isSuccess, setIsSuccess] = useState(false);

  const createdAt = new Date(accessRequest.createdAt).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProcessAccessRequest) => {
      await axios.patch(`/api/access-requests/${accessRequest.id}`, data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      notification.success({
        description: "Requête d'accès traitée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["accessRequests"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors du traîtement de la demande d'accès : ${handleAxiosError(error)}`,
      });
    },
  });

  const isPendingOrSuccess = isPending || isSuccess;

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
      <Tooltip
        className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2"
        title={`${accessRequest.people.firstName} ${accessRequest.people.lastName}`}
      >
        {accessRequest.people.firstName} {accessRequest.people.lastName}
      </Tooltip>

      <div className="text-center font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
        {createdAt}
      </div>

      {isPendingOrSuccess ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          <ValidateButton
            onClick={() => mutate({ isAccepted: true })}
            disabled={isPendingOrSuccess}
          />

          <RefuseButtonWithPopConfirm
            popConfirmTitle={"Refuser cette demande ?"}
            popConfirmDescription={"Cette action est irréversible."}
            onConfirm={() => mutate({ isAccepted: false })}
            disabled={isPendingOrSuccess}
          />
        </div>
      )}
    </div>
  );
};
