import { z } from "zod";
import { orderStatusEnum } from "@/lib/db/schema";

export const statusSchema = z.enum(orderStatusEnum.enumValues).optional();

export const statusesSchema = z
  .string()
  .transform((val) => val.split(","))
  .pipe(z.array(z.enum(orderStatusEnum.enumValues)))
  .optional();
