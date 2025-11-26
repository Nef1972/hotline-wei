import { NextResponse } from "next/server";
import { controller } from "@/lib/api/shared/http/controller";
import { authenticateUserOrReject } from "@/lib/api/application/useCases/auth/AuthenticateUserOrRejectThem";
import { uploadAPictureAndGetUrl } from "@/lib/api/application/useCases/picture/UploadAPictureAndGetUrl";
import { StorageFileBucketImpl } from "@/lib/api/infrastructure/bucket/StorageFileBucketImpl";
import { updateAnItemPictureUrl } from "@/lib/api/application/useCases/item/UpdateAnItemPictureUrl";
import { ItemRepositoryImpl } from "@/lib/api/infrastructure/repository/ItemRepositoryImpl";
import { Item } from "@/lib/api/domain/entity/Item";

export const POST = controller(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    await authenticateUserOrReject();

    const body = await req.formData();
    const { id } = await params;

    const pictureUrl = await uploadAPictureAndGetUrl(StorageFileBucketImpl, {
      formData: body,
    });

    const item: Item = await updateAnItemPictureUrl(ItemRepositoryImpl, {
      id,
      pictureUrl,
    });

    return NextResponse.json(item, { status: 200 });
  },
);
