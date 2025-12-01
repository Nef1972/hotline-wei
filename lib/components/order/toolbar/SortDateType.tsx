"use client";

import { Select } from "antd";
import { OrderToolbarSortField } from "@/lib/components/type/OrderToolbarSortField";
import { Dispatch, SetStateAction } from "react";

type SortDateTypeProps = {
  sortField: OrderToolbarSortField;
  setSortField: Dispatch<SetStateAction<OrderToolbarSortField>>;
};

export const SortDateType = ({
  sortField,
  setSortField,
}: SortDateTypeProps) => (
  <Select
    className={"w-37"}
    value={sortField}
    onChange={(value) => setSortField(value)}
    options={[
      { label: "Date de création", value: "createdAt" },
      { label: "Date de livraison", value: "deliverTime" },
    ]}
  />
);
