import * as z from "zod";

export const category = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  budget: z.coerce
    .number()
    .refine((val) => val >= 0, { message: "Budget can't be negative" }),
  unit: z.string(),
});
