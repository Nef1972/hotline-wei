"use client";

import { Select } from "antd";
import { AllTag } from "@/lib/components/tag/AllTag";
import { DoneTag } from "@/lib/components/tag/DoneTag";
import { InProgressTag } from "@/lib/components/tag/InProgressTag";

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
