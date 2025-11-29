"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Item } from "@/lib/api/domain/entity/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { ItemCard } from "@/lib/components/item/ItemCard";
import { useAppContext } from "@/lib/contexts/AppContext";
import { useMemo } from "react";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

export default function ItemCategoryPage() {
  const params = useParams();
  const itemCategoryId = params.id as string;

  const router = useRouter();
  const { itemCategories } = useAppContext();

  const { data: items, isPending } = useQuery({
    queryKey: ["items", itemCategoryId],
    queryFn: async (): Promise<Item[]> => {
      const res = await axios.get(
        `/api/items/item-categories/${itemCategoryId}`,
      );
      return res.data;
    },
  });

  const itemCategory: ItemCategory | undefined = useMemo(
    () =>
      itemCategories.find(
        (itemCategory) => itemCategory.id.toString() === itemCategoryId,
      ),
    [itemCategories, itemCategoryId],
  );

  if (!itemCategory) {
    router.push("/");
    return null;
  }

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[90vh] sm:h-[93vh]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="w-full px-8 pt-5 h-[90vh] sm:h-[93vh] overflow-y-auto">
      <div className="flex flex-wrap justify-center md:justify-between items-start mb-4 gap-x-2">
        <div className="flex flex-row items-center gap-1 mb-2">
          <FontAwesomeIcon icon={faCrosshairs} size={"2xl"} />
          <div className="text-2xl font-semibold text-black dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {itemCategory.title}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {items?.map((item: Item) => (
            <AnimateCard key={item.id}>
              <ItemCard item={item} />
            </AnimateCard>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
