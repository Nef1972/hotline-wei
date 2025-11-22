"use client";

import { Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { ValidateButtonWithPopConfirm } from "@/lib/components/shared/buttons/ValidateButtonWithPopConfirm";
import { RefuseButtonWithPopConfirm } from "@/lib/components/shared/buttons/RefuseButtonWithPopConfirm";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderWithPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";

type OrderCardProps = {
  order: OrderWithPeopleResponseDto;
};

export const AdminOrderCard = ({ order }: OrderCardProps) => {
  const notification = useNotification();

  const deliverTime = new Date(order.deliverTime).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { mutate: deleteOrder } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/orders/${order.id}`);
    },
    onSuccess: () => {
      notification.success({ description: "Commande supprimée avec succès" });
      queryClient.invalidateQueries({ queryKey: ["orders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la suppression : ${error.message}`,
      });
    },
  });

  const { mutate: finishOrder } = useMutation({
    mutationFn: async () => {
      await axios.put(`/api/orders/${order.id}/validate`);
    },
    onSuccess: () => {
      notification.success({ description: "Commande terminée avec succès" });
      queryClient.invalidateQueries({ queryKey: ["orders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la validation : ${error.message}`,
      });
    },
  });

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
      <Tooltip
        className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2 mb-4"
        title={order.description}
      >
        {order.description}
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
        </div>

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
      </div>
    </div>
  );
};
