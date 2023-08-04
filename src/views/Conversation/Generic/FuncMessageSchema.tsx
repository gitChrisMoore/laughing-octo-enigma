import { z } from "zod";

export const FuncMessageSchema = z.object({
  source_id: z.string(),
  role: z.string(),
  payload: z.any(),
});

export type FuncMessage = z.infer<typeof FuncMessageSchema>;
