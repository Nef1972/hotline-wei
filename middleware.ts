import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import env from "@/lib/utils/env";
import { db } from "@/lib/db";
import { peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn();
    }

    // TODO : Mettre une route par default, sans auth nécessaire

    const database = db();

    const people = await database
      .select()
      .from(peoples)
      .where(eq(peoples.userId, userId))
      .limit(1);

    if (people.length === 0) {
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
