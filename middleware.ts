import { clerkMiddleware } from "@clerk/nextjs/server";
import env from "@/lib/utils/env";
import { getPeopleMatchingWithAnUserOrCreateIt } from "@/lib/api/application/useCases/people/GetPeopleMatchingWithAnUserOrCreateIt";
import { PeopleRepositoryImpl } from "@/lib/api/infrastructure/repository/PeopleRepositoryImpl";
import { handleError } from "@/lib/api/shared/http/handleError";

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

    try {
      await getPeopleMatchingWithAnUserOrCreateIt(PeopleRepositoryImpl, {
        userId,
        token,
      });
    } catch (error) {
      return handleError(error);
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
