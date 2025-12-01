"use client";

import { Tooltip } from "antd";
import { OrderWithItem } from "@/lib/api/domain/entity/Order";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/client/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { DeleteButton } from "@/lib/components/shared/buttons/DeleteButton";
import { handleAxiosError } from "@/lib/utils/QueryUtils";
import { statusTag } from "@/lib/utils/OrderUtils";

type OrderCardProps = {
  order: OrderWithItem;
};

export const CommandedOrderCard = ({ order }: OrderCardProps) => {
  const notification = useNotification();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/orders/${order.id}`);
    },
    onSuccess: () => {
      notification.success({ description: "Commande supprimée avec succès" });
      queryClient.invalidateQueries({ queryKey: ["selfOrders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de la suppression : ${handleAxiosError(error)}`,
      });
    },
  });

  const createdAt = new Date(order.createdAt).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const deliverTime = new Date(order.deliverTime).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 relative cursor-default">
      {order.status === "IN_PROGRESS" && (
        <DeleteButton
          className="absolute top-3 right-3"
          popConfirmTitle={"Annuler cette commande ?"}
          popConfirmDescription={"Cette action est irréversible."}
          placement="topRight"
          onConfirm={() => mutate()}
        />
      )}

      <Tooltip
        className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2 mb-4"
        title={order.item.title}
      >
        {order.item.title}
      </Tooltip>

      <div className="flex justify-between items-center">
        <div>
          <div>
            <span className="font-semibold">Créé le : </span>
            {createdAt}
          </div>
          <div>
            <span className="font-semibold">Livraison le : </span>
            {deliverTime}
          </div>
        </div>

        <div>{statusTag(order)}</div>
      </div>
    </div>
  );
};
