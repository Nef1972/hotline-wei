"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

enum TabItem {
  PEOPLES,
  ORDERS,
}

export default function AdminPage() {
  const [activeKey, setActiveKey] = useState<TabItem>(TabItem.PEOPLES);

  const tabItems = [
    {
      key: TabItem.PEOPLES,
      label: "Demandes d'accès",
      icon: faUsers,
      children: <div>Contenu des demandes d&apos;accès</div>,
    },
    {
      key: TabItem.ORDERS,
      label: "Commandes",
      icon: faBoxOpen,
      children: <div>Contenu des commandes</div>,
    },
  ];

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-1/6 bg-gray-100 dark:bg-zinc-900 p-4">
        <div className="items-center gap-2 mb-6 hidden sm:flex">
          <FontAwesomeIcon icon={faUserTie} size={"2xl"} />
          <span className="text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black dark:text-white">
            Pannel administrateur
          </span>
        </div>

        {tabItems.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center justify-center sm:justify-normal gap-2 mb-2 px-3 py-2 rounded ${
              activeKey === tab.key
                ? "bg-zinc-500 dark:bg-zinc-600 text-white"
                : "text-black dark:text-white hover:bg-zinc-200 hover:dark:bg-zinc-800"
            }`}
            onClick={() => setActiveKey(tab.key)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 bg-white dark:bg-zinc-950">
        {tabItems.find((tab) => tab.key === activeKey)?.children}
      </div>
    </div>
  );
}
