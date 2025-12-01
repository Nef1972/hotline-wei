"use client";

import { Tooltip } from "antd";
import { OrderWithItemAndPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { statusTag } from "@/lib/utils/OrderUtils";

type OrderCardProps = {
  order: OrderWithItemAndPeopleResponseDto;
};

export const AdminOrderHistoryCard = ({ order }: OrderCardProps) => {
  const deliverTime = new Date(order.deliverTime).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 relative cursor-default">
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
            <span className="font-semibold">Traité par : </span>
            {order.operator?.firstName} {order.operator?.lastName}
          </div>
        </div>
        <div>{statusTag(order)}</div>
      </div>
    </div>
  );
};
