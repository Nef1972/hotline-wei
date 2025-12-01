"use client";

import { Select } from "antd";
import { AllTag } from "@/lib/components/shared/tags/AllTag";
import { DoneTag } from "@/lib/components/shared/tags/DoneTag";
import { InProgressTag } from "@/lib/components/shared/tags/InProgressTag";
import { OrderToolbarStatusFilter } from "@/lib/components/type/OrderToolbarStatusFilter";
import { Dispatch, SetStateAction } from "react";

type SortTypeProps = {
  statusFilter: OrderToolbarStatusFilter;
  setStatusFilter: Dispatch<SetStateAction<OrderToolbarStatusFilter>>;
};

export const SortType = ({ statusFilter, setStatusFilter }: SortTypeProps) => {
  return (
    <Select
      className="w-26"
      value={statusFilter}
      onChange={(value) => setStatusFilter(value)}
      options={[
        { label: <AllTag />, value: "ALL" },
        { label: <DoneTag />, value: "DONE" },
        { label: <InProgressTag />, value: "IN_PROGRESS" },
      ]}
    />
  );
};
