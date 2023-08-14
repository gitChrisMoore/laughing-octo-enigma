import { z } from "zod";

export const ThreadSchema = z.object({
  thread_name: z.string(),
  thread_status: z.boolean(),
});

export type Thread = z.infer<typeof ThreadSchema>;
