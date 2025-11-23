import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { getAllItemCategories } from "@/lib/api/application/useCases/item-category/GetAllItemCategories";
import { controller } from "@/lib/api/shared/http/controller";
import { parseBooleanParam } from "@/lib/utils/QueryUtils";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";

export const GET = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const url = new URL(req.url);
  const itemAvailable = parseBooleanParam(
    url.searchParams.get("itemAvailable"),
  );

  const categories = await getAllItemCategories(ItemCategoryRepositoryImpl, {
    itemAvailable,
  });

  return Response.json(categories);
});
