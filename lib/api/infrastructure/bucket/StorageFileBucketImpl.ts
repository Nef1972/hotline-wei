import { StorageFileBucket } from "@/lib/api/domain/bucket/StorageFileBucket";
import { supaBase } from "@/lib/supabase/server";
import { StorageFile } from "@/lib/api/domain/entity/StorageFile";

export const StorageFileBucketImpl: StorageFileBucket = {
  upload: async (params: {
    fileName: string;
    file: File;
  }): Promise<StorageFile> =>
    await supaBase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(params.fileName, params.file, {
        cacheControl: "3600",
        upsert: false,
      }),
};
