"use client";

import { Spin, Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/client/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { ValidateButtonWithPopConfirm } from "@/lib/components/shared/buttons/ValidateButtonWithPopConfirm";
import { RefuseButtonWithPopConfirm } from "@/lib/components/shared/buttons/RefuseButtonWithPopConfirm";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderWithItemAndPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { useState } from "react";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

type OrderCardProps = {
  order: OrderWithItemAndPeopleResponseDto;
};

export const AdminOrderCard = ({ order }: OrderCardProps) => {
  const notification = useNotification();
  const [isSuccess, setIsSuccess] = useState(false);

  const deliverTime = new Date(order.deliverTime).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { mutate: deleteOrder, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/orders/${order.id}`);
    },
    onSuccess: () => {
      setIsSuccess(true);
      notification.success({ description: "Commande supprimée avec succès" });
      queryClient.invalidateQueries({ queryKey: ["orders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la suppression : ${handleAxiosError(error)}`,
      });
    },
  });

  const { mutate: finishOrder, isPending: isValidatePending } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/orders/${order.id}/validate`);
    },
    onSuccess: () => {
      setIsSuccess(true);
      notification.success({ description: "Commande terminée avec succès" });
      queryClient.invalidateQueries({ queryKey: ["orders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la validation : ${handleAxiosError(error)}`,
      });
    },
  });

  const isPendingOrSuccess = isDeletePending || isValidatePending || isSuccess;

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
      <Tooltip
        className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2 mb-4"
        title={order.item.title}
      >
        {order.item.title}
      </Tooltip>

      <div className="flex justify-between items-center">
        <div>
          <div>
            <span className="font-semibold">Créé par : </span>
            {order.people.firstName} {order.people.lastName}
          </div>
          <div>
            <span className="font-semibold">Livraison le : </span>
            {deliverTime}
          </div>
          <div>
            <span className="font-semibold">Lieu : </span>
            {order.deliverPlace}
          </div>
        </div>
        {isPendingOrSuccess ? (
          <Spin size="large" />
        ) : (
          <div className="flex gap-2">
            <ValidateButtonWithPopConfirm
              popConfirmTitle={"Valider la livraison ?"}
              onConfirm={() => finishOrder()}
            />
            <RefuseButtonWithPopConfirm
              icon={<FontAwesomeIcon icon={faTrash} />}
              popConfirmTitle={"Supprimer cette commande ?"}
              popConfirmDescription={"Cette action est irréversible."}
              onConfirm={() => deleteOrder()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
