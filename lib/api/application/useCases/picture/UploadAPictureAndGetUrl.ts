import {StorageFileBucket} from "@/lib/api/domain/bucket/StorageFileBucket";
import {BadRequestError} from "@/lib/api/shared/errors/BadRequestError";
import {uploadFileSchema} from "@/lib/schemas/storage-file/uploadFileSchema";
import {joinZodErrors} from "@/lib/utils/StringUtils";
import env from "@/lib/utils/env";

export const uploadAPictureAndGetUrl = async (
  bucket: StorageFileBucket,
  params: { formData: FormData },
): Promise<string> => {
  const file = params.formData.get("file");
  const parsed = uploadFileSchema.safeParse(file);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  console.log(parsed.data.size);

  if (parsed.data.size > env.r2.sizeLimit)
    throw new BadRequestError(
      `Le fichier est trop volumineux, taille maximale : ${env.r2.sizeLimit / (1024 * 1024)} Mo`,
    );

  const fileName = `${crypto.randomUUID()}-${parsed.data.name}`;

  await bucket.upload({ fileName, file: parsed.data });

  return `${env.r2.publicUrl}/${fileName}`;
};
