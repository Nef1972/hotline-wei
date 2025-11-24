"use client";

import { Cascader, DatePicker, Form, FormInstance } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { Item } from "@/lib/api/domain/entity/Item";

type AddOrderFormProps = {
  form: FormInstance;
  setIsFormValidAction: Dispatch<SetStateAction<boolean>>;
  itemCategories: ItemCategoryWithItems[];
};

export default function AddOrderForm({
  form,
  setIsFormValidAction,
  itemCategories,
}: AddOrderFormProps) {
  const onFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    const allTouched = form.isFieldsTouched(true);
    setIsFormValidAction(!hasErrors && allTouched);
  };

  type CascaderOption = {
    value: number;
    label: string;
    children?: CascaderOption[];
  };

  const cascaderOptions: CascaderOption[] = itemCategories
    .filter(
      (itemCategory) => itemCategory.items && itemCategory.items.length > 0,
    )
    .map((itemCategory) => ({
      label: itemCategory.title,
      value: itemCategory.id,
      children: itemCategory.items.map((item: Item) => ({
        label: item.title,
        value: item.id,
      })),
    }));

  return (
    <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
      <Form.Item
        label="Choix de l'article"
        name="itemId"
        rules={[{ required: true, message: "Veuillez choisir un article" }]}
        normalize={(value: number[] | undefined) =>
          value ? value[value.length - 1] : undefined
        }
        getValueProps={(itemId: number | undefined) => {
          if (!itemId) return { value: undefined };
          const category = cascaderOptions.find((option) =>
            option.children?.some((child) => child.value === itemId),
          );
          return { value: category ? [category.value, itemId] : undefined };
        }}
      >
        <Cascader
          placeholder="Choisir un article"
          expandTrigger="hover"
          options={cascaderOptions}
          displayRender={(labels) => labels[labels.length - 1]}
        />
      </Form.Item>

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
    </Form>
  );
}
