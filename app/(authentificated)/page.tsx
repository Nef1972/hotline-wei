"use client";

import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { Order } from "@/lib/types/Order";
import { OrderCard } from "@/lib/components/order/OrderCard";
import { SortToggle } from "@/lib/components/toolbar/SortToggle";
import { SortType } from "@/lib/components/toolbar/SortType";
import { SortDateType } from "@/lib/components/toolbar/SortDateType";
import AddOrderButton from "@/lib/components/order/AddOrderButton";
import { AnimatePresence, motion } from "framer-motion";

export default function HomePage() {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      const response = await axios.get("/api/orders", {
        params: { onlyActive: true },
      });
      return response.data;
    },
  });

  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "pending">(
    "all",
  );
  const [sortField, setSortField] = useState<"createdAt" | "deliverTime">(
    "createdAt",
  );
  const [ascending, setAscending] = useState(true);

  const filteredSortedOrders = useMemo(() => {
    if (!orders) return [];

    const filtered =
      statusFilter === "all"
        ? orders
        : orders.filter((order) =>
            statusFilter === "done" ? order.done : !order.done,
          );

    return [...filtered].sort((a, b) => {
      const aDate = new Date(a[sortField]);
      const bDate = new Date(b[sortField]);
      return ascending
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    });
  }, [orders, statusFilter, sortField, ascending]);

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="w-full px-8 pt-5">
      <div className="flex flex-wrap justify-center md:justify-between items-start mb-4">
        <div className="text-2xl font-semibold text-black dark:text-white mb-2">
          Vos commandes
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredSortedOrders.map((order: Order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <OrderCard key={order.id} order={order} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
