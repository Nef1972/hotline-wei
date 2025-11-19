import { z } from "zod";

export const clerkClaimsSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
});

export type ClerkClaimsSchema = z.infer<typeof clerkClaimsSchema>;
