import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccessRequestWithPeople } from "@/lib/api/domain/entities/AccessRequest";
import { AccessRequestCard } from "@/lib/components/access-request/AccessRequestCard";
import { Spin } from "antd";

export const AdminPeoplesGestion = () => {
  const { data: accessRequests, isPending } = useQuery({
    queryKey: ["accessRequests"],
    queryFn: async (): Promise<AccessRequestWithPeople[]> => {
      const response = await axios.get("/api/access-requests");
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
        {accessRequests?.map((accessRequest: AccessRequestWithPeople) => (
          <motion.div
            key={accessRequest.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <AccessRequestCard accessRequest={accessRequest} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
