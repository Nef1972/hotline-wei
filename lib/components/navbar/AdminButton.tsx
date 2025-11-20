import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ConfigProvider } from "antd";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const AdminButton = () => (
  <Link href="/admin">
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 8,

            colorPrimary: "#6366f1",
            colorPrimaryHover: "#818cf8",
            colorPrimaryBorder: "#4f46e5",

            controlOutline: "transparent",
          },
        },
      }}
    >
      <Button icon={<FontAwesomeIcon icon={faGears} />} type="primary">
        Admin
      </Button>
    </ConfigProvider>
  </Link>
);
