"use client";

import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AdminAccessRequestCard } from "@/lib/components/access-request/AdminAccessRequestCard";
import { Spin } from "antd";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { AccessRequestWithPeopleResponseDto } from "@/lib/api/http/access-request/AccessRequestResponseDto";
import { useMemo } from "react";

export const AdminPeoplesGestion = () => {
  const { data: accessRequests, isPending } = useQuery({
    queryKey: ["accessRequests"],
    queryFn: async (): Promise<AccessRequestWithPeopleResponseDto[]> => {
      const response = await axios.get("/api/access-requests");
      return response.data;
    },
  });

  const sortedAccessRequests: AccessRequestWithPeopleResponseDto[] = useMemo(
    () =>
      (accessRequests ?? []).sort(
        (
          a: AccessRequestWithPeopleResponseDto,
          b: AccessRequestWithPeopleResponseDto,
        ) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [accessRequests],
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
        {sortedAccessRequests?.map(
          (accessRequest: AccessRequestWithPeopleResponseDto) => (
            <AnimateCard key={accessRequest.id}>
              <AdminAccessRequestCard accessRequest={accessRequest} />
            </AnimateCard>
          ),
        )}
      </AnimatePresence>
    </div>
  );
};
