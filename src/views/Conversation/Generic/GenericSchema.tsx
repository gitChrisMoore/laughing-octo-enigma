import { z } from "zod";

export const GenericMessageSchema = z.object({
  consumer_id: z.string(),
  content: z.string(),
  function_call: z.string().optional().default(""),
  role: z.string(),
});

export type GenericMessage = z.infer<typeof GenericMessageSchema>;
