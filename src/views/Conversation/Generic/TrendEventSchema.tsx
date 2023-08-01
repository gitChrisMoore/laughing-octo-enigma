import { z } from "zod";

export const TrendEventSchema = z.object({
  title: z.string(),
  implication: z.string(),
  role: z.string(),
});

export type TrendEvent = z.infer<typeof TrendEventSchema>;
