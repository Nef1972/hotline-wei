import { PutObjectAclCommandOutput } from "@aws-sdk/client-s3";

export interface StorageFileBucket {
  upload: (params: {
    fileName: string;
    file: File;
  }) => Promise<PutObjectAclCommandOutput>;
}
