"use client";

import {Spin, Table, Tag, Tooltip} from "antd";
import AddOrderButton from "@/lib/components/order/AddOrderButton";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Order} from "@/lib/types/Order";

export default function Home() {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      const response = await axios.get("/api/orders");
      return response.data;
    },
  });

  if (isPending)
    return (
      <div className={"flex justify-center items-center-safe"}>
        <Spin size={"large"} />
      </div>
    );

  const tableData = orders?.map((order: Order) => ({
    key: order.id,
    description: order.description,
    createdAt: new Date(order.createdAt).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    deliverTime: new Date(order.deliverTime).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    done: order.done,
  }));

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      render: (text: string) => (
        <Tooltip title={text}>
          <div className="max-w-170 overflow-hidden whitespace-nowrap text-ellipsis text-zinc-900 dark:text-white">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Créé le",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (text: string) => (
        <span className="text-zinc-900 dark:text-white">{text}</span>
      ),
    },
    {
      title: "Livraison le",
      dataIndex: "deliverTime",
      key: "deliverTime",
      width: "20%",
      render: (text: string) => (
        <span className="text-zinc-900 dark:text-white">{text}</span>
      ),
    },
    {
      title: "État",
      dataIndex: "done",
      key: "done",
      width: "20%",
      render: (done: boolean) =>
        done ? (
          <Tag color="green">Livré</Tag>
        ) : (
          <Tag color="blue">En cours</Tag>
        ),
    },
  ];

  return (
    <div className="w-full px-8 pt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Vos commandes
        </h1>
        <AddOrderButton />
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isPending}
          pagination={false}
          className="custom-dark-table text-black dark:text-white"
        />
      </div>
    </div>
  );
}
