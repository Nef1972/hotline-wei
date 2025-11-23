"use client";

import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NewOrder, Order } from "@/lib/api/domain/entity/Order";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import AddOrderForm from "@/lib/components/order/AddOrderForm";
import useNotification from "@/lib/hooks/useNotification";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { queryClient } from "@/lib/query/queryClient";
import { PlusCircleFilled } from "@ant-design/icons";

export default function AddOrderButton() {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();

  const notification = useNotification();

  const {
    data: itemCategories,
    isPending: isItemCategoriesPending,
    refetch: fetchCategories,
  } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: async () => {
      const res = await axios.get("/api/item-categories", {
        params: { itemAvailable: "true" },
      });
      return res.data;
    },
    enabled: false,
  });

  const { mutate: createOrder, isPending: isCreateOrderPending } = useMutation({
    mutationFn: async (data: NewOrder): Promise<Order> => {
      const res = await axios.post("/api/orders", data);
      return res.data;
    },
    onSuccess: () => {
      notification.success({ description: "Commande enregistrée avec succès" });
      form.resetFields();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["selfOrders"] }).then();
    },
    onError: (error) => {
      notification.error({
        description: `Erreur lors de l'enregistrement : ${error.message}`,
      });
    },
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const parsed = createOrderSchema.safeParse({
      itemId: values.itemId,
      deliverTime: values.deliverTime?.toDate(),
    });

    if (!parsed.success) {
      notification.error({
        description: joinZodErrors(parsed),
      });
      return;
    }

    const { itemId, deliverTime } = parsed.data;

    createOrder({
      itemId,
      deliverTime,
    });
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onAddCommandClick = () => {
    fetchCategories().then();
    setOpen(true);
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={onAddCommandClick}
      >
        Ajouter une commande
      </Button>

      <Modal
        open={open}
        title="Ajouter une commande"
        onCancel={onCancel}
        onOk={handleSubmit}
        okText="Valider"
        cancelText="Annuler"
        confirmLoading={isCreateOrderPending}
        okButtonProps={{ disabled: !isFormValid }}
        maskClosable={false}
        destroyOnHidden
      >
        <AddOrderForm
          form={form}
          setIsFormValidAction={setIsFormValid}
          itemCategories={isItemCategoriesPending ? [] : itemCategories}
        />
      </Modal>
    </>
  );
}
