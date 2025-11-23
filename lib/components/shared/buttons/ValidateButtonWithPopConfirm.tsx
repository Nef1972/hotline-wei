"use client";

import { Button, ButtonProps, ConfigProvider, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { PopconfirmProps } from "antd/es/popconfirm";

type RefuseButtonProps = Omit<ButtonProps, "onClick"> & {
  popConfirmTitle?: PopconfirmProps["title"];
  popConfirmDescription?: PopconfirmProps["description"];
  onConfirm?: PopconfirmProps["onConfirm"];
};

export const ValidateButtonWithPopConfirm = ({
  popConfirmTitle,
  popConfirmDescription,
  onConfirm,
  ...props
}: RefuseButtonProps) => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: "darkgreen",
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
        icon={<FontAwesomeIcon icon={faCheck} />}
        {...props}
      ></Button>
    </Popconfirm>
  </ConfigProvider>
);
