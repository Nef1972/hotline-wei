"use client";

import { Button, Tooltip } from "antd";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";

type SortToggleProps = {
  ascending: boolean;
  onChange: (value: boolean) => void;
};

export const SortToggle = ({ ascending, onChange }: SortToggleProps) => (
  <Tooltip title={ascending ? "Croissant" : "Décroissant"}>
    <Button
      onClick={() => onChange(!ascending)}
      icon={ascending ? <UpCircleFilled /> : <DownCircleFilled />}
    />
  </Tooltip>
);
