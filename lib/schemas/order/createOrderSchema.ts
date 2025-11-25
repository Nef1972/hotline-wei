import { z } from "zod";

export const createOrderSchema = z.object({
  itemId: z.number(),
  deliverTime: z.coerce
    .date({ error: "Date et heure requises" })
    .min(Date.now(), { error: "La date est déja passée" }),
  deliverPlace: z.string().min(1, { error: "Le lieu de livraison est requis" }),
});
