import { z } from "zod";

export const TargetMarketSchema = z.object({
  age_range: z.object({
    low: z.number(),
    high: z.number(),
  }),
  description: z.string(),
  buying_power: z.string(),
  education_level: z.string(),
  interests: z.array(z.string()),
});

export type TargetMarket = z.infer<typeof TargetMarketSchema>;
