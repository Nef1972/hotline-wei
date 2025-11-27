import { StorageFileBucket } from "@/lib/api/domain/bucket/StorageFileBucket";
import { s3 } from "@/lib/bucket/s3";
import {
  PutObjectAclCommandOutput,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import env from "@/lib/utils/env";

export const StorageFileBucketImpl: StorageFileBucket = {
  upload: async (params: {
    fileName: string;
    file: File;
  }): Promise<PutObjectAclCommandOutput> => {
    const fileArrayBuffer = await params.file.arrayBuffer();

    return s3.send(
      new PutObjectCommand({
        Bucket: env.r2.bucket,
        Key: params.fileName,
        Body: Buffer.from(fileArrayBuffer),
        ContentType: params.file.type || "application/octet-stream",
        CacheControl: "public, max-age=3600",
        ACL: "public-read",
      }),
    );
  },
};
