import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { controller } from "@/lib/api/shared/http/controller";
import { NextResponse } from "next/server";
import { ItemRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemRepositoryImpl";
import { deleteAnItem } from "@/lib/api/application/useCases/item/DeleteAnItem";

export const DELETE = controller(
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const { id } = await params;
    await deleteAnItem(ItemRepositoryImpl, { id });

    return NextResponse.json({ status: 200 });
  },
);
