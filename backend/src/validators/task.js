import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().trim().min(1).max(140),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  dueDate: z.coerce.date().optional(),
});

export const taskUpdateSchema = taskCreateSchema.partial();

export const taskListQuerySchema = z.object({
  search: z.string().trim().max(200).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});

