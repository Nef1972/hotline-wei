"use client";

import { Button, ConfigProvider, Popconfirm, Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import {
  AccessRequestWithPeople,
  ProcessAccessRequest,
} from "@/lib/types/AccessRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type AccessRequestCardProps = {
  accessRequest: AccessRequestWithPeople;
};

export const AccessRequestCard = ({
  accessRequest,
}: AccessRequestCardProps) => {
  const notification = useNotification();

  const createdAt = new Date(accessRequest.createdAt).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ProcessAccessRequest) => {
      await axios.post(`/api/access-requests/${accessRequest.id}`, data);
    },
    onSuccess: () => {
      notification.success({
        description: "Requête d'accès traitée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["accessRequests"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors du traîtement de la demande d'accès : ${error.message}`,
      });
    },
  });

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

      <div className="flex gap-3 justify-center">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "darkgreen",
                controlOutline: "transparent",
              },
            },
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={() => mutate({ isAccepted: true })}
          ></Button>
        </ConfigProvider>

        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "red",
                controlOutline: "transparent",
              },
            },
          }}
        >
          <Popconfirm
            title="Refuser cette demande ?"
            description="Cette action est irréversible."
            okText="Oui"
            cancelText="Non"
            placement="topRight"
            onConfirm={() => mutate({ isAccepted: false })}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<FontAwesomeIcon icon={faXmark} />}
            ></Button>
          </Popconfirm>
        </ConfigProvider>
      </div>
    </div>
  );
};
