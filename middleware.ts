import { clerkMiddleware } from "@clerk/nextjs/server";
import env from "@/lib/utils/env";
import { database } from "@/lib/db";
import { peoples } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  ClerkClaimsSchema,
  clerkClaimsSchema,
} from "@/lib/schemas/clerkClaimsSchema";
import { z } from "zod";
import { decodeToken } from "@/lib/utils/TokenUtils";

export default clerkMiddleware(
  async (auth) => {
    const { userId, getToken, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn();
    }

    const token = await getToken({ template: env.tokenTemplate });

    if (!token) {
      return redirectToSignIn();
    }

    const claims = decodeToken(token);

    const parseResult = clerkClaimsSchema.safeParse(claims);

    if (!parseResult.success) {
      console.error("JWT claims invalid : ", z.treeifyError(parseResult.error));
      return new Response(
        `Invalid JWT claims : ${JSON.stringify(claims, null, 2)}`,
        { status: 400 },
      );
    }

    const {
      first_name: firstName,
      last_name: lastName,
      email,
    } = parseResult.data as ClerkClaimsSchema;

    const existingPeople = await database.query.peoples.findFirst({
      where: eq(peoples.userId, userId),
    });

    if (!existingPeople) {
      await database.insert(peoples).values({
        userId,
        firstName,
        lastName,
        email,
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
