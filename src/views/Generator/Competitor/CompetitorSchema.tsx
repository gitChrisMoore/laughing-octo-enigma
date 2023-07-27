import { z } from "zod";

export const CompetitorSchema = z.object({
  name: z.string(),
  value_prop: z.string(),
  market_position: z.string(),
});

export type Competitor = z.infer<typeof CompetitorSchema>;
