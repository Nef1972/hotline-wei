import { StorageError } from "@supabase/storage-js";

export type StorageFile =
  | {
      data: {
        id: string;
        path: string;
        fullPath: string;
      };
      error: null;
    }
  | {
      data: null;
      error: StorageError;
    };
