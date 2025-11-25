import { InferSelectModel } from "drizzle-orm";
import { accessRequests } from "@/lib/db/schema";
import { People } from "@/lib/api/domain/entity/People";
import { z } from "zod";
import { processAccessRequestSchema } from "@/lib/schemas/access-request/processAcceptRequestSchema";

export type AccessRequest = InferSelectModel<typeof accessRequests>;

export type AccessRequestWithPeople = AccessRequest & {
  people: People;
};

export type ProcessAccessRequest = z.infer<typeof processAccessRequestSchema>;
