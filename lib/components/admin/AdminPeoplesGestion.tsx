import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccessRequestWithPeople } from "@/lib/api/domain/entities/AccessRequest";
import { AdminAccessRequestCard } from "@/lib/components/access-request/AdminAccessRequestCard";
import { Spin } from "antd";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";

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
          <AnimateCard key={accessRequest.id}>
            <AdminAccessRequestCard accessRequest={accessRequest} />
          </AnimateCard>
        ))}
      </AnimatePresence>
    </div>
  );
};
