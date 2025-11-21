"use client";

import { Select } from "antd";
import { AllTag } from "@/lib/components/shared/tags/AllTag";
import { DoneTag } from "@/lib/components/shared/tags/DoneTag";
import { InProgressTag } from "@/lib/components/shared/tags/InProgressTag";

type SortTypeProps = {
  statusFilter: "all" | "done" | "pending";
  setStatusFilter: (status: "all" | "done" | "pending") => void;
};

export const SortType = ({ statusFilter, setStatusFilter }: SortTypeProps) => {
  return (
    <Select
      className="w-26"
      value={statusFilter}
      onChange={(value) => setStatusFilter(value)}
      options={[
        { label: <AllTag />, value: "all" },
        { label: <DoneTag />, value: "done" },
        { label: <InProgressTag />, value: "pending" },
      ]}
    />
  );
};
