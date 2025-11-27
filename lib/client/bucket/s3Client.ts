import { S3Client } from "@aws-sdk/client-s3";
import env from "@/lib/utils/env";

export const s3Client = new S3Client({
  region: "auto",
  endpoint: env.r2.endpoint,
  forcePathStyle: false,
  credentials: {
    accessKeyId: env.r2.accessKeyId,
    secretAccessKey: env.r2.secretAccessKey,
  },
});
