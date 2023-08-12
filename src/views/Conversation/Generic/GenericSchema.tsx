import { z } from "zod";

export const GenericMessageSchema = z.object({
  source_id: z.string(),
  payload: z.string(),
  function_call: z.string().optional().default(""),
  role: z.string(),
});

export type GenericMessage = z.infer<typeof GenericMessageSchema>;
