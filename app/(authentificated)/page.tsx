"use client";

import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { OrderWithItem } from "@/lib/api/domain/entity/Order";
import { OrderCard } from "@/lib/components/order/OrderCard";
import { SortToggle } from "@/lib/components/toolbar/SortToggle";
import { SortType } from "@/lib/components/toolbar/SortType";
import { SortDateType } from "@/lib/components/toolbar/SortDateType";
import AddOrderButton from "@/lib/components/order/AddOrderButton";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { OrderToolbarStatusFilter } from "@/lib/components/type/OrderToolbarStatusFilter";
import { OrderToolbarSortField } from "@/lib/components/type/OrderToolbarSortField";

export default function HomePage() {
  const [statusFilter, setStatusFilter] =
    useState<OrderToolbarStatusFilter>("ALL");
  const [sortField, setSortField] =
    useState<OrderToolbarSortField>("createdAt");
  const [ascending, setAscending] = useState(true);

  const queryParams =
    statusFilter !== "ALL"
      ? { orderStatuses: statusFilter }
      : { orderStatuses: "IN_PROGRESS,DONE" };

  const { data: orders, isPending } = useQuery({
    queryKey: ["selfOrders", statusFilter],
    queryFn: async (): Promise<OrderWithItem[]> => {
      const response = await axios.get("/api/orders/self", {
        params: queryParams,
      });
      return response.data;
    },
  });

  const filteredSortedOrders = useMemo(() => {
    if (!orders) return [];

    return [...orders].sort((a, b) => {
      const aDate = new Date(a[sortField]);
      const bDate = new Date(b[sortField]);
      return ascending
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    });
  }, [orders, sortField, ascending]);

  return (
    <div className="w-full px-8 pt-5 h-[90vh] sm:h-[93vh] overflow-y-auto">
      <div className="flex flex-wrap justify-center md:justify-between items-start mb-4 gap-x-2">
        <div className="flex flex-row items-center gap-1 mb-2">
          <FontAwesomeIcon icon={faBoxOpen} size={"2xl"} />
          <div className="text-2xl font-semibold text-black dark:text-white">
            Vos commandes
          </div>
        </div>
        <AddOrderButton />
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center md:justify-normal mb-5">
        <SortType
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <SortDateType sortField={sortField} setSortField={setSortField} />
        <SortToggle ascending={ascending} onChange={setAscending} />
      </div>

      {isPending ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSortedOrders.map((order: OrderWithItem) => (
              <AnimateCard key={order.id}>
                <OrderCard order={order} />
              </AnimateCard>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
