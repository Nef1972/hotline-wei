"use client";

import { UserButton } from "@clerk/nextjs";
import { usePeople } from "@/lib/contexts/PeopleContext";
import { faBars, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/lib/components/navbar/AdminButton";
import { Button, ConfigProvider, Divider, Drawer } from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { DrawerItem } from "@/lib/components/navbar/DrawerItem";

export function Navbar() {
  const router = useRouter();
  const { people } = usePeople();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {
    data: itemCategories,
    isPending: isItemCategoriesPending,
    refetch: fetchCategories,
  } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: async (): Promise<ItemCategory[]> => {
      const res = await axios.get("/api/item-categories");
      return res.data;
    },
    enabled: false,
  });

  const onDrawerOpen = () => {
    fetchCategories().then();
    setIsDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-4 h-[10vh] sm:h-[7vh] bg-indigo-600 dark:bg-indigo-950 text-white">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorText: "white",
            },
          },
        }}
      >
        <Button
          className="flex items-center"
          type="text"
          icon={<FontAwesomeIcon icon={faBars} size="2xl" />}
          onClick={onDrawerOpen}
        />
      </ConfigProvider>
      <div
        className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faHeadset} size={"2xl"} />
        <h1 className="text-xl font-bold">Hotline Wei</h1>
      </div>
      <div className="flex justify-end gap-5 md:right-4">
        {people?.role?.hasFullAccess && <AdminButton />}
        <div className="flex scale-[1.4]">
          <UserButton />
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        placement="left"
        closable={false}
        width={isMobile ? "60%" : "25%"}
        loading={isItemCategoriesPending}
        onClose={onDrawerClose}
      >
        <DrawerItem
          redirectPath={"/your-orders"}
          label={"Vos commandes"}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <Divider />
        {itemCategories?.map((itemCategory: ItemCategory) => (
          <DrawerItem
            key={itemCategory.id}
            redirectPath={`/item-categories/${itemCategory.id}`}
            label={itemCategory.title}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        ))}
      </Drawer>
    </nav>
  );
}
