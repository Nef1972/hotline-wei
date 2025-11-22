"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AdminPeoplesGestion } from "@/lib/components/admin/AdminPeoplesGestion";
import { RefreshButton } from "@/lib/components/shared/buttons/RefreshButton";
import { queryClient } from "@/lib/query/queryClient";

enum TabItem {
  PEOPLES,
  ORDERS,
}

export default function AdminPage() {
  const [activeKey, setActiveKey] = useState<TabItem>(TabItem.PEOPLES);

  const tabItems = [
    {
      key: TabItem.PEOPLES,
      label: (
        <div className="flex items-center justify-between">
          <div>Demandes d&apos;accès</div>
          {activeKey === TabItem.PEOPLES && (
            <RefreshButton
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["accessRequests"] })
              }
            />
          )}
        </div>
      ),
      icon: faUsers,
      children: <AdminPeoplesGestion />,
    },
    {
      key: TabItem.ORDERS,
      label: "Commandes",
      icon: faBoxOpen,
      children: <div>Contenu des commandes</div>,
    },
  ];

  return (
    <div className="flex w-full h-[90vh] sm:h-[93vh]">
      <div className="flex flex-col w-1/6 bg-gray-100 dark:bg-zinc-900 p-4">
        <div className="items-center gap-2 mb-6 hidden md:flex">
          <FontAwesomeIcon icon={faUserTie} size={"2xl"} />
          <span className="text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black dark:text-white">
            Pannel administrateur
          </span>
        </div>

        {tabItems.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center justify-center md:justify-normal gap-2 mb-2 px-3 py-2 rounded ${
              activeKey === tab.key
                ? "bg-zinc-500 dark:bg-zinc-600 text-white"
                : "text-black dark:text-white hover:bg-zinc-200 hover:dark:bg-zinc-800"
            }`}
            onClick={() => setActiveKey(tab.key)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-6">
        {tabItems.find((tab) => tab.key === activeKey)?.children}
      </div>
    </div>
  );
}
