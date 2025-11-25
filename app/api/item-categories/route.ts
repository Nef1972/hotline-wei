import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { getAllItemCategories } from "@/lib/api/application/useCases/item-category/GetAllItemCategories";
import { controller } from "@/lib/api/shared/http/controller";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { NextResponse } from "next/server";
import { createNewItemCategory } from "@/lib/api/application/useCases/item-category/CreateNewItemCategory";

export const GET = controller(async () => {
  await authenticateUserOrReject();

  const categories: ItemCategory[] = await getAllItemCategories(
    ItemCategoryRepositoryImpl,
  );

  return Response.json(categories, { status: 200 });
});

export const POST = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const body = await req.json();

  const itemCategory: ItemCategory | undefined = await createNewItemCategory(
    ItemCategoryRepositoryImpl,
    {
      newItemCategory: body,
    },
  );

  return NextResponse.json(itemCategory, { status: 201 });
});
