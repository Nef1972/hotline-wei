"use client";

import { Popconfirm, Tooltip } from "antd";
import { Order } from "@/lib/types/Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DoneTag } from "@/lib/components/tag/DoneTag";
import { InProgressTag } from "@/lib/components/tag/InProgressTag";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";

type OrderCardProps = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const notification = useNotification();

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

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.delete("/api/orders", { params: { id: order.id } });
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

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
      <Popconfirm
        title="Supprimer cette commande ?"
        description="Cette action est irréversible."
        okText="Oui"
        cancelText="Non"
        placement="topRight"
        onConfirm={() => mutate()}
      >
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
          title="Supprimer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Popconfirm>

      <Tooltip
        className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2 mb-4"
        title={order.description}
      >
        {order.description}
      </Tooltip>

      <div className="flex justify-between items-center">
        <div>
          <div>
            <span className="font-semibold">Créé le :</span> {createdAt}
          </div>
          <div>
            <span className="font-semibold">Livraison le :</span> {deliverTime}
          </div>
        </div>

        <div>{order.done ? <DoneTag /> : <InProgressTag />}</div>
      </div>
    </div>
  );
};
