import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";
import { ItemCategoryWithItems } from "@/lib/api/domain/entity/ItemCategory";
import { getAllItemCategoriesWithItems } from "@/lib/api/application/useCases/item-category/GetAllItemCategoriesWithItems";

export const GET = controller(async () => {
  await authenticateUserOrReject();

  const categories: ItemCategoryWithItems[] =
    await getAllItemCategoriesWithItems(ItemCategoryRepositoryImpl);

  return Response.json(categories, { status: 200 });
});
