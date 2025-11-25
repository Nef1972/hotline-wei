import { Button, ButtonProps, ConfigProvider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type AddCategoryButtonProps = ButtonProps & {
  defaultBg: string;
  defaultHoverBg: string;
  defaultBorderColor: string;
};

export const AddCategoryButton = ({
  defaultBg,
  defaultHoverBg,
  defaultBorderColor,
  ...props
}: AddCategoryButtonProps) => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          borderRadius: 3,
          defaultBg: defaultBg,
          defaultHoverBg: defaultHoverBg,
          defaultBorderColor: defaultBorderColor,
          defaultShadow: "#transparent",
        },
      },
    }}
  >
    <Button className="w-full" type="dashed" {...props}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  </ConfigProvider>
);
