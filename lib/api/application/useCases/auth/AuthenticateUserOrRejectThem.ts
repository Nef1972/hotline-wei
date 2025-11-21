import { auth } from "@clerk/nextjs/server";
import { UnauthorizedError } from "@/lib/api/shared/errors/UnauthorizedError";

export const authenticateUserOrReject = async () => {
  const { userId } = await auth();
  if (!userId) throw new UnauthorizedError("User must be authenticated.");
  return userId;
};
