import { z } from "zod";

export const FunctionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.any(),
});

export const ConversationalMessage = z.object({
  role: z.string(),
  content: z.string(),
});

export const ProblemSolverSchema = z.object({
  id: z.number(),
  name: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  initial_context: ConversationalMessage.array(),
  functions: FunctionSchema.array(),
});

export type ProblemSolver = z.infer<typeof ProblemSolverSchema>;
