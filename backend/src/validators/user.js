import { z } from "zod";

export const updateMeSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
});

