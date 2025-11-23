"use client";

import { Button, ButtonProps, ConfigProvider, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { PopconfirmProps } from "antd/es/popconfirm";

type RefuseButtonProps = Omit<ButtonProps, "onClick"> & {
  popConfirmTitle?: PopconfirmProps["title"];
  popConfirmDescription?: PopconfirmProps["description"];
  onConfirm?: PopconfirmProps["onConfirm"];
};

export const RefuseButtonWithPopConfirm = ({
  popConfirmTitle,
  popConfirmDescription,
  onConfirm,
  ...props
}: RefuseButtonProps) => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: "red",
          controlOutline: "transparent",
        },
      },
    }}
  >
    <Popconfirm
      title={popConfirmTitle}
      description={popConfirmDescription}
      okText="Oui"
      cancelText="Non"
      placement="topRight"
      onConfirm={onConfirm}
    >
      <Button
        type="primary"
        shape="circle"
        icon={<FontAwesomeIcon icon={faXmark} />}
        {...props}
      ></Button>
    </Popconfirm>
  </ConfigProvider>
);
