"use client";

import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { Item, NewItem } from "@/lib/api/domain/entity/Item";
import { AddCategoryButton } from "@/lib/components/shared/buttons/AddCategoryButton";
import { useThemeContext } from "@/lib/contexts/ThemeContext";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useNotification from "@/lib/hooks/useNotification";
import { Spin } from "antd";
import { queryClient } from "@/lib/query/queryClient";
import { DeleteButton } from "@/lib/components/shared/buttons/DeleteButton";
import { AdminItemCard } from "@/lib/components/item/AdminItemCard";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

type AdminItemCategoryCardProps = {
  itemCategoryWithItems: ItemCategoryWithItems;
};

export const AdminItemCategoryCard = ({
  itemCategoryWithItems,
}: AdminItemCategoryCardProps) => {
  const { isDark } = useThemeContext();

  const notification = useNotification();

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const { mutate: createItem, isPending: isCreatingItemPending } = useMutation({
    mutationFn: async (data: NewItem): Promise<Item> => {
      const res = await axios.post("/api/items", data);
      return res.data;
    },
    onSuccess: () => {
      notification.success({ description: "Article ajouté avec succès" });
      queryClient
        .invalidateQueries({ queryKey: ["itemCategoriesWithItems"] })
        .then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de l'ajout de l'article : ${handleAxiosError(error)}`,
      });
    },
    onSettled: () => {
      setIsAdding(false);
      setNewTitle("");
    },
  });

  const { mutate: deleteItemCategory, isPending: isDeletePending } =
    useMutation({
      mutationFn: async () => {
        await axios.delete(`/api/item-categories/${itemCategoryWithItems.id}`);
      },
      onSuccess: () => {
        setIsDeleteSuccess(true);
        notification.success({
          description: "Catégorie supprimée avec succès",
        });
        queryClient
          .invalidateQueries({ queryKey: ["itemCategoriesWithItems"] })
          .then();
      },
      onError: (error) => {
        notification.error({
          description: `Erreur lors de la suppression : ${handleAxiosError(error)}`,
        });
      },
    });

  const sortedItems: Item[] = useMemo(
    () =>
      (itemCategoryWithItems.items ?? []).sort(
        (a: Item, b: Item) => a.id - b.id,
      ),
    [itemCategoryWithItems.items],
  );

  const handleSubmit = () => {
    const titleToSubmit = newTitle.trim();
    if (titleToSubmit.length === 0) {
      setIsAdding(false);
      return;
    }
    createItem({
      title: titleToSubmit,
      itemCategoryId: itemCategoryWithItems.id,
    });
  };

  const isPendingOrSuccess = isDeletePending || isDeleteSuccess;

  return (
    <div className="flex flex-col h-fit py-2 px-3 items-center gap-2 bg-white dark:bg-zinc-950 rounded cursor-default">
      <div className="relative w-full flex items-center justify-center text-black dark:text-white text-xl mb-1 font-semibold font-mono">
        {itemCategoryWithItems.title}
        <div className="absolute right-0">
          {isPendingOrSuccess ? (
            <Spin size="default" />
          ) : (
            <DeleteButton
              popConfirmTitle="Supprimer cette catégorie ?"
              popConfirmDescription="Cette action est irréversible."
              placement="topRight"
              onConfirm={() => deleteItemCategory()}
            />
          )}
        </div>
      </div>

      {sortedItems.map((item: Item) => (
        <AdminItemCard key={item.id} item={item} />
      ))}

      {!isCreatingItemPending ? (
        isAdding ? (
          <input
            autoFocus
            value={newTitle}
            placeholder="Nom de l'article"
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full h-[5.3vh] sm:h-[3.4vh] px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white outline-none"
          />
        ) : (
          <AddCategoryButton
            defaultBg={isDark ? "#18181b" : "#e4e4e7"}
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
