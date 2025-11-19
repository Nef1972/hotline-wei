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
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Veuillez ajouter une description" },
        ]}
      >
        <Input placeholder="Ex : Une bouteille de Vodka" />
      </Form.Item>

      <Form.Item
        label="Date et heure de livraison"
        name="deliverTime"
        rules={[{ required: true, message: "Veuillez choisir date et heure" }]}
      >
        <DatePicker
          className="w-full"
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YYYY   HH:mm"
        />
      </Form.Item>
    </Form>
  );
}
