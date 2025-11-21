import { Button, ButtonProps, ConfigProvider, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type RefuseButtonProps = Omit<ButtonProps, "onClick"> & {
  onConfirm?: () => void;
};

export const RefuseButton = ({ onConfirm, ...props }: RefuseButtonProps) => (
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
      title="Refuser cette demande ?"
      description="Cette action est irréversible."
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
