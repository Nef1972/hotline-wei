import { clerkMiddleware } from "@clerk/nextjs/server";
import env from "@/lib/utils/env";
import { database } from "@/lib/db";
import { peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn();
    }

    const people = await database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
    });

    if (!people) {
      await database.insert(peoples).values({
        userId,
      });
    }
  },
  {
    authorizedParties: [env.appUrl],
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
