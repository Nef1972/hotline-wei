import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { getAllItemCategories } from "@/lib/api/application/useCases/item-category/GetAllItemCategories";
import { controller } from "@/lib/api/shared/http/controller";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";

export const GET = controller(async () => {
  await authenticateUserOrReject();

  const categories: ItemCategory[] = await getAllItemCategories(
    ItemCategoryRepositoryImpl,
  );

  return Response.json(categories, { status: 200 });
});
