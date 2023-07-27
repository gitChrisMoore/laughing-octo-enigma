import { z } from "zod";

export const TrendSchema = z.object({
  title: z.string(),
  implication: z.string(),
});

export type Trend = z.infer<typeof TrendSchema>;
