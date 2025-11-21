import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonProps, ConfigProvider } from "antd";

export const ValidateButton = (props: ButtonProps) => (
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
    <Button
      type="primary"
      shape="circle"
      icon={<FontAwesomeIcon icon={faCheck} />}
      {...props}
    ></Button>
  </ConfigProvider>
);
