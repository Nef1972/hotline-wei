import { z } from "zod";
import { createPeopleSchema } from "@/lib/schemas/people/createPeopleSchema";

export const createOrderSchema = z.object({
  people: createPeopleSchema,
  description: z.string().min(1, "Description requise"),
  deliverTime: z.coerce
    .date({ error: "Date et heure requises" })
    .min(Date.now(), { error: "La date est déja passée" }),
});
