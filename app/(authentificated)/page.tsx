import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AddOrderButton from "@/lib/components/order/AddOrderButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Spin size={"large"} indicator={<LoadingOutlined spin />} />
      <div className="pt-2 text-black dark:text-white">
        {" "}
        Site en cours de construction
      </div>
      <AddOrderButton />
    </div>
  );
}
