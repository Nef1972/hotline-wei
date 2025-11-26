import { StorageFileBucket } from "@/lib/api/domain/bucket/StorageFileBucket";
import { BadRequestError } from "@/lib/api/shared/errors/BadRequestError";
import { uploadFileSchema } from "@/lib/schemas/storage-file/uploadFileSchema";
import { joinZodErrors } from "@/lib/utils/StringUtils";
import { AppError } from "@/lib/api/shared/errors/AppError";

export const uploadAPictureAndGetUrl = async (
  bucket: StorageFileBucket,
  params: { formData: FormData },
): Promise<string> => {
  const file = params.formData.get("file");
  const parsed = uploadFileSchema.safeParse(file);

  if (!parsed.success) throw new BadRequestError(joinZodErrors(parsed));

  const fileName = `${Date.now()}-${parsed.data.name}`;

  const { data, error } = await bucket.upload({ fileName, file: parsed.data });

  if (error) throw new AppError(error.message, 500);

  return `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`;
};
