import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { NextResponse } from "next/server";
import { createNewItem } from "@/lib/api/application/useCases/item/CreateNewItem";
import { Item } from "@/lib/api/domain/entity/Item";
import { ItemRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemRepositoryImpl";

export const POST = controller(async (req: Request) => {
  await authenticateUserOrReject();

  const body = await req.json();

  const item: Item | undefined = await createNewItem(ItemRepositoryImpl, {
    newItem: body,
  });

  return NextResponse.json(item, { status: 201 });
});
