import axios, { AxiosError } from "axios";

export const parseBooleanParam = (
  value: string | null,
): boolean | undefined => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

export const handleAxiosError = (error: unknown): string => {
  const message = "cause inconnue";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string }>;
    return axiosError.response?.data?.error ?? axiosError.message ?? message;
  } else if (error instanceof Error) {
    return error.message;
  }

  return message;
};
