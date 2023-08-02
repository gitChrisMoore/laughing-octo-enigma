import { z } from "zod";

export const InboundEventSchema = z.object({
  name: z.string(),
  value_prop: z.string(),
  market_position: z.string(),
});

export type InboundEvent = z.infer<typeof InboundEventSchema>;
