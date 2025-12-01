"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { AdminOrderCard } from "@/lib/components/order/AdminOrderCard";
import { OrderWithItemAndPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { useMemo } from "react";

export const AdminOrdersGestion = () => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<OrderWithItemAndPeopleResponseDto[]> => {
      const response = await axios.get("/api/orders", {
        params: { statuses: "IN_PROGRESS" },
      });
      return response.data;
    },
  });

  const sortedOrders: OrderWithItemAndPeopleResponseDto[] = useMemo(
    () =>
      (orders ?? []).sort(
        (
          a: OrderWithItemAndPeopleResponseDto,
          b: OrderWithItemAndPeopleResponseDto,
        ) =>
          new Date(a.deliverTime).getTime() - new Date(b.deliverTime).getTime(),
      ),
    [orders],
  );

  if (isPending)
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {sortedOrders?.map((order: OrderWithItemAndPeopleResponseDto) => (
          <AnimateCard key={order.id}>
            <AdminOrderCard order={order} />
          </AnimateCard>
        ))}
      </AnimatePresence>
    </div>
  );
};
