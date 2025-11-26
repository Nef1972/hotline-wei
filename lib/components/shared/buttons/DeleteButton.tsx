"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Popconfirm } from "antd";
import { PopconfirmProps } from "antd/es/popconfirm";

type DeleteButtonProps = {
  className?: string;
  popConfirmTitle?: PopconfirmProps["title"];
  popConfirmDescription?: PopconfirmProps["description"];
  placement?: PopconfirmProps["placement"];
  onConfirm?: PopconfirmProps["onConfirm"];
};

export const DeleteButton = ({
  className,
  popConfirmTitle,
  popConfirmDescription,
  placement,
  onConfirm,
}: DeleteButtonProps) => (
  <Popconfirm
    title={popConfirmTitle}
    description={popConfirmDescription}
    okText="Oui"
    cancelText="Non"
    placement={placement}
    onConfirm={onConfirm}
  >
    <div
      className={`text-red-500 hover:text-red-700 cursor-pointer ${className}`}
    >
      <FontAwesomeIcon icon={faTrash} />
    </div>
  </Popconfirm>
);
