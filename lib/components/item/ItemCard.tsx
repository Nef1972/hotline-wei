import { Tooltip } from "antd";
import { Item } from "@/lib/api/domain/entity/Item";
import Image from "next/image";
import AddOrderButton from "@/lib/components/order/AddOrderButton";

type ItemCardProps = {
  item: Item;
};

export const ItemCard = ({ item }: ItemCardProps) => (
  <div className="flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-2xl shadow-md p-6 relative cursor-default">
    <Tooltip
      className="font-mono text-xl text-zinc-900 dark:text-white text-center line-clamp-2 mb-4"
      title={item.title}
    >
      {item.title}
    </Tooltip>

    <div className="flex justify-between items-center">
      <div className="w-24 h-24 relative rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <AddOrderButton item={item} />
    </div>
  </div>
);
