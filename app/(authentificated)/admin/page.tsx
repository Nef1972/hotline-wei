"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxOpen, faListCheck, faUsers, faUserTie,} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {AdminPeoplesGestion} from "@/lib/components/admin/AdminPeoplesGestion";
import {RefreshButton} from "@/lib/components/shared/buttons/RefreshButton";
import {queryClient} from "@/lib/query/queryClient";
import {AdminOrdersGestion} from "@/lib/components/admin/AdminOrdersGestion";

enum TabItem {
  ACCESS_REQUESTS = "accessRequests",
  ORDERS = "orders",
  PRODUCTS = "products",
}

export default function AdminPage() {
  const [activeKey, setActiveKey] = useState<TabItem>(TabItem.ACCESS_REQUESTS);

  const tabItems = [
    {
      key: TabItem.ACCESS_REQUESTS,
      label: "Demandes d'accès",
      icon: faUsers,
      children: <AdminPeoplesGestion />,
    },
    {
      key: TabItem.ORDERS,
      label: "Commandes",
      icon: faBoxOpen,
      children: <AdminOrdersGestion />,
    },
    {
      key: TabItem.PRODUCTS,
      label: "Gestion des produits",
      icon: faListCheck,
      children: <div>Contenu des produits</div>,
    },
  ];

  return (
    <div className="flex w-full h-[90vh] sm:h-[93vh]">
      <div className="flex flex-col w-1/6 bg-gray-100 dark:bg-zinc-900 p-4">
        <div className="items-center gap-2 mb-6 hidden md:flex">
          <FontAwesomeIcon icon={faUserTie} size={"2xl"} />
          <span className="text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black dark:text-white">
            Panel administrateur
          </span>
        </div>

        {tabItems.map((tab) => (
          <div
            key={tab.key}
            className={`flex items-center justify-center md:justify-normal sm:h-[2.5rem] gap-2 mb-2 px-3 py-2 cursor-default rounded ${
              activeKey === tab.key
                ? "bg-zinc-500 dark:bg-zinc-600 text-white"
                : "text-black dark:text-white hover:bg-zinc-200 hover:dark:bg-zinc-800"
            }`}
            onClick={() => setActiveKey(tab.key)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <div className="md:flex hidden justify-between w-full overflow-hidden whitespace-nowrap">
              {tab.label}
              {activeKey === tab.key && (
                <RefreshButton
                  onClick={() =>
                    queryClient.invalidateQueries({
                      queryKey: [tab.key],
                    })
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 h-[90vh] sm:h-[93vh] overflow-y-auto">
        {tabItems.find((tab) => tab.key === activeKey)?.children}
      </div>
    </div>
  );
}
