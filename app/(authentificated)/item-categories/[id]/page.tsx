"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Item } from "@/lib/api/domain/entity/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import { AnimatePresence } from "framer-motion";
import { AnimateCard } from "@/lib/components/shared/animation/AnimateCard";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { ItemCard } from "@/lib/components/item/ItemCard";

export default function ItemCategoryPage() {
  const params = useParams();
  const itemCategoryId = params.id as string;

  const { data: itemCategory, isPending: isItemCategoryPending } = useQuery({
    queryKey: ["itemCategory", itemCategoryId],
    queryFn: async (): Promise<ItemCategory> => {
      const res = await axios.get(`/api/item-categories/${itemCategoryId}`);
      return res.data;
    },
  });

  const { data: items, isPending: isItemsPending } = useQuery({
    queryKey: ["items", itemCategoryId],
    queryFn: async (): Promise<Item[]> => {
      const res = await axios.get(
        `/api/items/item-categories/${itemCategoryId}`,
      );
      return res.data;
    },
  });

  const isPending = isItemCategoryPending || isItemsPending;

  return (
    <div className="w-full px-8 pt-5 h-[90vh] sm:h-[93vh] overflow-y-auto">
      <div className="flex flex-wrap justify-center md:justify-between items-start mb-4 gap-x-2">
        <div className="flex flex-row items-center gap-1 mb-2">
          <FontAwesomeIcon icon={faCrosshairs} size={"2xl"} />
          <div className="text-2xl font-semibold text-black dark:text-white">
            Catégorie : {itemCategory?.title}
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <AnimatePresence>
            {items?.map((item: Item) => (
              <AnimateCard key={item.id}>
                <ItemCard item={item} />
              </AnimateCard>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
