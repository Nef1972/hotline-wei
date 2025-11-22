import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import { OrderWithPeople } from "@/lib/api/domain/entities/Order";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { AdminOrderCard } from "@/lib/components/order/AdminOrderCard";

export const AdminOrdersGestion = () => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<OrderWithPeople[]> => {
      const response = await axios.get("/api/orders", {
        params: { deleted: false, done: false },
      });
      return response.data;
    },
  });

  if (isPending)
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {orders?.map((order: OrderWithPeople) => (
          <AnimateCard key={order.id}>
            <AdminOrderCard order={order} />
          </AnimateCard>
        ))}
      </AnimatePresence>
    </div>
  );
};
