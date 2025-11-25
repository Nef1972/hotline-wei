"use client";

import { Tooltip } from "antd";
import { OrderWithItem } from "@/lib/api/domain/entity/Order";
import { DoneTag } from "@/lib/components/shared/tags/DoneTag";
import { InProgressTag } from "@/lib/components/shared/tags/InProgressTag";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { DeleteButton } from "@/lib/components/shared/buttons/DeleteButton";
import { DeletedTag } from "@/lib/components/shared/tags/DeletedTag";

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
        description: `Erreur lors de la suppression : ${error.message}`,
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

  const statusTag = () => {
    switch (order.status) {
      case "DONE":
        return <DoneTag />;
      case "IN_PROGRESS":
        return <InProgressTag />;
      case "DELETED":
        return <DeletedTag />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
      {order.status === "IN_PROGRESS" && (
        <DeleteButton
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

        <div>{statusTag()}</div>
      </div>
    </div>
  );
};
