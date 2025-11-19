"use client";

import { Select } from "antd";

type SortDateTypeProps = {
  sortField: "createdAt" | "deliverTime";
  setSortField: (value: "createdAt" | "deliverTime") => void;
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
