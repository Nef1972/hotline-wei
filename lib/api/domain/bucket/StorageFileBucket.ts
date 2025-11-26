import { StorageFile } from "@/lib/api/domain/entity/StorageFile";

export interface StorageFileBucket {
  upload: (params: { fileName: string; file: File }) => Promise<StorageFile>;
}
