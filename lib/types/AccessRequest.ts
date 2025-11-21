import { InferSelectModel } from "drizzle-orm";
import { accessRequests } from "@/lib/db/schema";
import { People } from "@/lib/types/People";
import { z } from "zod";
import { processAccessRequestSchema } from "@/lib/schemas/access-requests/processAcceptRequest";

export type AccessRequest = InferSelectModel<typeof accessRequests>;

export type AccessRequestWithPeople = AccessRequest & {
  people: People;
};

export type ProcessAccessRequest = z.infer<typeof processAccessRequestSchema>;
