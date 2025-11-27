"use client";

import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NewOrder, Order } from "@/lib/api/domain/entity/Order";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import AddOrderForm from "@/lib/components/order/AddOrderForm";
import useNotification from "@/lib/hooks/useNotification";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { queryClient } from "@/lib/client/query/queryClient";
import { PlusCircleFilled } from "@ant-design/icons";
import { Item } from "@/lib/api/domain/entity/Item";
import { handleAxiosError } from "@/lib/utils/QueryUtils";

type AddOrderButtonProps = {
  item: Item;
};

export default function AddOrderButton({ item }: AddOrderButtonProps) {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();

  const notification = useNotification();

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
        description: `Erreur lors de l'enregistrement : ${handleAxiosError(error)}`,
      });
    },
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const parsed = createOrderSchema.safeParse({
      itemId: item.id,
      deliverTime: values.deliverTime?.toDate(),
      deliverPlace: values.deliverPlace,
    });

    if (!parsed.success) {
      notification.error({
        description: joinZodErrors(parsed),
      });
      return;
    }

    const { itemId, deliverTime, deliverPlace } = parsed.data;

    createOrder({
      itemId,
      deliverTime,
      deliverPlace,
    });
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onAddCommandClick = () => {
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
        Commander
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
        <AddOrderForm form={form} setIsFormValidAction={setIsFormValid} />
      </Modal>
    </>
  );
}
