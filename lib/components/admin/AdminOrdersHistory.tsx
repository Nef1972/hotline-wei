"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { OrderWithItemAndPeopleResponseDto } from "@/lib/api/http/order/OrderResponseDto";
import { useMemo, useState } from "react";
import { AdminOrderHistoryCard } from "@/lib/components/order/AdminOrderHistoryCard";
import { OrderToolbarStatusFilter } from "@/lib/components/type/OrderToolbarStatusFilter";
import { AdminSortType } from "@/lib/components/order/adminToolbar/AdminSortType";
import { SortToggle } from "@/lib/components/order/toolbar/SortToggle";

export const AdminOrdersHistory = () => {
  const [peopleIdFilter, setPeopleIdFilter] = useState<number>();
  const [operatorIdFilter, setOperatorIdFilter] = useState<number>();
  const [statusFilter, setStatusFilter] =
    useState<OrderToolbarStatusFilter>("ALL");
  const [ascending, setAscending] = useState(false);

  const queryParams = {
    peopleId: peopleIdFilter,
    operatorId: operatorIdFilter,
    statuses: statusFilter !== "ALL" ? statusFilter : "DELETED,DONE",
  };

  console.log(queryParams);

  const { data: orders, isPending } = useQuery({
    queryKey: ["ordersHistory", queryParams],
    queryFn: async (): Promise<OrderWithItemAndPeopleResponseDto[]> => {
      const response = await axios.get("/api/orders", {
        params: queryParams,
      });
      return response.data;
    },
  });

  const sortedOrders: OrderWithItemAndPeopleResponseDto[] = useMemo(() => {
    if (!orders) return [];

    return orders.sort(
      (
        a: OrderWithItemAndPeopleResponseDto,
        b: OrderWithItemAndPeopleResponseDto,
      ) => {
        const aDate = new Date(a.deliverTime);
        const bDate = new Date(b.deliverTime);
        return ascending
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      },
    );
  }, [orders, ascending]);

  if (isPending)
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center justify-center md:justify-normal mb-5">
        <AdminSortType
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <SortToggle ascending={ascending} onChange={setAscending} />
      </div>

      {isPending ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedOrders?.map((order: OrderWithItemAndPeopleResponseDto) => (
              <AnimateCard key={order.id}>
                <AdminOrderHistoryCard order={order} />
              </AnimateCard>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
