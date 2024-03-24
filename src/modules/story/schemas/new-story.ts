import { z } from "zod";

export const newStorySchema = z.object({
  title: z.string().min(1).max(100),
});

export type NewStoryInputValues = z.infer<typeof newStorySchema>;
