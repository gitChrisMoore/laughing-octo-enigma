import { z } from "zod";

const BasePropertySchema = z.record(
  z.object({
    type: z.string(),
    description: z.string().optional(),
    items: z
      .object({
        type: z.string(),
        description: z.string().optional(),
      })
      .optional(),
  })
);

export const ObjectiveSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    type: z.string(),
    properties: BasePropertySchema,
  }),
});

export type Objective = z.infer<typeof ObjectiveSchema>;
