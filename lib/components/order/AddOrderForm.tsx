"use client";

import { DatePicker, Form, FormInstance, Select } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { Item } from "@/lib/api/domain/entity/Item";

type AddOrderFormProps = {
  form: FormInstance;
  setIsFormValidAction: Dispatch<SetStateAction<boolean>>;
  itemCategories: ItemCategoryWithItems[];
  selectedItemCategoryId: number | undefined;
  setSelectedItemCategoryId: Dispatch<SetStateAction<number | undefined>>;
};

export default function AddOrderForm({
  form,
  setIsFormValidAction,
  itemCategories,
  selectedItemCategoryId,
  setSelectedItemCategoryId,
}: AddOrderFormProps) {
  const onFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    const allTouched = form.isFieldsTouched(true);
    setIsFormValidAction(!hasErrors && allTouched);
  };

  const selectedCategory = itemCategories?.find(
    (itemCategory) => itemCategory.id === selectedItemCategoryId,
  );

  return (
    <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
      <Form.Item
        label="Catégorie"
        name="categoryId"
        rules={[{ required: true, message: "Veuillez choisir une catégorie" }]}
      >
        <Select
          placeholder="Choisir une catégorie"
          options={itemCategories.map((itemCategory) => ({
            label: itemCategory.title,
            value: itemCategory.id,
          }))}
          onChange={(id) => {
            setSelectedItemCategoryId(id);
            form.setFieldValue("itemId", undefined);
          }}
        />
      </Form.Item>

      <Form.Item
        label="Article"
        name="itemId"
        rules={[{ required: true, message: "Veuillez choisir un article" }]}
      >
        <Select
          placeholder={
            selectedItemCategoryId
              ? "Choisir un article"
              : "Sélectionnez une catégorie d'abord"
          }
          disabled={!selectedItemCategoryId}
          options={
            selectedCategory?.items.map((item: Item) => ({
              label: item.title,
              value: item.id,
            })) ?? []
          }
        />
      </Form.Item>

      <Form.Item
        label="Date et heure de livraison"
        name="deliverTime"
        rules={[{ required: true, message: "Veuillez choisir date et heure" }]}
      >
        <DatePicker
          className="w-full"
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YYYY HH:mm"
        />
      </Form.Item>
    </Form>
  );
}
