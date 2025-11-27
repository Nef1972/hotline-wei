"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import {
  ItemCategoryWithItems,
  NewItemCategory,
} from "@/lib/api/domain/entity/ItemCategory";
import { AdminItemCategoryCard } from "@/lib/components/item-category/AdminItemCategoryCard";
import { AddCategoryButton } from "@/lib/components/shared/buttons/AddCategoryButton";
import { useThemeContext } from "@/lib/contexts/ThemeContext";
import { useMemo, useState } from "react";
import { Item } from "@/lib/api/domain/entity/Item";
import { queryClient } from "@/lib/client/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

export const AdminItemCategoriesGestion = () => {
  const { isDark } = useThemeContext();

  const notification = useNotification();

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const {
    data: itemCategoriesWithItems,
    isPending: isFetchingItemCategoriesPending,
  } = useQuery({
    queryKey: ["itemCategoriesWithItems"],
    queryFn: async (): Promise<ItemCategoryWithItems[]> => {
      const response = await axios.get("/api/item-categories/items");
      return response.data;
    },
  });

  const {
    mutate: createItemCategory,
    isPending: isCreatingItemCategoryPending,
  } = useMutation({
    mutationFn: async (data: NewItemCategory): Promise<Item> => {
      const res = await axios.post("/api/item-categories", data);
      return res.data;
    },
    onSuccess: () => {
      notification.success({ description: "Catégorie ajoutée avec succès" });
      queryClient
        .invalidateQueries({ queryKey: ["itemCategoriesWithItems"] })
        .then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de l'ajout de la catégorie : ${handleAxiosError(error)}`,
      });
    },
    onSettled: () => {
      setIsAdding(false);
      setNewTitle("");
    },
  });

  const sortedItemCategories: ItemCategoryWithItems[] = useMemo(
    () =>
      (itemCategoriesWithItems ?? []).sort(
        (a: ItemCategoryWithItems, b: ItemCategoryWithItems) => a.id - b.id,
      ),
    [itemCategoriesWithItems],
  );

  if (isFetchingItemCategoriesPending)
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    );

  const handleSubmit = () => {
    const titleToSubmit = newTitle.trim();
    if (titleToSubmit.length === 0) {
      setIsAdding(false);
      return;
    }
    createItemCategory({
      title: titleToSubmit,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedItemCategories?.map(
        (itemCategoriesWithItem: ItemCategoryWithItems) => (
          <AdminItemCategoryCard
            key={itemCategoriesWithItem.id}
            itemCategoryWithItems={itemCategoriesWithItem}
          />
        ),
      )}

      {!isCreatingItemCategoryPending ? (
        isAdding ? (
          <input
            autoFocus
            value={newTitle}
            placeholder="Nom de la catégorie"
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full h-[5.3vh] sm:h-[3.4vh] px-3 py-2 rounded bg-white dark:bg-zinc-950 text-black dark:text-white outline-none"
          />
        ) : (
          <AddCategoryButton
            defaultBg={isDark ? "#09090b" : "#ffffff"}
            defaultHoverBg={isDark ? "#27272a" : "#d4d4d8"}
            defaultBorderColor={isDark ? "#71717b" : "#27272a"}
            onClick={() => setIsAdding(true)}
          />
        )
      ) : (
        <Spin size="default" />
      )}
    </div>
  );
};
