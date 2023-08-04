import { z } from "zod";

export const TrendSchema = z.object({
  title: z.string(),
  implication: z.string(),
});

export type Trend = z.infer<typeof TrendSchema>;

export const TrendEventSchema = z.object({
  source_id: z.string(),
  role: z.string(),
  payload: TrendSchema,
});

export type TrendEvent = z.infer<typeof TrendEventSchema>;
