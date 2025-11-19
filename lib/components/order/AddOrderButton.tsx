"use client";

import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NewOrder } from "@/lib/types/Order";
import { createOrderSchema } from "@/lib/schemas/order/createOrderSchema";
import AddOrderForm from "@/lib/components/order/AddOrderForm";
import useNotification from "@/lib/hooks/useNotification";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { usePeople } from "@/lib/contexts/PeopleContext";

export default function AddOrderButton() {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();

  const { people } = usePeople();

  const notification = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewOrder) => {
      const res = await axios.post("/api/orders", data);
      return res.data;
    },
    onSuccess: () => {
      notification.success({ description: "Commande enregistrée avec succès" });
      form.resetFields();
      setOpen(false);
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
      people: people,
      description: values.description,
      deliverTime: values.deliverTime?.toDate(),
    });

    if (!parsed.success) {
      notification.error({
        description: joinZodErrors(parsed),
      });
      return;
    }

    const { description, deliverTime } = parsed.data;

    mutate({
      people,
      description,
      deliverTime,
    });
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => setOpen(true)}>
        Ajouter une commande
      </Button>

      <Modal
        open={open}
        title="Ajouter une commande"
        onCancel={onCancel}
        onOk={handleSubmit}
        okText="Valider"
        cancelText="Annuler"
        confirmLoading={isPending}
        okButtonProps={{ disabled: !isFormValid }}
        destroyOnHidden
      >
        <AddOrderForm form={form} setIsFormValidAction={setIsFormValid} />
      </Modal>
    </div>
  );
}
