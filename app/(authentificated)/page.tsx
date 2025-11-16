import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Spin size={"large"} indicator={<LoadingOutlined spin />} />
      <div className="pt-2"> Site en cours de construction</div>
    </div>
  );
}
