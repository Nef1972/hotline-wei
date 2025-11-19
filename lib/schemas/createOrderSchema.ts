import { z } from "zod";

export const createOrderSchema = z.object({
  description: z.string().min(1, "Description requise"),
  deliverTime: z.coerce
    .date({ error: "Date et heure requises" })
    .min(Date.now(), { error: "La date est déja passée" }),
});
