import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { NextResponse } from "next/server";
import { ItemCategory } from "@/lib/api/domain/entity/ItemCategory";
import { getACategoryForId } from "@/lib/api/application/useCases/item-category/GetACategoryForId";
import { ItemCategoryRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemCategoryRepositoryImpl";

export const GET = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;

    const itemCategory: ItemCategory = await getACategoryForId(
      ItemCategoryRepositoryImpl,
      { id },
    );

    return NextResponse.json(itemCategory, { status: 200 });
  },
);
