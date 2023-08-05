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
    // description: z.string(),
  })
);

export const FuncSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    type: z.string(),
    properties: BasePropertySchema,
  }),
});

export type Func = z.infer<typeof FuncSchema>;
