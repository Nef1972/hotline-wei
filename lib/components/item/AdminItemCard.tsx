"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Item } from "@/lib/api/domain/entity/Item";
import { queryClient } from "@/lib/client/query/queryClient";
import useNotification from "@/lib/hooks/useNotification";
import { Spin } from "antd";
import Image from "next/image";
import { DeleteButton } from "@/lib/components/shared/buttons/DeleteButton";
import axios from "axios";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

type AdminItemCardProps = {
  item: Item;
};

export const AdminItemCard = ({ item }: AdminItemCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notification = useNotification();

  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (file: File): Promise<void> => {
      const formData = new FormData();
      formData.append("file", file);

      return axios.post(`/api/items/${item.id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["itemCategoriesWithItems"] })
        .then();
      notification.success({
        description: "Image postée avec succès",
      });
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de l'upload de l'image : ${handleAxiosError(error)}`,
      });
    },
  });

  const { mutate: deleteItem, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/items/${item.id}`);
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

  const handlePictureClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutate(file);
  };

  const isDeletePendingOrSuccess = isDeletePending || isDeleteSuccess;

  return (
    <div className="flex justify-between items-center w-full px-1 py-1 pr-4 cursor-default rounded text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 hover:dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <div className={"flex items-center justify-center w-10 h-10"}>
          {isPending ? (
            <Spin size="large" />
          ) : (
            <div className="w-10 h-10 relative rounded-lg overflow-hidden">
              <Image
                onClick={handlePictureClick}
                className="cursor-pointer object-cover"
                src={item?.pictureUrl ?? "/placeholder.svg"}
                alt={item.title}
                fill
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
        <span>{item.title}</span>
      </div>
      {isDeletePendingOrSuccess ? (
        <Spin size="default" />
      ) : (
        <DeleteButton
          className="scale-[1.7]"
          popConfirmTitle="Désactiver cet article ?"
          popConfirmDescription="Cette action est irréversible."
          placement="topRight"
          onConfirm={() => deleteItem()}
          icon={faBan}
        />
      )}
    </div>
  );
};
