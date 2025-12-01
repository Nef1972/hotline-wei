"use client";

import { Select } from "antd";
import { AllTag } from "@/lib/components/shared/tags/AllTag";
import { DoneTag } from "@/lib/components/shared/tags/DoneTag";
import { OrderToolbarStatusFilter } from "@/lib/components/type/OrderToolbarStatusFilter";
import { Dispatch, SetStateAction } from "react";
import { DeletedTag } from "@/lib/components/shared/tags/DeletedTag";

type SortTypeProps = {
  statusFilter: OrderToolbarStatusFilter;
  setStatusFilter: Dispatch<SetStateAction<OrderToolbarStatusFilter>>;
};

export const AdminSortType = ({
  statusFilter,
  setStatusFilter,
}: SortTypeProps) => {
  return (
    <Select
      className="w-26"
      value={statusFilter}
      onChange={(value) => setStatusFilter(value)}
      options={[
        { label: <AllTag />, value: "ALL" },
        { label: <DoneTag />, value: "DONE" },
        { label: <DeletedTag />, value: "DELETED" },
      ]}
    />
  );
};
