import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { NextResponse } from "next/server";
import { getAllItemsForACategory } from "@/lib/api/application/useCases/item/GetAllItemsForACategory";
import { ItemRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemRepositoryImpl";
import { Item } from "@/lib/api/domain/entity/Item";

export const GET = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;

    const items: Item[] = await getAllItemsForACategory(ItemRepositoryImpl, {
      itemCategoryId: id,
    });

    return NextResponse.json(items, { status: 200 });
  },
);
