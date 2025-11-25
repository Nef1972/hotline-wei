"use client";

import { DatePicker, Form, FormInstance, Input } from "antd";
import { Dispatch, SetStateAction } from "react";

type AddOrderFormProps = {
  form: FormInstance;
  setIsFormValidAction: Dispatch<SetStateAction<boolean>>;
};

export default function AddOrderForm({
  form,
  setIsFormValidAction,
}: AddOrderFormProps) {
  const onFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    const allTouched = form.isFieldsTouched(true);
    setIsFormValidAction(!hasErrors && allTouched);
  };

  return (
    <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
      <Form.Item
        label="Date et heure de livraison"
        name="deliverTime"
        rules={[{ required: true, message: "Veuillez choisir date et heure" }]}
      >
        <DatePicker
          className="w-full"
          styles={{
            popup: {
              root: { zIndex: 1050 },
            },
          }}
          placeholder="Choisir une date et une heure"
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YYYY HH:mm"
          inputReadOnly
        />
      </Form.Item>
      <Form.Item
        label="Lieu de livraison"
        name="deliverPlace"
        rules={[
          { required: true, message: "Veuillez indiquer le lieu de livraison" },
        ]}
      >
        <Input
          placeholder="Exemple : Bâtiment A, chambre 12"
          className="w-full"
        />
      </Form.Item>
    </Form>
  );
}
